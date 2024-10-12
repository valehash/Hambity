# Creting the flask app
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
import os
from config import MongoConfig
from cluster import cluster_routes, init_cluster

app = Flask(__name__)

app.config.from_object(MongoConfig)

db = MongoConfig.get_database()

collections_to_create = ["TestCollection", "UserCollection", "ClusterCollection"]

for collection in collections_to_create:
    if collection not in db.list_collection_names():
        try:
            db.create_collection(collection)
            print(f"Created collection: {collection}")
        except errors.CollectionInvalid:
            print(f"Failed to create collection: {collection}")
    else:
        print(f"Collection {collection} already exists.")


#Cluster code
init_cluster(app, db)
app.register_blueprint(cluster_routes)

if __name__ == "__main__":
	app.run(debug=True)
