import json
import time
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

BASE = 'http://127.0.0.1:3001'


def request_json(path, method='GET', data=None, headers=None):
    url = f'{BASE}{path}'
    payload = None
    if data is not None:
        payload = json.dumps(data).encode('utf-8')
    req = Request(url, data=payload, method=method)
    req.add_header('Content-Type', 'application/json')
    if headers:
        for key, value in headers.items():
            req.add_header(key, value)
    try:
        with urlopen(req, timeout=5) as resp:
            body = resp.read().decode('utf-8')
            return resp.status, json.loads(body)
    except HTTPError as exc:
        body = exc.read().decode('utf-8')
        try:
            return exc.code, json.loads(body)
        except Exception:
            return exc.code, {'error': body}
    except URLError as exc:
        return None, {'error': str(exc)}


if __name__ == '__main__':
    print('Checking server...')
    status, result = request_json('/api/health')
    print('health:', status, result)
    if status is None:
        print('Server appears down; cannot continue.')
    else:
        unique_id = int(time.time())
        email = f'test-user-{unique_id}@example.com'
        password = 'TestPass#2026'
        print('Registering new account:', email)
        status, result = request_json('/api/auth/register', method='POST', data={
            'name': 'Auto Tester',
            'email': email,
            'password': password,
            'role': 'user'
        })
        print('register:', status, result)
        if status == 201:
            print('Logging in with new account...')
            status, result = request_json('/api/auth/login', method='POST', data={
                'identifier': email,
                'password': password
            })
            print('login:', status, result)
        else:
            print('Skipping login because registration failed.')
