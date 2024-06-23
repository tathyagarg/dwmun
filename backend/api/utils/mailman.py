import os
import ssl
import smtplib

import dotenv
from email.mime.text import MIMEText

dotenv.load_dotenv()

SUBJECT = "DWMUN'24 Allotment"

SENDER = os.getenv('MAIL_SENDER')

def send_mail(server: smtplib.SMTP_SSL, recv: str, body: str):
    msg = MIMEText(body)
    msg['Subject'] = SUBJECT
    msg['From'] = SENDER
    msg['To'] = recv

    server.sendmail(SENDER, recv, msg.as_string())

