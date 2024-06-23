import mysql.connector
from .models import SingleDelegateRegistrationData
import dotenv
import os
import base64
from .encryption import encrypt

dotenv.load_dotenv()

STATUS = tuple[int, str]
DB_CONFIG: dict[str, str] = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'database': os.getenv('DB_DATABASE'),
    'password': os.getenv('DB_PASSWORD')
}

db = mysql.connector.connect(**DB_CONFIG)

cursor = db.cursor(buffered=True)


def post_commit(func):
    def inner(*args, **kwargs):
        res = func(*args, **kwargs)
        db.commit()

        return res

    return inner


def run_sql(sql: str, params: tuple[str, ...] = None) -> None:
    params = params or ()
    cursor.execute(sql, params)


@post_commit
def drop_tables() -> STATUS:
    try:
        cursor.execute('''DROP TABLE delegates''')
        cursor.execute('''DROP TABLE delegations''')
    except Exception as e:
        return 1, str(e)
    else:
        return 0, ""


@post_commit
def create_tables() -> STATUS:
    try:
        cursor.execute('''CREATE TABLE IF NOT EXISTS delegations (
            id INT AUTO_INCREMENT,
            PRIMARY KEY (id)
        )''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS delegates (
            id INT AUTO_INCREMENT,
            delegation_id INT,
            is_head BOOL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(320) NOT NULL,
            phone_number CHAR(10) NOT NULL,
            school VARCHAR(255) NOT NULL,
            grade SMALLINT NOT NULL,
            primary_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC') NOT NULL,
            primary_country VARCHAR(255) NOT NULL,
            primary_country_2 VARCHAR(255) NOT NULL,
            secondary_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC') NOT NULL,
            secondary_country VARCHAR(255) NOT NULL,
            secondary_country_2 VARCHAR(255) NOT NULL,
            prior_experience VARCHAR(500),
            payment LONGBLOB NOT NULL,
            filetype VARCHAR(4),
            assigned_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC'),
            assigned_country VARCHAR(255),
            email_sent BOOL DEFAULT FALSE,
            PRIMARY KEY (id),
            FOREIGN KEY (delegation_id)
                REFERENCES delegations(id)
        );''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS admin (
            name VARCHAR(255) NOT NULL,
            password BINARY(60) NOT NULL
        );''')
    except Exception as e:
        return 1, str(e)
    else:
        return 0, ''


@post_commit
def register_individual(data: SingleDelegateRegistrationData, file_data: str, filetype: str) -> STATUS:
    try:
        delegate_data = (
            data.name,
            data.email,
            data.phone_number,
            data.school,
            data.grade,
            data.primary_comm,
            data.primary_country,
            data.primary_country_2,
            data.secondary_comm,
            data.secondary_country,
            data.secondary_country_2,
            data.prior_experience,
            file_data,
            filetype
        )

        cursor.execute('''INSERT INTO delegates (
            name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''', delegate_data)
    except Exception as e:
        return 1, str(e)
    else:
        return 0, ''


@post_commit
def register_delegation(delegates: list[SingleDelegateRegistrationData], file_data: str, filetype: str) -> STATUS:
    try:
        head_del, other = delegates[0], delegates[1:]

        delegate_data = (
            head_del.name,
            head_del.email,
            head_del.phone_number,
            head_del.school,
            head_del.grade,
            head_del.primary_comm,
            head_del.primary_country,
            head_del.primary_country_2,
            head_del.secondary_comm,
            head_del.secondary_country,
            head_del.secondary_country_2,
            head_del.prior_experience,
            file_data,
            filetype
        )

        # Register the delegation
        cursor.execute('''INSERT INTO delegations () VALUES ()''')
        delegation_id = cursor.lastrowid

        # Register the head del
        cursor.execute('''INSERT INTO delegates (
            name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype, is_head, delegation_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE, %s)''', (*delegate_data, delegation_id))

        # Register other dels
        for delegate in other:
            delegate_data = (
                delegate.name,
                delegate.email,
                delegate.phone_number,
                delegate.school,
                delegate.grade,
                delegate.primary_comm,
                delegate.primary_country,
                delegate.primary_country_2,
                delegate.secondary_comm,
                delegate.secondary_country,
                delegate.secondary_country_2,
                delegate.prior_experience,
                '---REFER TO HEAD DELEGATE---',
                filetype
            )

            cursor.execute('''INSERT INTO delegates (
                name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                    secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype, is_head, delegation_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, FALSE, %s)''', (*delegate_data, delegation_id))
    except Exception as e:
        return 1, str(e)
    else:
        return 0, ''


def fetch_all_delegates(condition: str = ''):
    cursor.execute(f'SELECT * FROM delegates ' + condition)
    data = cursor.fetchall()

    result = []

    for item in data:
        curr = []
        for i, piece in enumerate(item):
            if i == 15:
                curr.append(decode_file(piece, item[i+1]))
            else:
                curr.append(piece)

        result.append(curr)

    return result


def decode_file(file_data, filetype):
    encoded = base64.b64encode(file_data).decode('utf-8')
    return f'data:image/{filetype};base64,{encoded}'


def fetch_admin_data() -> tuple[str, bytes]:
    cursor.execute('SELECT name, password FROM admin')

    return cursor.fetchone()


def check_delegate_is_registered(email_id: str) -> bool:
    cursor.execute('''SELECT * FROM delegates WHERE email=%s''', (email_id,))
    res = cursor.fetchone()
    return bool(res)


def fetch_delegate_field(field: str, email: str) -> tuple[str | int | bool, ...]:
    cursor.execute(f"SELECT {field} FROM delegates WHERE email=%s", (email,))
    data = cursor.fetchone()

    return data

def fetch_delegates_field(field: str, condition: str) -> list[tuple[str | int | bool, ...]]:
    cursor.execute(f"SELECT {field} FROM delegates WHERE {condition}")
    data = cursor.fetchall()

    return data
