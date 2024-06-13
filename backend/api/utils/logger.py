import os
import time
import dotenv
import datetime
from enum import Enum

class LogType(Enum):
    INFO = 0
    WARN = 1
    CRIT = 2
    NOOP = 3


dotenv.load_dotenv()

def log(log_type: LogType, message: str):
    timestamp = time.time()

    with open(os.getenv('LOG_FILE'), 'a') as f:
        f.write(f"[{log_type}] [{timestamp}] [{datetime.datetime.fromtimestamp(timestamp)}] {message}\n")

