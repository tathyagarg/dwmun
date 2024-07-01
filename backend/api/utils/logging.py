import enum
import datetime

class LogLevel(enum.Enum):
    EMERGENCY = 0
    ALERT = 1
    CRITICAL = 2
    ERROR = 3
    WARNING = 4
    NOTICE = 5
    INFO = 6
    DEBUG = 7

def log(log_level: LogLevel, message: str, caller: str = None) -> None:
    with open('logs/main.log', 'a') as f:
        f.write(
            f'[{datetime.datetime.now()}] {log_level.name}\n\tCaller: {caller!r}\n\tMessage: {message!r}\n'
        )

