# cluster.py
from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from bson.json_util import dumps

cluster_routes = Blueprint('cluster_routes', __name__)

# This will be initialized in the main app
mongo = None

def init_cluster(app, mongo_instance):
    global mongo
    mongo = mongo_instance
#find all clusters around
@cluster_routes.route("/clusters", methods=["GET"])
@jwt_required()
def get_clusters():
    clusters = mongo.db.clusters.find()
    return dumps(clusters), 200

# create a cluster clusters
@cluster_routes.route("/clusters", methods=["POST"])
@jwt_required()
def create_cluster():
    cluster = request.json
    cluster["creator"] = get_jwt_identity()
    cluster["members"] = [get_jwt_identity()]  # Creator is automatically a member
    cluster_id = mongo.db.clusters.insert_one(cluster).inserted_id
    return jsonify({"msg": "Cluster created successfully", "id": str(cluster_id)}), 201

@cluster_routes.route("/clusters/<cluster_id>", methods=["GET"])
@jwt_required()
def get_cluster(cluster_id):
    cluster = mongo.db.clusters.find_one({"_id": ObjectId(cluster_id)})
    if cluster:
        return dumps(cluster), 200
    return jsonify({"msg": "Cluster not found"}), 404

@cluster_routes.route("/clusters/<cluster_id>", methods=["PUT"])
@jwt_required()
def update_cluster(cluster_id):
    user_id = get_jwt_identity()
    cluster = mongo.db.clusters.find_one({"_id": ObjectId(cluster_id)})
    
    if not cluster:
        return jsonify({"msg": "Cluster not found"}), 404
    
    if cluster["creator"] != user_id:
        return jsonify({"msg": "Unauthorized"}), 403

    update_data = request.json
    result = mongo.db.clusters.update_one(
        {"_id": ObjectId(cluster_id)},
        {"$set": update_data}
    )

    if result.modified_count:
        return jsonify({"msg": "Cluster updated successfully"}), 200
    return jsonify({"msg": "No changes made"}), 200

#let the cluster creator or admin delte a cluster
@cluster_routes.route("/clusters/<cluster_id>", methods=["DELETE"])
@jwt_required()
def delete_cluster(cluster_id):
    user_id = get_jwt_identity()
    cluster = mongo.db.clusters.find_one({"_id": ObjectId(cluster_id)})
    
    if not cluster:
        return jsonify({"msg": "Cluster not found"}), 404
    
    if cluster["creator"] != user_id:
        return jsonify({"msg": "Unauthorized"}), 403

    result = mongo.db.clusters.delete_one({"_id": ObjectId(cluster_id)})
    if result.deleted_count:
        return jsonify({"msg": "Cluster deleted successfully"}), 200
    return jsonify({"msg": "Cluster not found"}), 404

#join a cluster
@cluster_routes.route("/clusters/<cluster_id>/join", methods=["POST"])
@jwt_required()
def join_cluster(cluster_id):
    user_id = get_jwt_identity()
    result = mongo.db.clusters.update_one(
        {"_id": ObjectId(cluster_id)},
        {"$addToSet": {"members": user_id}}
    )
    if result.modified_count:
        return jsonify({"msg": "Successfully joined the cluster"}), 200
    return jsonify({"msg": "Failed to join the cluster"}), 400

#route to remove a user from acluster
@cluster_routes.route("/clusters/<cluster_id>/leave", methods=["POST"])
@jwt_required()
def leave_cluster(cluster_id):
    user_id = get_jwt_identity()
    result = mongo.db.clusters.update_one(
        {"_id": ObjectId(cluster_id)},
        {"$pull": {"members": user_id}}
    )
    if result.modified_count:
        return jsonify({"msg": "Successfully left the cluster"}), 200
    return jsonify({"msg": "Failed to leave the cluster"}), 400
