from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_BROKER_URL = os.getenv("REDIS_BROKER_URL", "redis://redis:6379/0")

celery = Celery(
    "worker",
    broker=os.getenv("REDIS_BROKER_URL", "redis://redis:6379/0"),
    backend=os.getenv("REDIS_BROKER_URL", "redis://redis:6379/0"),  
)
