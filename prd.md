# PRD: “MediPrice” – Transparent Medicine Price Comparison App

Last updated: April 13, 2026  
Team: [Your Name] – HealthTech / Consumer App

---

## 1. Problem statement

- Patients and caregivers often pay **30–50% more** for the same prescription medicine at one pharmacy vs. another, even within the same city.  
- Current behavior:
  - No simple way to **compare retail prices** across nearby pharmacies before buying.
  - Patients usually:
    - Go to the nearest pharmacy.
    - Ask verbally at the counter.
    - Often **don’t shop around**.
- This leads to:
  - **Unnecessary over‑spending** on cash‑pay prescriptions.
  - **Inequity**: low‑income patients are hit hardest.
  - **Poor price transparency** across pharmacy chains.

MediPrice will allow users to **search any prescription medicine** and instantly see **real‑time or near‑real prices** across nearby pharmacies, so they can choose the most affordable option.

---

## 2. Vision

Create a simple, fast mobile‑first web app that shows:
- **Per‑pharmacy price** for a given medicine (name, dosage, pack size).
- **Nearest stores** and **price ranking**.
- Optional:
  - Filters (online vs. in‑store, cash vs. insurance‑linked offers).
  - Push alerts for price drops on frequently used medicines.

End‑state:  
“Before you pay for your prescription, you already know where it’s cheapest near you.”

---

## 3. Target user

- **Primary users**:
  - **Cash‑pay patients** without strong insurance coverage.
  - **Caregivers** buying for elderly or chronic patients.
  - **Young adults** price‑shopping common meds (painkillers, antihistamines, etc.).
- **Secondary users**:
  - Family doctors / clinics who want to **recommend low‑cost pharmacies**.
  - Employers/health plans who want to share a “price‑check” tool.

---

## 4. Key features (MVP scope)

### 4.1 Search by medicine

- User inputs:
  - **Medicine name** (e.g., “Paracetamol 500mg”, “Atorvastatin 20mg”).
  - Optional: strength, pack size, brand vs. generic.
- The app:
  - Normalizes the query (e.g., “Paracetamol 500mg” vs “Crocin 500” → canonical product).
  - Returns a **list of nearby pharmacies** selling that medicine.

### 4.2 Price comparison list

- For the selected medicine, show:
  - **List of pharmacies** (name, distance, type: chain / local).
  - **Price per unit** (e.g., per tablet, per strip).
  - **Total price** for the pack on screen.
  - **Source timestamp** (when price was last updated).
- Highlight:
  - **Lowest price** option.
  - Options that are **> X% cheaper** than median price.

### 4.3 Map + directions

- Embedded map (Google Maps / Mapbox) showing:
  - Pins for pharmacies with the medicine.
  - Color‑coded pins by price (green = cheapest, orange = medium, red = expensive).
- “Directions” button to launch:
  - Google Maps / Apple Maps navigation.

### 4.4 Save / compare favorites

- User can:
  - **Save a medicine** (e.g., “Atorvastatin 20mg”) to a favorites list.
  - See a **history** of prices for that medicine over time.
- Optional MVP‑plus:
  - Price‑drop alerts (email / push) for favorite medicines.

---

## 5. How it works (high‑level)

### 5.1 Data sources (MVP)

- **Manual scraping / API from large pharmacy chains**:
  - Use public web apps or partner APIs to get:
    - Medicine name, strength, pack size.
    - Current price.
    - Store location (lat/lon or address).
- **User‑reported prices** (lite‑mode):
  - Allow users to upload a **photo of the bill** or type in the price.
  - Verify by:
    - Store name + date.
    - Optionally, QR‑code / prescription ID (if available).

### 5.2 Frontend (Next.js / TypeScript)

- **Tech stack**:
  - Next.js App Router, TypeScript, React.
  - Tailwind CSS for responsive UI.
  - Map library (Google Maps JS SDK or Mapbox).
- Pages:
  - `/search` – Medicine search screen.
  - `/compare/:medicineId` – Price comparison list + map.
  - `/profile` – Saved medicines + alerts.

### 5.3 Backend (Python)

- **Tech stack**:
  - Python (FastAPI or Django REST).
  - PostgreSQL (medicine catalog, pharmacy locations, prices, users).
- Core services:
  - **Medicine catalog service**:
    - Store normalized medicine entries (name, strength, pack size, ID).
  - **Price ingestion service**:
    - Periodically fetch prices from pharmacy sources.
    - Store historical prices for each medicine + store.
  - **Search & ranking service**:
    - On user query → match to medicine ID → return price list + distances.
  - **User service**:
    - Auth (Google / email), favorites, alerts.

---

## 6. Constraints & assumptions (MVP)

- **Geographic scope (MVP)**:
  - Focus on **one city or metro area** (e.g., Pune first).
- **Data coverage**:
  - Initially, cover **top N pharmacy chains** (e.g., 3–5) and popular generic medicines.
- **Pricing update frequency**:
  - Nightly or every 12 hours (not real‑time RFID‑level).
- **Regulatory / legal**:
  - Assume:
    - Data is **public retail price**.
    - No patient‑level prescription data stored in the app (price only by medicine + store).
  - No dispensing of medicines; only **price comparison**.

---

## 7. Success metrics (MVP)

- **User‑level**:
  - Users who search at least **one medicine per week**.
  - % of users who **switch pharmacy** after seeing the app.
- **Economic impact**:
  - Estimated **average ₹ saved per prescription** (via user survey).
- **Data quality**:
  - % of searched medicines with **price data from ≥2 pharmacies**.
- **Engagement**:
  - DAU / WAU.
  - Average medicines saved per user.

---

## 8. Open questions & risks

- **Data quality**:
  - How often do pharmacies change prices?
  - How to handle **online vs. in‑store** pricing differences?
- **Partnerships**:
  - Should we negotiate official API access with pharmacy chains?
- **Legal / compliance**:
  - Local regulations around displaying drug prices and references.
- **Fraud**:
  - Prevent fake user‑reported prices.

---

## 9. Next‑step roadmap (next 3 months)

- Month 1:
  - Set up basic medicine + pharmacy catalog.
  - Build `/search` and `/compare` pages.
- Month 2:
  - Connect to 2–3 pharmacy data sources.
  - Add map view and favorite medicines.
- Month 3:
  - Add user accounts + alerts.
  - Run small pilot with 100–200 users in one city.
