from flask import Flask
from config import Config
from extensions import db, jwt, migrate
from flask_cors import CORS

from routes import auth_bp
from routes_tasks import tasks_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app,
         resources={r"/*": {"origins": "*"}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")

    with app.app_context():
        from models import User, Task
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
