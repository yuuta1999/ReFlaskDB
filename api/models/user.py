from flask_login import UserMixin
import bcrypt
import jwt
import datetime
import os

from api import login, mongo

class User(UserMixin):
	"""
		User object for Flask-Login
	"""
	def __init__(self, *args, **kwargs):
		self.args = args
		self.kwargs = kwargs

	@property
	def is_authenticated(self):
		return True

	@property
	def is_active(self):
		return True

	@property
	def is_anonymous(self):
		return False

	def __repr__(self):
		return "User({}, {})".format(self.kwargs['username'], type(self.kwargs['username']))

	@staticmethod
	def validate_login(password, hashed):
		return bcrypt.hashpw(password.encode('utf-8'), hashed) == hashed

	@staticmethod
	def decode_auth_token(token):
		"""
			Decode token when received
			:param token 
			:return str
		"""
		try:
			payload = jwt.decode(token, 'flask-app')
			print(payload)
			# should return subject
			return payload['sub']
		except jwt.ExpiredSignatureError:
			return 'Signature expired. Please login again.'
		except jwt.InvalidTokenError:
			return 'Invalid token. Please login again.'

	def encode_auth_token(self, **kwargs):
		"""
			Generate token
			:return str
		"""
		try:
			payload = {
				# Expired time
				'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
				# Register token time
				'iat': datetime.datetime.utcnow(),
				# subject
				'sub': kwargs['username']
			}
			return jwt.encode(
				payload,
				'flask-app',	
				algorithm='HS256'
			)
		except Exception as e:
			return e


@login.user_loader
def load_user(username):
	"""
		Load user for Flask-Login extension
		:return Obj
	"""
	u = mongo.db.users.find_one({'username': username})
	if not u:
		return None
	return User(u['username'], u['password'])

	