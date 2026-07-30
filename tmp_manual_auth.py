import json
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


def check_server():
    status, result = request_json('/api/health')
    if status != 200:
        print('Server is not available:', status, result)
        return False
    print('Server is available:', result)
    return True


def register_user():
    print('== Register new account ==')
    name = input('Name: ').strip()
    email = input('Email: ').strip()
    password = input('Password: ').strip()
    status, result = request_json('/api/auth/register', method='POST', data={
        'name': name,
        'email': email,
        'password': password,
        'role': 'user'
    })
    print('Register status:', status)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return status == 201


def login_user():
    print('== Login ==')
    identifier = input('Email or username: ').strip()
    password = input('Password: ').strip()
    status, result = request_json('/api/auth/login', method='POST', data={
        'identifier': identifier,
        'password': password
    })
    print('Login status:', status)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return status == 200


if __name__ == '__main__':
    if not check_server():
        exit(1)
    action = input('Choose action ([r]egister, [l]ogin): ').strip().lower()
    if action == 'r':
        register_user()
    elif action == 'l':
        login_user()
    else:
        print('Unknown action.')
