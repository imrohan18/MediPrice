from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import supabase

router = APIRouter()

# Models
class Medicine(BaseModel):
    id: str
    name: str
    strength: str
    pack_size: str
    category: str
    price: float
    company: str
    prescription_required: bool

class PharmacyPrice(BaseModel):
    pharmacy_name: str
    distance_km: float
    type: str  # "chain" or "local"
    price_per_unit: float
    total_price: float
    lat: float
    lon: float
    last_updated: str

class CompareResult(BaseModel):
    medicine: Medicine
    prices: List[PharmacyPrice]


@router.get("/categories", response_model=List[str])
def get_categories():
    # Fetch unique categories from Supabase
    response = supabase.table("medicines").select("category").execute()
    # Use a set to get unique values
    categories = sorted(list(set(row["category"] for row in response.data if row.get("category"))))
    return categories


@router.get("/search", response_model=List[Medicine])
def search_medicines(
    q: str, 
    category: Optional[str] = None, 
    limit: int = 20, 
    offset: int = 0
):
    query = supabase.table("medicines").select("*").ilike("medicine_name", f"%{q}%")
    
    if category:
        query = query.eq("category", category)
        
    response = query.range(offset, offset + limit - 1).execute()
    
    return [
        Medicine(
            id=row["medicine_id"],
            name=row["medicine_name"],
            strength=f'{row["dosage_mg"]}mg',
            pack_size=f'{row["pack_size"]} units',
            category=row.get("category") or "",
            price=float(row["price"]) if row.get("price") else 0.0,
            company=row.get("company") or "",
            prescription_required=bool(row.get("prescription_required"))
        )
        for row in response.data
    ]


@router.get("/compare/{medicine_id}", response_model=CompareResult)
def compare_prices(medicine_id: str):
    response = (
        supabase.table("medicines")
        .select("*")
        .eq("medicine_id", medicine_id)
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Medicine not found")

    row = response.data
    med = Medicine(
        id=row["medicine_id"],
        name=row["medicine_name"],
        strength=f'{row["dosage_mg"]}mg',
        pack_size=f'{row["pack_size"]} units',
        category=row.get("category") or "",
        price=float(row["price"]) if row.get("price") else 0.0,
        company=row.get("company") or "",
        prescription_required=bool(row.get("prescription_required"))
    )

    base_price = float(row["price"]) if row["price"] else 0.0

    # Generate mock prices around the base price
    mock_prices = [
        {
            "pharmacy_name": "Apollo Pharmacy",
            "distance_km": 1.2,
            "type": "chain",
            "price_per_unit": round(base_price * 1.05 / 10, 2),
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
