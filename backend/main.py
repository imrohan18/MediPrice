from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import medicines

app = FastAPI(title="MediPrice API")

# Configure CORS for local Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(medicines.router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
