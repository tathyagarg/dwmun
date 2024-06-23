import os

import bcrypt
import dotenv

dotenv.load_dotenv()

def encrypt(text: str) -> bytes:
    base = text.encode('utf-8')
    salt = os.getenv('SALT').encode('utf-8')

    hashed = bcrypt.hashpw(base, salt)

    return hashed

