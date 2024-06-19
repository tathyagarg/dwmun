from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from routes import registration, matricies
from utils.encryption import encrypt
from utils.database_handler import fetch_admin_data, fetch_all_delegates
import xlsxwriter
import urllib.request
import re
import os

from utils.database_handler import create_tables, drop_tables

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

routers = [registration.router, matricies.router]

for router in routers:
    app.include_router(router)

# drop_tables()
create_tables()

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
        data = fetch_all_delegates()

        contents = file.file.read()
        with open('data.xlsx', 'wb') as f:
            f.write(contents)


        # Process new data



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=5000)
