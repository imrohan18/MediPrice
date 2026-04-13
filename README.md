# 💊 MediPrice

## 📖 Project Overview
**MediPrice** is a fast, transparent medicine price comparison web application. It empowers patients, caregivers, and medical professionals to compare costs for prescription and cash-pay medicines across local pharmacies. Because retail prices can vary by up to 50% even within the same city, MediPrice aims to curb unnecessary health expenditures by bringing clarity and equity to pharmacy pricing.

## ✨ Features & Functionalities
- **Instant Medicine Search**: Search by medicine name, generic alternative, strength, and pack size to find what you need.
- **Price Comparison & Ranking**: Instantly view the pricing spread across nearby pharmacies, with the cheapest highlighted.
- **Map View & Directions**: Interactive mapped pins displaying cost comparisons (green for cheapest, red for expensive) alongside direct navigation functionality.
- **Favorites & Price Alerts**: Save regular prescriptions to track historical price changes or prepare for localized price drops.

## 🛠 Tech Stack
- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python (FastAPI) *(In Progress)* 
- **Database / Auth**: PostgreSQL, Supabase SSR
- **Mapping**: Mapbox / Google Maps SDK integration

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/imrohan18/MediPrice.git
   cd MediPrice
   ```

2. **Frontend Setup:**
   Navigate into the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `frontend` directory and provide your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## 💡 Usage Example
1. Open the app and navigate to the homepage.
2. Enter a medicine name (e.g., "Paracetamol 500mg" or "Atorvastatin") in the central search bar.
3. Click "Compare".
4. Browse the ranked list of pharmacies. You can view the per-unit cost, total price, and the latest timestamp of the price update.
5. Select a pharmacy to view its location on the embedded map and launch directions.

## 🤝 Contribution Guidelines
We welcome community contributions to help improve MediPrice! To get started:
1. Fork the repository and make your changes in a dedicated branch (e.g., `feature/awesome-new-feature` or `bugfix/price-display`).
2. Follow our existing TypeScript standard and components structure.
3. Commit your changes and open a Pull Request explaining what you added/fixed.
4. For major changes, please open an issue first to discuss what you would like to tackle.

---
*Created to ensure transparent and affordable healthcare options for everyone.*