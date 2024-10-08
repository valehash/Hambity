"""File to define the user class and its properties"""
#!/usr/bin/env python3
import BaseModel from basemodel
from utils/db import get_database

class BaseModel


class User(BaseModel):
    def __init__(self,  name, email):
        self.name = name
        self.email = email
