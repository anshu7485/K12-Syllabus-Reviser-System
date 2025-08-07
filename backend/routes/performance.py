from flask import Blueprint, jsonify
import json
import os

performance_bp = Blueprint('performance', __name__)

@performance_bp.route('/all-progress', methods=['GET'])
def all_student_progress():
    try:
        file_path = 'progress.txt'  # Make sure this file exists in your backend root directory
        if not os.path.exists(file_path):
            return jsonify([])

        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
