import uuid
from extensions import db

# 🔹 User модел
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(256), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # 🔹 връзка с Task
    tasks = db.relationship("Task", backref="user", lazy=True, cascade="all, delete-orphan")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f"<User {self.username}>"


# 🔹 Task модел
class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.String(256), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False)   # 🟢 вече има completed
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # 🔹 връзка с User
    user_id = db.Column(db.String(256), db.ForeignKey("users.id"), nullable=False)

    def __init__(self, title, description, user_id, completed=False):
        self.title = title
        self.description = description
        self.user_id = user_id
        self.completed = completed

    def __repr__(self):
        return f"<Task {self.title}>"
