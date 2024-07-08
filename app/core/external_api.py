import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException, status
load_dotenv()

RAPID_API_KEY = os.getenv('RAPID_API_KEY')
URL = os.getenv('RAPID_API_URL')

def call_api(params):
    try:
        response = requests.get(
            url=URL, 
            params=params, 
            headers={'x-rapidapi-key':RAPID_API_KEY}
        )
        response.raise_for_status()
        data = response.json()

    except requests.exceptions.RequestException as e:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=e)
    
    return data