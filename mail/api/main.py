from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os
import pylightxl as xl
import ssl
import smtplib
import mailman

load_dotenv(override=True)

ADMIN_USER = os.getenv('ADMIN_USER')
ADMIN_PASS = os.getenv('ADMIN_PASS')

MAIL_SERVER = os.getenv('MAIL_SERVER')
MAIL_PORT = os.getenv('MAIL_PORT')
MAIL_SENDER = os.getenv('MAIL_SENDER')
MAIL_PASS = os.getenv('MAIL_PASSW')

MAIL_BODY_INDI = os.getenv('MAIL_BODY_INDIVIDUAL')

WHATSAPP_CCC = os.getenv('WHATSAPP_CCC')
WHATSAPP_COMMITTEE_X = os.getenv('WHATSAPP_COMMITTEE_X')
WHATSAPP_DISEC = os.getenv('WHATSAPP_DISEC')
WHATSAPP_IPC = os.getenv('WHATSAPP_IPC')
WHATSAPP_LOK_SABHA = os.getenv('WHATSAPP_LOK_SABHA')
WHATSAPP_UNHRC = os.getenv('WHATSAPP_UNHRC')
WHATSAPP_UNSC = os.getenv('WHATSAPP_UNSC')

WHATSAPP = {
    'CCC': WHATSAPP_CCC,
    'COMMITTEE_X': WHATSAPP_COMMITTEE_X,
    'DISEC': WHATSAPP_DISEC,
    'IPC': WHATSAPP_IPC,
    'LOK_SABHA': WHATSAPP_LOK_SABHA,
    'UNHRC': WHATSAPP_UNHRC,
    'UNSC': WHATSAPP_UNSC
}

app = FastAPI()

def human_to_comp_committee(committee: str) -> str:
    return committee.upper().replace(' ', '_')

def make_indi_mail_body(name: str, assigned_committee: str, assigned_portfolio: str) -> None:
    return MAIL_BODY_INDI.format(
        name=name,
        comm=assigned_committee,
        port=assigned_portfolio,
        whatsapp=WHATSAPP[human_to_comp_committee(assigned_committee)]
    )

@app.delete('/mail')
async def delete_mail_file_ep():
    os.remove('data.xlsx')
    os.remove('old.xlsx')

@app.post('/mail')
async def send_mail_ep(username: str, password: str, file: UploadFile = File(...)):
    if (ADMIN_USER, ADMIN_PASS) == (username, password):
        contents = file.file.read()
        with open('old.xlsx', 'wb') as f:
            f.write(contents)

        dataframe = xl.readxl('old.xlsx')
        worksheet = dataframe.ws(dataframe.ws_names[0])

        assigned_committees = worksheet.col(15)[1:]
        assigned_portfolios = worksheet.col(16)[1:]
        email_statuses = worksheet.col(17)[1:]

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL(MAIL_SERVER, MAIL_PORT, context=context) as server:
            server.login(MAIL_SENDER, MAIL_PASS)
            for i, (committee, portfolio, email_status) in enumerate(zip(assigned_committees, assigned_portfolios, email_statuses), 1):
                if (committee and portfolio) and not email_status:
                    mailman.send_mail(
                        server,
                        worksheet.index(col=2, row=i+1),
                        body=make_indi_mail_body(
                            worksheet.index(col=3, row=i+1),
                            assigned_committee=committee,
                            assigned_portfolio=portfolio
                        )
                    )

                    print(f"Sending mail to: {worksheet.index(col=2, row=i+1)}")

                    worksheet.update_index(col=17, row=i+1, val=1)

        xl.writexl(dataframe, 'data.xlsx')

        return FileResponse('data.xlsx')


    else:
        return "Authentication Failed."


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='0.0.0.0', port=5000)