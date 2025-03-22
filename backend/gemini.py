import os 
from dotenv import load_dotenv
import requests 
import pandas as pd 

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Read the CSV file and convert it to a string format
read_csv = pd.read_csv("../drugs.csv")

# Convert the DataFrame to a CSV string, excluding the header if needed
csv_data = read_csv.to_csv(index=False)

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

if api_key is None:
    raise ValueError("API key not found")

data = {
    "contents": [{
        "parts": [{
            "text": (
                "Here are a few different drugs. I have listed the name and the ingredients of each drug. "
                "I want you to compare these drugs based on their ingredients and intended effects. If two drugs "
                "serve similar purposes, the cheaper option would be considered optimal. Please format your answer "
                "in the following way:\n\n"
                "Drug 1: [Name] – [Pros and Cons, Does it get the job done? Is the price reasonable? (Include the price)]\n"
                "Drug n: [Name] – [Pros and Cons, Does it get the job done? Is the price reasonable? (Include the price)]\n\n"
                "The drug information is provided in CSV format:\n\n"
                f"{csv_data}"  # Add the actual CSV data here
            )
        }]
    }]
}

response = requests.post(url, params={"key": api_key}, json=data)

if response.status_code == 200:
    print(response.json())
else:
    print("Error: ", response.status_code)
    print(response.text)
