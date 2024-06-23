import os
import re
import ssl
import dotenv
import smtplib
import urllib.request

import xlsxwriter
import pylightxl as xl
from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from utils.mailman import send_mail
from utils.encryption import encrypt
from routes import registration, matricies
from utils.database_handler import (
    create_tables,
    drop_tables,
    fetch_admin_data,
    fetch_all_delegates,
    run_sql,
    fetch_delegate_field,
    fetch_delegates_field
)

dotenv.load_dotenv()

MAIL_PORT = os.getenv('MAIL_PORT')
MAIL_SERVER = os.getenv('MAIL_SERVER')
MAIL_SENDER = os.getenv('MAIL_SENDER')
MAIL_PASSW = os.getenv('MAIL_PASSW')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

MAIL_BODY_DELEGATE = """You've got mail {comm} and {port}"""

def make_head_del_mail_body(delegates) -> str:
    SINGLE_DELEGATE = "{0} ({1}): {2}, {3}"

    return "\n".join(SINGLE_DELEGATE.format(*delegate) for delegate in delegates)

routers = [registration.router, matricies.router]

for router in routers:
    app.include_router(router)

# drop_tables()

@app.get('/admin')
async def get_registration_data(username: str, password: str):
    if fetch_admin_data() == (username, encrypt(password)):
        data = fetch_all_delegates()

        with xlsxwriter.Workbook('data.xlsx') as workbook:
            worksheet = workbook.add_worksheet('Registrations')
            worksheet.write_row('A1', [
                'ID', 'DELEGATION ID', 'IS HEAD DELEGATE?', 'NAME', 'EMAIL', 'PHONE NUMBER',
                'SCHOOL', 'GRADE', 'PRIMARY COMMITTEE PREFERENCE', 'FIRST PORTFOLIO PREFERENCE',
                'SECOND PORTFOLIO PREFERENCE', 'SECONDARY COMMITTEE PREFERENCE', 'FIRST PORTFOLIO PREFERENCE',
                'SECOND PORTFOLIO PREFERENCE', 'PRIOR_EXPERIENCE', 'PROOF', 'FILETYPE', 'ASSIGNED COMMITEE', 'ASSIGNED COUNTRY',
                'EMAIL SENT?'
            ])

            created = []

            for delegate_index, delegate in enumerate(data):
                payment, filetype = delegate[15], delegate[16]

                if not re.match(r'data:image/(png|jpg|jpeg);base64,LS0tUkVGRVIgVE8gSEVBRCBERUxFR0FURS0tLQ==', payment):
                    resp = urllib.request.urlopen(payment)

                    file_path = f'delegate_{delegate_index}.{filetype}'
                    created.append(file_path)

                    with open(file_path, 'wb') as f:
                        f.write(resp.file.read())
                else:
                    file_path = -1

                worksheet.write_row(f'A{delegate_index+2}', delegate[:15])
                if file_path != -1:
                    worksheet.insert_image(f'P{delegate_index+2}', file_path)
                    worksheet.write_row(f'Q{delegate_index+2}', delegate[16:])
                else:
                    worksheet.write_row(f'P{delegate_index+2}', ['REFER TO HEAD DELEGATE'] + delegate[16:])

        for file in created:
            os.remove(file)

        return FileResponse('data.xlsx', media_type="application/octet-stream")


@app.post('/admin')
async def update_registration_data(username: str, password: str, file: UploadFile = File(...)):
    if fetch_admin_data() == (username, encrypt(password)):
        contents = file.file.read()
        with open('data.xlsx', 'wb') as f:
            f.write(contents)

        df = xl.readxl('data.xlsx')
        ws_name = df.ws_names[0]

        assigned_comms = df.ws(ws_name).col(18)[1:]
        assigned_ports = df.ws(ws_name).col(19)[1:]
        email_status = df.ws(ws_name).col(20)[1:]

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL(MAIL_SERVER, MAIL_PORT, context=context) as server:
            server.login(MAIL_SENDER, MAIL_PASSW)

            for i, (comm, portfolio, email_sent) in enumerate(zip(assigned_comms, assigned_ports, email_status)):
                if (comm and portfolio) and not email_sent:
                    recver = df.ws(ws_name).index(row=i+2, col=5)
                    run_sql('UPDATE delegates SET assigned_comm=%s, assigned_country=%s WHERE email=%s', (comm, portfolio, recver))

            delegations = fetch_delegates_field('delegation_id', 'email_sent=FALSE AND assigned_comm IS NOT NULL AND delegation_id IS NOT NULL')
            delegations = {item[0] for item in delegations}
            for delegation in delegations:
                delegates = fetch_delegates_field('is_head, email, assigned_comm, assigned_country', f'delegation_id={delegation}')
                for is_head, email, assigned_comm, assigned_country in delegates:
                    if is_head:
                        delegate_data = fetch_delegates_field('name, email, assigned_country, assigned_comm', f'delegation_id={delegation}')
                        body = make_head_del_mail_body(delegates=delegate_data)
                        send_mail(server, email, body)
                    else:
                        send_mail(server, email, MAIL_BODY_DELEGATE.format(comm=assigned_comm, port=assigned_country))

                    run_sql('UPDATE delegates SET email_sent=TRUE WHERE email=%s', (email,))

            indis = fetch_delegates_field('email, assigned_comm, assigned_country', 'email_sent=FALSE AND assigned_comm IS NOT NULL AND delegation_id IS NULL')
            for email, comm, country in indis:
                send_mail(server, email, MAIL_BODY_DELEGATE.format(comm=comm, port=country))
                run_sql('UPDATE delegates SET email_sent=TRUE WHERE email=%s', (email,))

create_tables()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=5000)
