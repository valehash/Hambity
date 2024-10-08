# Creting the flask app
from flask import Flask
from flask_mongo import PyMongo
from flask_jwt_extended import JWTManager
import os
from config import Config, MongoConfig
app = Flask(__name__)

app.config.from_object(Config)

db = MongoConfig.get_database()

if __name__ == __"main"__:
	app.run(Debug=True)
