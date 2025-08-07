from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import os
import MySQLdb
from routes.performance import performance_bp
from routes.subject import subject_bp
from routes.upload import upload_bp




app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
     allow_headers=["Content-Type", "Authorization"])


# ============================ App Configuration ============================
app.register_blueprint(performance_bp, url_prefix="/performance")
app.register_blueprint(subject_bp)
app.register_blueprint(upload_bp, url_prefix="/api/questions")



# ============================ MySQL Configuration ============================

# Function to create database if it doesn't exist
def create_database_if_not_exists():
    try:
        # Connect to MySQL without specifying database
        connection = MySQLdb.connect(
            host='localhost',
            user='root',
            passwd='anshu906'
        )
        cursor = connection.cursor()
        
        # Create database if it doesn't exist
        cursor.execute("CREATE DATABASE IF NOT EXISTS k12_reviser")
        print("✅ Database 'k12_reviser' created or already exists")
        
        # Check if database was created
        cursor.execute("SHOW DATABASES LIKE 'k12_reviser'")
        result = cursor.fetchone()
        if result:
            print("✅ Database 'k12_reviser' is ready to use")
        else:
            print("❌ Failed to create database 'k12_reviser'")
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        print("Please make sure MySQL server is running and credentials are correct")
        raise e

# Create database before configuring Flask-MySQL
create_database_if_not_exists()

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'anshu906'
app.config['MYSQL_DB'] = 'k12_reviser'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
app.mysql = mysql

# ============================ Execute DB Schema SQL File ============================

def execute_sql_script(filepath):
    try:
        with open(filepath, 'r') as file:
            sql_commands = file.read().split(';')
            cursor = mysql.connection.cursor()
            executed_commands = 0
            
            for command in sql_commands:
                cmd = command.strip()
                if cmd:
                    cursor.execute(cmd)
                    executed_commands += 1
                    
            mysql.connection.commit()
            cursor.close()
            print(f"✅ Successfully executed {executed_commands} SQL commands from schema file")
            
    except Exception as e:
        print(f"❌ Error executing SQL script: {e}")
        raise e

# Run schema creation on startup
with app.app_context():
    schema_path = os.path.join(os.path.dirname(__file__), 'db', 'db_schema.sql')
    if os.path.exists(schema_path):
        print("📋 Executing database schema...")
        execute_sql_script(schema_path)
        print("✅ Database tables created successfully!")
    else:
        print("⚠️ db_schema.sql not found at:", schema_path)

