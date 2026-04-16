# Backend Setup Guide

## Prerequisites

- Python 3.8+
- A free [Supabase](https://supabase.com) account

---

## 1. Create the Database Table

In your Supabase project → **SQL Editor**, run:

```sql
CREATE TABLE medicines (
    medicine_id           TEXT     PRIMARY KEY,
    medicine_name         TEXT     NOT NULL,
    category              TEXT,
    company               TEXT,
    dosage_mg             NUMERIC,
    pack_size             INTEGER,
    manufacturing_cost    NUMERIC,
    import_status         TEXT,
    demand_level          TEXT,
    expiry_months         INTEGER,
    prescription_required BOOLEAN,
    price                 NUMERIC
);
```

---

## 2. Import Seed Data

1. Go to **Table Editor** → `medicines` table
2. Click **Insert → Import data from CSV**
3. Upload `medicine_price_dataset.csv` (located in the `backend/` folder)
4. Click **Import**

---

## 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials from  
**Supabase Dashboard → Project Settings → API**:

```
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_KEY=<your-anon-public-key>
```

---

## 4. Install Dependencies & Run

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

## 5. Verify

```
GET http://localhost:8000/api/health
GET http://localhost:8000/api/search?q=paracetamol
GET http://localhost:8000/api/compare/<medicine_id>
```
