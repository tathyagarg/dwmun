from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import registration, matricies

from utils.database_handler import create_tables

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

create_tables()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=5000)
