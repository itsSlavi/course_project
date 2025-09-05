from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Task

tasks_bp = Blueprint("tasks", __name__)

# 🔹 Създаване на нова задача
@tasks_bp.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")

    if not title:
        return jsonify({"message": "Заглавието е задължително"}), 400

    new_task = Task(
        title=title,
        description=description,
        completed=False,
        user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Задачата е създадена успешно"}), 201


# 🔹 Взимане на всички задачи за текущия потребител
@tasks_bp.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed,
            "created_at": task.created_at
        }
        for task in tasks
    ]), 200


# 🔹 Взимане на конкретна задача
@tasks_bp.route("/tasks/<task_id>", methods=["GET"])
@jwt_required()
def get_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Задачата не е намерена"}), 404

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "created_at": task.created_at
    }), 200


# 🔹 Обновяване на задача
@tasks_bp.route("/tasks/<task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Задачата не е намерена"}), 404

    data = request.get_json()
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.completed = data.get("completed", task.completed)

    db.session.commit()
    return jsonify({"message": "Задачата е обновена успешно"}), 200


# 🔹 Изтриване на задача
@tasks_bp.route("/tasks/<task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Задачата не е намерена"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Задачата е изтрита успешно"}), 200
