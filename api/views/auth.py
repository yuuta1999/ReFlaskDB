from flask.views import MethodView
from flask import make_response, jsonify, request
import bcrypt
import re

from api import mongo
from api.models.user import User

"""
	Handle REST and HTTP methods
	Make sure you use correct status code
"""

class RegisterAPI(MethodView):
	"""
		User Register
		:return response, status code
	"""
	def post(self):
		"""
			Register '/register' route
			should receive only POST.
		"""
		data = request.get_json()
		print(data)

		# check if user exists
		user = mongo.db.users.find_one({'username': data['username']})
		if not user:
			try:
				# mapping data json to object
				userObj = User(
					lastname=data['lastname'],
					firstname=data['firstname'],
					username=data['username'],
					password=bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()),
					email=data['email'],
					phone=data['phone']
				)

				mongo.db.users.insert_one(userObj.kwargs)
				# generate token
				responseObj = {
					'ok': True,
					'status': 'success',
				}

				return make_response(jsonify(responseObj)), 200

			except Exception as e:
				responseObj = {
					'ok': False,
					'status': 'failed',
					'message': 'Some thing went wrong: {}'.format(e)
				}

				return make_response(jsonify(responseObj)), 401

		else:
			responseObj = {
				'ok': False,
				'status': 'accepted',
				'message': 'Username already exists'
			}

			return make_response(jsonify(responseObj)), 202

class LoginAPI(MethodView):
	"""
		User Login
		:return response, status code
	"""
	def post(self):
		"""
			Login '/login' route
			should receive only POST.
		"""
		data = request.get_json()
		print(data)

		user = mongo.db.users.find_one({'username': data['username']})
		if user and User.validate_login(data['password'], user['password']):
			try:
				# load user
				userObj = User(
					username=user['username'],
					password=user['password']
				)

				# generate token
				token = userObj.encode_auth_token(**userObj.kwargs)
				responseObj = {
					'ok': userObj.is_authenticated,
					'status': 'success',
					'token': token.decode()
				}

				return make_response(jsonify(responseObj)), 200

			except Exception as e:
				# something happens
				responseObj = {
					'ok': False,
					'status': 'failed',
					'message': 'Something went wrong: {}'.format(e)
				}

				return make_response(jsonify(responseObj)), 500

		else:
			responseObj = {
				'ok': False,
				'status': 'failed',
				'message': 'Username or password is incorrect.'
			}

			return make_response(jsonify(responseObj)), 202

class ValidToken(MethodView):
	"""
		Validate token from request
		:return boolean, status code.
	"""
	def post(self):
		data = request.get_json()
		token = data['token']

		if token:
			res = User.decode_auth_token(token)
			# decode_auth_token only returns
			# str if token is incorrect.
			if isinstance(res, str):
				user = mongo.db.users.find_one({'username': res})
				userObj = User(
					username=user['username'],
					password=user['password']
				)

				responseObj = {
					'status': 'success',
					'data': {
						'username': userObj.kwargs['username'],
						'isAuthenticated': userObj.is_authenticated
					},
					'message': 'Decoded token successfully!'
				}

				return make_response(jsonify(responseObj)), 200

			else:
				responseObj = {
					'status': 'failed',
					'message': 'Something went wrong: {}'.format(res)
				}

				return make_response(jsonify(responseObj)), 401

		else:
			responseObj = {
				'status': 'failed',
				'message': 'Token is invalid'.format(res)
			}

			return make_response(jsonify(responseObj)), 401

class ValidateUser(MethodView):
	"""
		Check username or email if existed.
		:note --> This API has one duty and
		only one which is mentioned above.
		If you want to handle validation,
		modify in front-end
		:return user
	"""
	def get(self, user):
		# email regex pattern
		emailReg = r'^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$'

		# validate email with pattern
		if re.match(emailReg, user):
			# if this is an email
			u = mongo.db.users.find_one({'email': user})
		else:
			# if not
			u = mongo.db.users.find_one({'username': user})


		try:
			# load user
			if u is not None:
				responseObj = {
					'ok': False,
					'status': 'existed',
					'message': 'Already existed'
				}

			else:
				responseObj = {
					'ok': True,
					'status': 'valid',
					'message': 'Can create'
				}

			print(responseObj)
			return jsonify(responseObj)

		except Exception as e:
			responseObj = {
				'ok': False,
				'status': 'failed',
				'message': 'Something happened: {}'.format(e)
			}
			return make_response(jsonify(responseObj))
