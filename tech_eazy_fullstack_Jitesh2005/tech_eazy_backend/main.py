from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import parcel_controller

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Add this route for homepage
@app.get("/")
def read_root():
    return {"message": "Zero Mile Delivery System is running 🚀"}

# Include parcel routes
app.include_router(parcel_controller.router)
