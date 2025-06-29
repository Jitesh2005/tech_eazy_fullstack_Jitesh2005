from fastapi import APIRouter, HTTPException
from schemas.parcel_schema import Parcel, ParcelCreate
from services import parcel_service

router = APIRouter()

@router.post("/parcels", response_model=Parcel)
def create(data: ParcelCreate):
    return parcel_service.create_parcel(data)

@router.get("/parcels", response_model=list[Parcel])
def get_all():
    return parcel_service.get_all_parcels()

@router.get("/parcels/{tracking_id}", response_model=Parcel)
def get_by_id(tracking_id: str):
    parcel = parcel_service.get_parcel(tracking_id)
    if not parcel:
        raise HTTPException(status_code=404, detail="Parcel not found")
    return parcel

@router.put("/parcels/{tracking_id}", response_model=Parcel)
def update(tracking_id: str, data: ParcelCreate):
    updated = parcel_service.update_parcel(tracking_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Parcel not found")
    return updated

@router.delete("/parcels/{tracking_id}")
def delete(tracking_id: str):
    deleted = parcel_service.delete_parcel(tracking_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Parcel not found")
    return {"message": "Deleted successfully"}
