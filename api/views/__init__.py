from flask import Blueprint
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__)

# handle CORS error
CORS(auth_bp)

from api.views.auth import LoginAPI, RegisterAPI, ValidToken, ValidateUser

login_view = LoginAPI.as_view('login_view')
auth_bp.add_url_rule(
	'/login',
	view_func=login_view,
	methods=['POST']
)

register_view = RegisterAPI.as_view('register_view')
auth_bp.add_url_rule(
	'/register',
	view_func=register_view,
	methods=['POST']
)

valid_user = ValidateUser.as_view('valid_user')
auth_bp.add_url_rule(
	'/users/<user>',
	view_func=valid_user,
	methods=['GET']
)

valid_token = ValidToken.as_view('valid_token')
auth_bp.add_url_rule(
	'/token',
	view_func=valid_token,
	methods=['POST']
)
