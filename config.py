"""File to setup mongodb and other infrastructure"""
import os
import secrets
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
load_dotenv()


class MongoConfig:
    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    DB_NAME = os.getenv("DB_NAME")

    @staticmethod
    def get_client():
        return MongoClient(MongoConfig.CONNECTION_STRING, server_api=ServerApi('1'))

    @staticmethod
    def get_database():
        client = MongoConfig.get_client()
        return client[MongoConfig.DB_NAME]

#config for jwtsecrets 
class AccessConfig:
    SECRET_KEY = secrets.token_hex(32)


class CombinedConfig(MongoConfig, AccessConfig):
    pass
# prbably create a redis server also
