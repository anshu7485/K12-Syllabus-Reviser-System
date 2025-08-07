from flask import Blueprint, request, jsonify, current_app

subject_bp = Blueprint('subject_bp', __name__)

@subject_bp.route('/subjects', methods=['POST'])
def add_subject():
    data = request.get_json()
    name = data.get('name')
    class_name = data.get('class_name')

    if not name or not class_name:
        return jsonify({'error': 'Missing subject name or class name'}), 400

    try:
        cursor = current_app.mysql.connection.cursor()
        query = "INSERT INTO subjects (name, class_name) VALUES (%s, %s)"
        cursor.execute(query, (name.strip(), class_name.strip()))
        current_app.mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Subject added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@subject_bp.route('/subjects/<string:class_id>', methods=['GET'])
def get_subjects(class_id):
    try:
        cursor = current_app.mysql.connection.cursor()
        query = "SELECT * FROM subjects WHERE class_name = %s"
        cursor.execute(query, (class_id,))
        results = cursor.fetchall()
        cursor.close()

        subjects = []
        for row in results:
            subjects.append({
                'id': row[0],
                'name': row[1],
                'class_name': row[2]
            })

        return jsonify(subjects)

    except Exception as e:
        print("Error fetching subjects:", e)
        return jsonify({'error': 'Internal server error'}), 500