# ============================ Signup Endpoint ============================

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    student_class = data.get('student_class') if role == 'student' else None

    if not all([name, email, password, role]):
        return jsonify({"message": "Missing required fields"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cursor.fetchone() is not None:
        cursor.close()
        return jsonify({"message": "Email already registered"}), 409

    cursor.execute("""
        INSERT INTO users (name, email, password, role, student_class)
        VALUES (%s, %s, %s, %s, %s)
    """, (name, email, hashed_password, role, student_class))
    mysql.connection.commit()
    user_id = cursor.lastrowid
    cursor.close()

    return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

# ============================ Login Endpoint ============================

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        print(f"Login attempt for email: {email}")

        if not email or not password:
            return jsonify({'message': 'Email and password required'}), 400

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, name, email, password, role, student_class FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            user_id, name, email, hashed_password, role, student_class = user
            print(f"User found: {name}, role: {role}, class: {student_class}")
            if bcrypt.check_password_hash(hashed_password, password):
                response_data = {
                    "access_token": "dummy_token",
                    "token_type": "bearer",
                    "user": {
                        "id": user_id,
                        "name": name,
                        "email": email,
                        "role": role,
                        "student_class": student_class
                    }
                }
                print(f"Login successful for {email}")
                return jsonify(response_data), 200
            else:
                print(f"Invalid password for {email}")
                return jsonify({'message': 'Invalid credentials'}), 401
        else:
            print(f"User not found: {email}")
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500

# ============================ Upload Question V1 ============================

@app.route('/questions/upload', methods=['POST'])
def upload_question():
    data = request.get_json()

    question = data.get('question')
    q_type = data.get('type')
    options = data.get('options', '')
    correct_ans = data.get('correct_ans')
    topic_id = data.get('topic_id')
    uploaded_by = data.get('uploaded_by')

    if not all([question, q_type, correct_ans, topic_id, uploaded_by]):
        return jsonify({"message": "Missing required fields"}), 400

    cursor = mysql.connection.cursor()
    query = """
        INSERT INTO questions (question, type, options, correct_ans, topic_id, uploaded_by)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (question, q_type, options, correct_ans, topic_id, uploaded_by))
    mysql.connection.commit()
    new_id = cursor.lastrowid
    cursor.close()

    return jsonify({"message": "Question uploaded successfully", "question_id": new_id}), 201

# ============================ Upload Question V2 ============================

@app.route('/api/questions/upload', methods=['POST'])
def upload_question_v2():
    data = request.get_json()

    class_name = data.get('className')
    subject = data.get('subject')
    topic = data.get('topic')
    q_type = data.get('type')
    question = data.get('question')
    options = data.get('options', [])
    correct_answer = data.get('correctAnswer')
    uploaded_by = data.get('uploaded_by')

    if not all([class_name, subject, topic, q_type, question, correct_answer]):
        return jsonify({"message": "Missing required fields"}), 400

    option1 = options[0] if len(options) > 0 else None
    option2 = options[1] if len(options) > 1 else None
    option3 = options[2] if len(options) > 2 else None
    option4 = options[3] if len(options) > 3 else None

    cursor = mysql.connection.cursor()
    query = """
        INSERT INTO questions (class_name, subject, topic, type, question, option1, option2, option3, option4, correct_answer, uploaded_by)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        class_name, subject, topic, q_type, question,
        option1, option2, option3, option4, correct_answer,
        uploaded_by
    ))
    mysql.connection.commit()
    question_id = cursor.lastrowid
    cursor.close()

    return jsonify({"message": "Question uploaded successfully", "question_id": question_id}), 201

# ============================ Get Uploaded Questions by Teacher ============================

@app.route('/questions/uploaded-by/<int:teacher_id>', methods=['GET'])
def get_uploaded_questions(teacher_id):
    try:
        cursor = mysql.connection.cursor()
        query = """
            SELECT id, question, type, options, correct_answer, topic 
            FROM questions 
            WHERE uploaded_by = %s
        """
        cursor.execute(query, (teacher_id,))
        questions = cursor.fetchall()
        cursor.close()

        import json

        result = []
        for q in questions:
            # If 'options' column is JSON string, parse it; else fallback to []
            try:
                parsed_options = json.loads(q[3]) if q[3] else []
            except:
                parsed_options = []
                
            result.append({
                "id": q[0],
                "question": q[1],
                "type": q[2],
                "options": parsed_options,
                "correct_answer": q[4],
                "topic": q[5]
            })

        return jsonify(result), 200
    except Exception as e:
        print("Error in get_uploaded_questions():", e)
        return jsonify({"error": str(e)}), 500

# ============================ Get Student Performance ============================

@app.route('/performance/summary', methods=['GET'])
def get_performance_summary():
    cursor = mysql.connection.cursor()
    query = """
        SELECT student_id, subject_name, topic_name, accuracy, time_spent 
        FROM performance_summary
    """
    cursor.execute(query)
    performance = cursor.fetchall()
    cursor.close()

    result = []
    for p in performance:
        result.append({
            "student_id": p[0],
            "subject_name": p[1],
            "topic_name": p[2],
            "accuracy": float(p[3]),
            "time_spent": p[4]
        })
    return jsonify(result), 200

# ============================ Error Handlers ============================

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(Exception)
def unhandled_exception(e):
    return jsonify({'error': str(e)}), 500


# ============================ Run App ============================

if __name__ == "__main__":
    app.run(debug=True, port=8000)
