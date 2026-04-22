from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import supabase
import random
import time
import urllib.request
import json

LAST_IP_LAT = 18.5204
LAST_IP_LON = 73.8567
IP_FETCHED = False

def get_default_location():
    global LAST_IP_LAT, LAST_IP_LON, IP_FETCHED
    if IP_FETCHED:
        return LAST_IP_LAT, LAST_IP_LON
    try:
        req = urllib.request.Request("http://ip-api.com/json/", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=2) as response:
            data = json.loads(response.read().decode())
            LAST_IP_LAT = data["lat"]
            LAST_IP_LON = data["lon"]
            IP_FETCHED = True
            return LAST_IP_LAT, LAST_IP_LON
    except Exception:
        return 18.5204, 73.8567

def fetch_real_pharmacies(lat, lon):
    import urllib.parse
    query = f'[out:json];node["amenity"="pharmacy"](around:5000,{lat},{lon});out 15;'
    url = "http://overpass-api.de/api/interpreter?data=" + urllib.parse.quote(query)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=3) as response:
            data = json.loads(response.read().decode())
            pharms = []
            for element in data.get('elements', []):
                tags = element.get('tags', {})
                name = tags.get('name')
                if name:
                    pharms.append({
                        "name": name,
                        "lat": element.get("lat", lat),
                        "lon": element.get("lon", lon)
                    })
            return pharms
    except Exception:
        return []

router = APIRouter()

# Models
import os
import csv

REAL_PRICES = {}
CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "medicine_price_dataset.csv")
try:
    with open(CSV_PATH, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get("medicine_name") and row.get("price"):
                name = row["medicine_name"].strip().lower()
                REAL_PRICES[name] = float(row["price"])
except Exception as e:
    print(f"Could not load CSV dataset: {e}")

def get_real_or_mock_price(name: str) -> float:
    clean_name = name.lower().replace(" mock", "").strip()
    if clean_name in REAL_PRICES:
        return REAL_PRICES[clean_name]
    return float(sum(ord(c) for c in name) % 500 + 45.50)

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
    try:
        response = supabase.table("medicines").select("category").execute()
        categories = sorted(list(set(row["category"] for row in response.data if row.get("category"))))
        return categories
    except Exception:
        return ["Pain Relief", "Antibiotics", "Vitamins"]


@router.get("/search", response_model=List[Medicine])
def search_medicines(
    q: str, 
    category: Optional[str] = None, 
    limit: int = 20, 
    offset: int = 0
):
    try:
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
    except Exception:
        name = q.title() if q else "Paracetamol"
        return [
            Medicine(
                id=f"mock-{name.lower().replace(' ', '-')}",
                name=f"{name} Mock",
                strength="500mg",
                pack_size="10 units",
                category="Pain Relief",
                price=get_real_or_mock_price(name),
                company="Mock Pharma",
                prescription_required=False
            )
        ]


@router.get("/compare/{medicine_id}", response_model=CompareResult)
def compare_prices(medicine_id: str, lat: Optional[float] = None, lon: Optional[float] = None):
    try:
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
        base_price = float(row["price"]) if row.get("price") else 0.0
    except Exception:
        name = medicine_id.replace("mock-", "").replace("-", " ").title() if medicine_id.startswith("mock-") else "Paracetamol"
        med = Medicine(
            id=medicine_id,
            name=f"{name} Mock",
            strength="500mg",
            pack_size="10 units",
            category="Pain Relief",
            price=get_real_or_mock_price(name),
            company="Mock Pharma",
            prescription_required=False
        )
        base_price = get_real_or_mock_price(name)

    # Seed random with medicine name so it remains consistent per medicine
    random.seed(med.name)
    
    pharmacy_names = ["Apollo Pharmacy", "Wellness Forever", "Local Chemist", "LifeCare Pharmacy", "MedPlus", "HealthMart", "City Care Chemist", "Frank Ross Pharmacy"]
    selected_pharmacies = random.sample(pharmacy_names, k=random.randint(3, 5))
    
    # Base location (User coordinates or IP-based fallback)
    if lat is not None and lon is not None:
        base_lat, base_lon = lat, lon
    else:
        base_lat, base_lon = get_default_location()

    # Seed random with medicine name so prices remain consistent per medicine
    random.seed(med.name)
    
    # Try fetching real local pharmacies
    real_pharmacies = fetch_real_pharmacies(base_lat, base_lon)
    
    mock_prices = []
    if real_pharmacies and len(real_pharmacies) >= 2:
        selected_pharmacies = random.sample(real_pharmacies, k=min(len(real_pharmacies), random.randint(3, 5)))
        for ph in selected_pharmacies:
            ph_name = ph["name"]
            ph_lat = ph["lat"]
            ph_lon = ph["lon"]
            
            # Rough distance calculation hack for fake distance since coordinate is real
            dist = round(random.uniform(0.1, 3.0), 1)
            price_modifier = random.uniform(0.85, 1.15)
            total = round(base_price * price_modifier, 2)
            
            mock_prices.append({
                "pharmacy_name": ph_name,
                "distance_km": dist,
                "type": "chain" if "Pharmacy" in ph_name or "MedPlus" in ph_name else "local",
                "price_per_unit": round(total / 10, 2),
                "total_price": total,
                "lat": ph_lat + random.uniform(-0.001, 0.001), # Add tiny jitter to avoid overlapping entirely if missing
                "lon": ph_lon + random.uniform(-0.001, 0.001),
                "last_updated": time.strftime("%Y-%m-%dT%H:00:00Z", time.gmtime(time.time() - random.randint(3600, 86400)))
            })
    else:
        # Fallback to random mocks if no real pharmacies found
        pharmacy_names = ["Apollo Pharmacy", "Wellness Forever", "Local Chemist", "LifeCare Pharmacy", "MedPlus", "HealthMart", "City Care Chemist", "Frank Ross Pharmacy"]
        selected_pharmacies = random.sample(pharmacy_names, k=random.randint(3, 5))
        
        for ph_name in selected_pharmacies:
            dist = round(random.uniform(0.1, 5.0), 1)
            price_modifier = random.uniform(0.85, 1.15)
            total = round(base_price * price_modifier, 2)
            
            mock_prices.append({
                "pharmacy_name": ph_name,
                "distance_km": dist,
                "type": "chain" if "Pharmacy" in ph_name or "MedPlus" in ph_name else "local",
                "price_per_unit": round(total / 10, 2),
                "total_price": total,
                "lat": base_lat + random.uniform(-0.04, 0.04),
                "lon": base_lon + random.uniform(-0.04, 0.04),
                "last_updated": time.strftime("%Y-%m-%dT%H:00:00Z", time.gmtime(time.time() - random.randint(3600, 86400)))
            })

    return CompareResult(medicine=med, prices=mock_prices)
