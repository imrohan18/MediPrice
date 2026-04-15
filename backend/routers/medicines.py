from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import csv
import os
import random

router = APIRouter()

# Models
class Medicine(BaseModel):
    id: str
    name: str
    strength: str
    pack_size: str

class PharmacyPrice(BaseModel):
    pharmacy_name: str
    distance_km: float
    type: str # "chain" or "local"
    price_per_unit: float
    total_price: float
    lat: float
    lon: float
    last_updated: str

class CompareResult(BaseModel):
    medicine: Medicine
    prices: List[PharmacyPrice]

# Load Dataset
DATASET_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "medicine_price_dataset.csv")
MEDICINES_DATA = []

def load_data():
    if not os.path.exists(DATASET_PATH):
        return
    with open(DATASET_PATH, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            MEDICINES_DATA.append({
                "id": str(row["medicine_id"]),
                "name": str(row["medicine_name"]),
                "strength": f'{row["dosage_mg"]}mg',
                "pack_size": f'{row["pack_size"]} units',
                "company": str(row["company"]),
                "base_price": float(row["price"]) if row["price"] else 0.0,
            })

load_data()

@router.get("/search", response_model=List[Medicine])
def search_medicines(q: str):
    q_lower = q.lower()
    # Return max 20 results to avoid massive payloads
    results = []
    for m in MEDICINES_DATA:
        if q_lower in m["name"].lower():
            results.append({
                "id": m["id"],
                "name": m["name"],
                "strength": m["strength"],
                "pack_size": m["pack_size"]
            })
            if len(results) >= 20:
                break
    return results

@router.get("/compare/{medicine_id}", response_model=CompareResult)
def compare_prices(medicine_id: str):
    # Find medicine
    med_data = next((m for m in MEDICINES_DATA if m["id"] == medicine_id), None)
    if not med_data:
        return {"error": "Medicine not found"}
    
    med = Medicine(
        id=med_data["id"],
        name=med_data["name"],
        strength=med_data["strength"],
        pack_size=med_data["pack_size"]
    )
    
    base_price = med_data["base_price"]
    
    # Generate some mock prices around the base price
    mock_prices = [
        {
            "pharmacy_name": "Apollo Pharmacy",
            "distance_km": 1.2,
            "type": "chain",
            "price_per_unit": round(base_price * 1.05 / 10, 2), # Assuming pack of 10 usually
            "total_price": round(base_price * 1.05, 2),
            "lat": 18.5204,
            "lon": 73.8567,
            "last_updated": "2026-04-14T10:00:00Z"
        },
        {
            "pharmacy_name": "Wellness Forever",
            "distance_km": 0.8,
            "type": "chain",
            "price_per_unit": round(base_price * 1.02 / 10, 2),
            "total_price": round(base_price * 1.02, 2),
            "lat": 18.5215,
            "lon": 73.8550,
            "last_updated": "2026-04-14T09:30:00Z"
        },
        {
            "pharmacy_name": "Local Chemist",
            "distance_km": 0.3,
            "type": "local",
            "price_per_unit": round(base_price * 0.95 / 10, 2),
            "total_price": round(base_price * 0.95, 2),
            "lat": 18.5190,
            "lon": 73.8540,
            "last_updated": "2026-04-13T18:00:00Z"
        }
    ]
    
    return CompareResult(medicine=med, prices=mock_prices)
