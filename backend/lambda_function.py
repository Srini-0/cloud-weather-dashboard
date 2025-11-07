import json
import os
import urllib.request

def lambda_handler(event, context):
    params = event.get("queryStringParameters") or {}
    city = params.get("city")
    lat = params.get("lat")
    lon = params.get("lon")

    api_key = os.environ.get("OPENWEATHER_API_KEY")
    if not api_key:
        return {"statusCode": 500, "body": json.dumps({"error": "Missing API key"})}

    if city:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    elif lat and lon:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    else:
        return {"statusCode": 400, "body": json.dumps({"error": "Please provide city or coordinates"})}

    try:
        with urllib.request.urlopen(url) as resp:
            data = json.loads(resp.read().decode())
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(data)
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
