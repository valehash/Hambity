#!/usr/bin/env python3
"""script to house all the user functionality without authentication"""
from flask import Blueprint, request, jsonify, current_app
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from bson.json_util import dumps
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

# This will be initialized in the main app
user_routes = Blueprint('user_routes', __name__)
mongo = None

def init_user_routes(app, mongo_instance):
    global mongo
    mongo = mongo_instance

@user_routes.route("/register", methods=["POST"])
def register():
    users = mongo.db.users
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")

    if not username or not password or not email:
        return jsonify({"msg": "Missing username, password, or email"}), 400

    if users.find_one({"username": username}):
        return jsonify({"msg": "Username already exists"}), 400

    user_id = users.insert_one({
        "username": username,
        "password": generate_password_hash(password),
        "email": email
    }).inserted_id

    return jsonify({"msg": "User created successfully", "id": str(user_id)}), 201

@user_routes.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    user = mongo.db.users.find_one({"username": username})
    
    if user and check_password_hash(user["password"], password):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({
            "msg": "Login successful", 
            "id": str(user["_id"]), 
            "token": str(access_token)
        }), 200

    return jsonify({"msg": "Invalid username or password"}), 401

@user_routes.route("/users", methods=["GET"])
def get_users():
    users = mongo.db.users.find({}, {"password": 0})  # Exclude password field
    return dumps(users), 200

@user_routes.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    if user:
        return dumps(user), 200
    return jsonify({"msg": "User not found"}), 404

@user_routes.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    update_data = request.json
    if "password" in update_data:
        update_data["password"] = generate_password_hash(update_data["password"])

    result = mongo.db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    if result.modified_count:
        return jsonify({"msg": "User updated successfully"}), 200
    return jsonify({"msg": "User not found or no changes made"}), 404

@user_routes.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count:
        return jsonify({"msg": "User deleted successfully"}), 200
    return jsonify({"msg": "User not found"}), 404
