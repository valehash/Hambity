#!/usr/bin/env python3
from flask import Blueprints, requests, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from bson.json_util import dumps
from datetime import datetime
import gridfs

chat_route = Blueprints('chat_route', __name__)
mongo = None

def init_chat(app, mongo_instance):
    global mongo 
    mongo = mongo_instance

@chat_route.route('/send_message', method=["POST"])
