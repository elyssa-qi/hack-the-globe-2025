import os 
from dotenv import load_dotenv
from google import genai 
import requests 

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

if api_key is None:
    raise ValueError("API key not found")

data = {
    "contents": [{
        "parts": [{"text": "Explain how AI works"}]
    }]
}

response = requests.post(url, params={"key": api_key}, json=data)

if response.status_code == 200:
    print(response.json())
else: 
    print("bad")