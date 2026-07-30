import urllib.request
import urllib.error

url = 'http://127.0.0.1:3001/api/health'
try:
    with urllib.request.urlopen(url, timeout=5) as r:
        print(r.status)
        print(r.read().decode())
except Exception as exc:
    print('ERROR', repr(exc))
