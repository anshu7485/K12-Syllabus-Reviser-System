import requests
import json

# Test signup
def test_signup():
    url = "http://localhost:8000/signup"
    data = {
        "name": "Test User",
        "email": "test@example.com", 
        "password": "password123",
        "role": "student"
    }
    
    response = requests.post(url, json=data)
    print("Signup Response:", response.status_code, response.json())
    return response

# Test login
def test_login():
    url = "http://localhost:8000/login"
    data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    response = requests.post(url, json=data)
    print("Login Response:", response.status_code, response.json())
    return response

if __name__ == "__main__":
    print("Testing signup...")
    signup_response = test_signup()
    
    print("\nTesting login...")
    login_response = test_login()
