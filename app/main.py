
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import users, mutual_fund

app = FastAPI()
app.include_router(users.router)
app.include_router(mutual_fund.router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Application Running!"}

