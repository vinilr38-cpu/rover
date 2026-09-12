import time
import json
import random
import requests # Make sure you have this installed: pip install requests

# --- FIREBASE CONFIGURATION ---
# Paste your database URL here. Make sure it ends with a slash!
FIREBASE_URL = "https://regris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/"
ROVER_ID = "REGRIS-01"

def generate_payload():
    infection_severity = random.choice(["None", "Mild", "Severe"])
    dosage = 5 if infection_severity == "Mild" else (15 if infection_severity == "Severe" else 0)

    return {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "gps": {
            "lat": 13.1234 + random.uniform(-0.001, 0.001), 
            "lng": 77.5678 + random.uniform(-0.001, 0.001)
        },
        "hardware": {
            "battery_pct": random.randint(70, 100),
            "tank_pct": random.randint(40, 90)
        },
        "ai_detection": {
            "disease": "Leaf Blight" if infection_severity != "None" else "Healthy",
            "severity": infection_severity,
            "dosage_ml": dosage,
            "sprayed": dosage > 0
        }
    }

print("Starting REGRIS Telemetry via Firebase...")
try:
    while True:
        try:
            payload = generate_payload()
            url = f"{FIREBASE_URL}{ROVER_ID}.json"
            response = requests.patch(url, json=payload, timeout=5)
            
            if response.status_code == 200:
                print(f"Success -> {payload['ai_detection']['severity']} infection. Sprayed: {payload['ai_detection']['dosage_ml']}ml")
            else:
                print(f"Error: {response.text}")
        except Exception as err:
            print(f"Network retry -> {err}")
            
        time.sleep(3) 
except KeyboardInterrupt:
    print("Stopping emitter...")
