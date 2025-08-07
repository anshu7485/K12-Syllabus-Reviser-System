import requests
import json

def create_student_user():
    url = "http://localhost:8000/signup"
    data = {
        "name": "Test Student",
        "email": "student@example.com", 
        "password": "password123",
        "role": "student",
        "student_class": "10"
    }
    
    response = requests.post(url, json=data)
    print("Student Signup Response:", response.status_code, response.json())
    return response

def create_teacher_user():
    url = "http://localhost:8000/signup"
    data = {
        "name": "Test Teacher",
        "email": "teacher@example.com", 
        "password": "password123",
        "role": "teacher"
    }
    
    response = requests.post(url, json=data)
    print("Teacher Signup Response:", response.status_code, response.json())
    return response

def create_admin_user():
    url = "http://localhost:8000/signup"
    data = {
        "name": "Test Admin",
        "email": "admin@example.com", 
        "password": "password123",
        "role": "admin"
    }
    
    response = requests.post(url, json=data)
    print("Admin Signup Response:", response.status_code, response.json())
    return response

def test_login(email, password):
    url = "http://localhost:8000/login"
    data = {
        "email": email,
        "password": password
    }
    
    response = requests.post(url, json=data)
    print(f"Login Response for {email}:", response.status_code, response.json())
    return response

if __name__ == "__main__":
    print("Creating test users...")
    
    print("\n1. Creating Student User...")
    create_student_user()
    
    print("\n2. Creating Teacher User...")
    create_teacher_user()
    
    print("\n3. Creating Admin User...")
    create_admin_user()
    
    print("\n4. Testing Login for Student...")
    test_login("student@example.com", "password123")
    
    print("\n5. Testing Login for Teacher...")
    test_login("teacher@example.com", "password123")
    
    print("\n6. Testing Login for Admin...")
    test_login("admin@example.com", "password123")
