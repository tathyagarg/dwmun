import os
import smtplib

import dotenv
from email.mime.text import MIMEText

from .logging import *

dotenv.load_dotenv()

SUBJECT = "DWMUN'24 Allotment"

SENDER: str = os.getenv('MAIL_SENDER')

def send_mail(server: smtplib.SMTP_SSL, recv: str, body: str) -> None:
    log(
        LogLevel.INFO,
        f'Sending mail\n\tReciever: {recv!r}',
        'utils.mailman.send_mail'
    )
    msg = MIMEText(body)
    msg['Subject'] = SUBJECT
    msg['From'] = SENDER
    msg['To'] = recv

    server.sendmail(SENDER, recv, msg.as_string())

    log(
        LogLevel.INFO,
        f'Mail sent successfully',
        'utils.mailman.send_mail'
    )

