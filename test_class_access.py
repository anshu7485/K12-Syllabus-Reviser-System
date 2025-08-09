#!/usr/bin/env python3
"""
Test script to verify class-based access control functionality
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_class_access_control():
    print("🧪 Testing Class-Based Access Control")
    print("=" * 50)
    
    # Test 1: Create test users
    print("\n1. Creating test users...")
    
    # Create a student for class 10
    student_data = {
        "name": "Test Student Class 10",
        "email": "student10@test.com",
        "password": "password123",
        "role": "student",
        "student_class": "10"
    }
    
    response = requests.post(f"{BASE_URL}/signup", json=student_data)
    print(f"Student signup: {response.status_code} - {response.json()}")
    
    # Create a student for class 5
    student5_data = {
        "name": "Test Student Class 5",
        "email": "student5@test.com",
        "password": "password123",
        "role": "student",
        "student_class": "5"
    }
    
    response = requests.post(f"{BASE_URL}/signup", json=student5_data)
    print(f"Student5 signup: {response.status_code} - {response.json()}")
    
    # Test 2: Login as class 10 student
    print("\n2. Testing class 10 student access...")
    
    login_data = {
        "email": "student10@test.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    if response.status_code == 200:
        user_data = response.json()
        user_id = user_data['user']['id']
        print(f"✅ Login successful for class 10 student, ID: {user_id}")
        
        # Test accessing class 10 subjects
        headers = {"X-User-ID": str(user_id)}
        response = requests.get(f"{BASE_URL}/subjects/10", headers=headers)
        print(f"✅ Access to class 10 subjects: {response.status_code}")
        if response.status_code == 200:
            subjects = response.json()
            print(f"   Found {len(subjects)} subjects for class 10")
        
        # Test accessing class 5 subjects (should be denied)
        response = requests.get(f"{BASE_URL}/subjects/5", headers=headers)
        print(f"❌ Access to class 5 subjects: {response.status_code}")
        if response.status_code == 403:
            print(f"   ✅ Correctly denied: {response.json()}")
    
    # Test 3: Login as class 5 student
    print("\n3. Testing class 5 student access...")
    
    login_data = {
        "email": "student5@test.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    if response.status_code == 200:
        user_data = response.json()
        user_id = user_data['user']['id']
        print(f"✅ Login successful for class 5 student, ID: {user_id}")
        
        # Test accessing class 5 subjects
        headers = {"X-User-ID": str(user_id)}
        response = requests.get(f"{BASE_URL}/subjects/5", headers=headers)
        print(f"✅ Access to class 5 subjects: {response.status_code}")
        if response.status_code == 200:
            subjects = response.json()
            print(f"   Found {len(subjects)} subjects for class 5")
        
        # Test accessing class 10 subjects (should be denied)
        response = requests.get(f"{BASE_URL}/subjects/10", headers=headers)
        print(f"❌ Access to class 10 subjects: {response.status_code}")
        if response.status_code == 403:
            print(f"   ✅ Correctly denied: {response.json()}")
    
    print("\n🎉 Class-based access control testing completed!")

if __name__ == "__main__":
    test_class_access_control()
