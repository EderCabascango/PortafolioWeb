import requests

url = "http://127.0.0.1:8000/api/predict/"
data = {"sequence": [[0.5]*62]*28}  # 28 días, 62 features
r = requests.post(url, json=data)
print(r.json())
