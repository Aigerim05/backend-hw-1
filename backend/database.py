import os
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("❌ SQLALCHEMY_DATABASE_URL is not set")

# Увеличим число попыток и добавим лог
MAX_RETRIES = 20
WAIT_SECONDS = 2

for i in range(MAX_RETRIES):
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        with engine.connect() as conn:
            print("✅ Successfully connected to the database.")
        break
    except OperationalError as e:
        print(f"⏳ Attempt {i + 1}/{MAX_RETRIES}: DB not ready yet. Waiting...")
        time.sleep(WAIT_SECONDS)
else:
    raise Exception("❌ Could not connect to the database after several attempts.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
