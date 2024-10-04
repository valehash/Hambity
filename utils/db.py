"""Where the db schmea would most likely be defined"""
import os

from pymongo import MongoClient
from dotenv import load_dotenv,dotenv_values
from pymongo.server_api import ServerApi
load_dotenv()


def get_database():
	client = MongoClient(os.getenv("CONNECTION_STRING"), server_api=ServerApi('1'))
	try:
		client.admin.command('ping')
		print("Pinged your deployment. You successfully connected to MongoDB!")
	except Exception as e:
		print(e)

	return client["Hambity_db"]# creates the database)

if __name__ == "__main__":
	db_name = get_database()
