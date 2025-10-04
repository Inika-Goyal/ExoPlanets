import requests
import json

url = 'http://127.0.0.1:8000/analyze'
try:
    with open('sample.csv', 'rb') as f:
        files = {'file': ('sample.csv', f, 'text/csv')}
        resp = requests.post(url, files=files, timeout=10)
        print(resp.status_code)
        try:
            print(json.dumps(resp.json(), indent=2))
        except Exception:
            print(resp.text)
except FileNotFoundError:
    print('sample.csv not found')
except Exception as e:
    print('Request failed:', e)
