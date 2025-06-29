from models.parcel import Parcel
from storage.in_memory_db import parcel_db
import uuid

def create_parcel(data):
    tracking_id = str(uuid.uuid4())
    parcel = Parcel(**data.dict(), tracking_id=tracking_id)
    parcel_db[tracking_id] = parcel
    return parcel

def get_all_parcels():
    return list(parcel_db.values())

def get_parcel(tracking_id):
    return parcel_db.get(tracking_id)

def update_parcel(tracking_id, data):
    if tracking_id in parcel_db:
        parcel = parcel_db[tracking_id]
        for key, value in data.dict().items():
            setattr(parcel, key, value)
        return parcel
    return None

def delete_parcel(tracking_id):
    return parcel_db.pop(tracking_id, None)
