import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://mock.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "mock_key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
