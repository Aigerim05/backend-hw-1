from celery_app import celery
from celery import shared_task
from database import SessionLocal
import crud
from schemas import ItemCreate

@celery.task
def create_item_task(item_data: dict):
    db = SessionLocal()
    try:
        item_schema = ItemCreate(**item_data)
        result = crud.create_item(db, item_schema)
        return {"id": result.id, "name": result.name}
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
