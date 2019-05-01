from flask import Flask
from flask_pymongo import PyMongo
from flask_login import LoginManager

from config import Config
from api.utils import JSONEncoder

mongo = PyMongo()
login = LoginManager()

def create_app(config=Config):
    """
        Create Flask app.
        Everything goes under this function
        
        : return app
    """
    app = Flask(__name__)
    app.config.from_object(config)

    # init extensions below
    mongo.init_app(app)
    login.init_app(app)

    # blueprint
    from api.views import auth_bp as auth
    app.register_blueprint(auth, url_prefix='/api')

    # for jsonify
    app.json_encoder = JSONEncoder

    return app