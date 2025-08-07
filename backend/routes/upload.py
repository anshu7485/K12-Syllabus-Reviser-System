from flask import Blueprint, request, jsonify
import mysql.connector
import json

upload_bp = Blueprint("upload", __name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="test@123#@",
        database="k12_reviser"
    )

@upload_bp.route("/upload", methods=["POST"])
def upload_question():
    data = request.get_json()
    required_fields = ["className", "subject", "topic", "type", "question", "correctAnswer", "uploaded_by"]

    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing or empty required fields"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO questions (class_name, subject, topic, type, question, options, correct_answer, uploaded_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                data["className"],
                data["subject"],
                data["topic"],
                data["type"],
                data["question"],
                json.dumps(data.get("options", [])),
                data["correctAnswer"],
                data["uploaded_by"]
            )
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Question uploaded successfully!"}), 201

    except Exception as e:
        print("Upload Error:", e)  # <-- Add this line to print error in console
        return jsonify({"error": f"Database error occurred: {str(e)}"}), 500
