from pydantic import BaseModel
from typing import Optional
import uuid

class ParcelCreate(BaseModel):
    customer_name: str
    delivery_address: str
    contact_number: str
    parcel_size: str
    parcel_weight: float

class Parcel(ParcelCreate):
    tracking_id: str
