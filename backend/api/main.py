import os
import re
import ssl
import dotenv
import smtplib
import urllib.request

import xlsxwriter
import pylightxl as xl
from fastapi.responses import FileResponse, JSONResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from utils.mailman import send_mail
from utils.logging import *
from routes import registration
from utils.database_handler import (
    create_tables,
    drop_tables,
    fetch_admin_data,
    fetch_all_delegates,
    run_sql,
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

MAIL_BODY_INDIVIDUAL = os.getenv('MAIL_BODY_INDIVIDUAL')
MAIL_BODY_DELEGATION = os.getenv('MAIL_BODY_DELEGATION')

WHATSAPP_CCC = os.getenv('WHATSAPP_CCC')
WHATSAPP_COMMITTEE_X = os.getenv('WHATSAPP_COMMITTEE_X')
WHATSAPP_DISEC = os.getenv('WHATSAPP_DISEC')
WHATSAPP_IPC = os.getenv('WHATSAPP_IPC')
WHATSAPP_LOK_SABHA = os.getenv('WHATSAPP_LOK_SABHA')
WHATSAPP_UNHRC = os.getenv('WHATSAPP_UNHRC')
WHATSAPP_UNSC = os.getenv('WHATSAPP_UNSC')

WHATSAPP_GROUPS = {
    'CCC': WHATSAPP_CCC,
    'Committee X': WHATSAPP_COMMITTEE_X,
    'DISEC': WHATSAPP_DISEC,
    'IPC': WHATSAPP_IPC,
    'Lok Sabha': WHATSAPP_LOK_SABHA,
    'UNHRC': WHATSAPP_UNHRC,
    'UNSC': WHATSAPP_UNSC
}


def make_head_del_mail_body(school, delegates) -> str:
    SINGLE_DELEGATE = "{name}: {comm} - {port}"

    delegate_text = ""

    for i, (name, comm, portfolio) in enumerate(delegates, 1):
        delegate_text += f"{i}. {SINGLE_DELEGATE.format(name=name, comm=comm, port=portfolio)}\n"

    return MAIL_BODY_DELEGATION.format(school=school, delegates=delegate_text)

def make_individual_mail_body(name, comm, port):
    return MAIL_BODY_INDIVIDUAL.format(name=name, comm=comm, port=port, whatsapp=WHATSAPP_GROUPS[comm])

app.include_router(registration.router)

# drop_tables()

@app.get('/admin')
async def get_registration_data(username: str, password: str):
    if fetch_admin_data() == (username, password):
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
    if fetch_admin_data() == (username, password):
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
            log(
                LogLevel.INFO,
                'Logged into mail account',
                'main.update_registration_data'
            )

            for i, (comm, portfolio, email_sent) in enumerate(zip(assigned_comms, assigned_ports, email_status)):
                if (comm and portfolio) and not email_sent:
                    recver = df.ws(ws_name).index(row=i+2, col=5)
                    run_sql('UPDATE delegates SET assigned_comm=%s, assigned_country=%s WHERE email=%s', (comm, portfolio, recver))
                    log(
                        LogLevel.INFO,
                        f'Updated delegate information\n\tEmail: {recver}\n\tComm: {comm}\n\tPort: {portfolio}',
                        'main.update_registration_data'
                    )

            delegations = fetch_delegates_field('delegation_id', 'email_sent=FALSE AND assigned_comm IS NOT NULL AND delegation_id IS NOT NULL')
            delegations = {item[0] for item in delegations}

            log(
                LogLevel.INFO,
                f'Fetched delegation IDs to send mail\n\tIDs: {delegations}',
                'main.update_registration_data'
            )

            for delegation in delegations:
                delegates = fetch_delegates_field('is_head, name, email, assigned_comm, assigned_country', f'delegation_id={delegation}')
                for is_head, name, email, assigned_comm, assigned_country in delegates:
                    if is_head:
                        body = make_head_del_mail_body(delegates=(name, assigned_country, assigned_comm))
                        send_mail(server, email, body)
                        log(
                            LogLevel.INFO,
                            f'Sent mail to the head delegate.',
                            'main.update_registration_data'
                        )
                    else:
                        send_mail(server, email, make_individual_mail_body(name, assigned_comm, assigned_country))
                        log(
                            LogLevel.INFO,
                            f'Sent mail to the delegate of a delegation.',
                            'main.update_registration_data'
                        )

                    run_sql('UPDATE delegates SET email_sent=TRUE WHERE email=%s', (email,))
                    log(
                        LogLevel.INFO,
                        f'E-Mail status updated.',
                        'main.update_registration_data'
                    )

            indis = fetch_delegates_field('name, email, assigned_comm, assigned_country', 'email_sent=FALSE AND assigned_comm IS NOT NULL AND delegation_id IS NULL')
            log(
                LogLevel.INFO,
                f'Fetched individuals to send mail to\n\tData: {indis}',
                'main.update_registration_data'
            )
            for name, email, comm, country in indis:
                send_mail(server, email, make_individual_mail_body(name, comm, country))
                run_sql('UPDATE delegates SET email_sent=TRUE WHERE email=%s', (email,))
                log(
                    LogLevel.INFO,
                    f'Mail sent and email status updated',
                    'main.update_registration_data'
                )

create_tables()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='0.0.0.0', port=5000)
