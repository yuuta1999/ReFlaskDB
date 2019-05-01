import os

"""
	Configuration file for the app.
	For Docker: use os.environ.get()
	For local: use anything possible.
"""

class Config(object):
	ENV = os.environ.get('FLASK_ENV') or 'flask-react-dev'
	DEBUG = ENV == 'flask-react-dev'
	SECRET_KEY = os.environ.get('SECRET_KEY') or 'flask-app'
	PORT = int(os.environ.get('PORT')) if os.environ.get('PORT') else 5000
	TESTING = False
	MONGO_DBNAME = 'flask_mongo_app'
	MONGO_URI = os.environ.get('DB') or 'mongodb://yuuta1999:Hieu123456@ds151614.mlab.com:51614/flask_mongo_app'