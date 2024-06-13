from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import registration

from utils.database_handler import create_tables, run_sql

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

routers = [registration.router]

for router in routers:
    app.include_router(router)

create_tables()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=5000)
