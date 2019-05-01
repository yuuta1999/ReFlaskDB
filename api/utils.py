import os
import json
import datetime
from bson.objectid import ObjectId

class JSONEncoder(json.JSONEncoder):
	"""
		Extend json-encoder for flask
		help Flask can read jsonify
	"""
	def default(self, o):
		if isinstance(o, ObjectId):
			return str(o)
		if isinstance(o, datetime.datetime):
			return str(o)
		return json.JSONEncoder.default(self, o)
		