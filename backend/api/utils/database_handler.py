import mysql.connector
from .models import DelegateRegistrationData
from logger import log, LogType
import traceback
import dotenv
import os

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


def run_sql(sql: str) -> None:
    cursor.execute(sql)


def create_tables() -> STATUS:
    log(LogType.INFO, 'Making Databases')
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
            primary_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Board Room', 'UNHRC', 'UNSC') NOT NULL,
            primary_country VARCHAR(255) NOT NULL,
            secondary_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Board Room', 'UNHRC', 'UNSC') NOT NULL,
            secondary_country VARCHAR(255) NOT NULL,
            prior_experience VARCHAR(500),
            payment LONGBLOB NOT NULL,
            filetype VARCHAR(4),
            assigned_comm ENUM('CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Board Room', 'UNHRC', 'UNSC'),
            assigned_country VARCHAR(255),
            email_sent BOOL,
            PRIMARY KEY (id),
            FOREIGN KEY (delegation_id)
                REFERENCES delegations(id)
        );''')

        log(LogType.INFO, 'Databases Made')
    except Exception as e:
        log(LogType.CRIT, f'Database Creation Failed:\n\t{e}')
        return 1, str(e)
    else:
        return 0, ''


def register_individual(data: DelegateRegistrationData, file_data: str, filetype: str) -> STATUS:
    try:
        delegate_data = (
            data.name,
            data.email,
            data.phone_number,
            data.school,
            data.grade,
            data.primary_comm,
            data.primary_country,
            data.secondary_comm,
            data.secondary_country,
            data.prior_experience,
            file_data,
            filetype
        )

        log(LogType.INFO, f'Registering Delegate - {data.name}')
        cursor.execute('''INSERT INTO delegates (
            name, email, phone_number, school, grade, primary_comm, primary_country,
                secondary_comm, secondary_country, prior_experience, payment, filetype
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''', delegate_data)
    except Exception as e:
        log(LogType.CRIT, f'Failed to register Delegate - {data.name}\n\t{e}')
        return 1, str(e)
    else:
        return 0, ''


def register_delegation(delegates: list[DelegateRegistrationData], file_data: str, filetype: str) -> STATUS:
    try:
        head_del, other = delegates[0], delegates[1:]

        delegate_data = (
            head_del.name,
            head_del.email,
            head_del.school,
            head_del.primary_comm,
            head_del.primary_country,
            head_del.secondary_comm,
            head_del.secondary_country,
            head_del.prior_experience,
            file_data,
            filetype
        )

        # Register the delegation
        cursor.execute('''INSERT INTO delegations () VALUES ()''')
        delegation_id = cursor.lastrowid()

        # Register the head del
        log(LogType.INFO, f'Registering Head Delegate - {head_del.name}')
        cursor.execute('''INSERT INTO delegates (
            name, email, phone_number, school, grade, primary_comm, primary_country,
                secondary_comm, secondary_country, prior_experience, payment, filetype, is_head, delegation_id
        ) VALUES (%s, %s, %s, %s, %d, %s, %s, %s, %s, %s, TRUE, %d)''', (*delegate_data, delegation_id))

        # Register other dels
        for delegate in other:
            delegate_data = (
                delegate.name,
                delegate.email,
                delegate.school,
                delegate.primary_comm,
                delegate.primary_country,
                delegate.secondary_comm,
                delegate.secondary_country,
                delegate.prior_experience,
                '--REFER TO HEAD DEL--',
                filetype
            )

            log(LogType.INFO, f'Registering Delegate - {delegate.name}')
            cursor.execute('''INSERT INTO delegates (
                name, email, phone_number, school, grade, primary_comm, primary_country,
                    secondary_comm, secondary_country, prior_experience, payment, filetype, is_head, delegation_id
            ) VALUES (%s, %s, %s, %s, %d, %s, %s, %s, %s, FALSE, %s, %d)''', (*delegate_data, delegation_id))

    except Exception as e:
        try:
            log(LogType.CRIT, f'Failed to register Delegate in a delegation: - {delegate.name}')
        except NameError:
            log(LogType.CRIT, f'Failed to register Head Delegate in a delegation: - {head_del.name}')
        return 1, str(e)
    else:
        return 0, ''


def fetch_all_delegates(condition: str = ''):
    cursor.execute('SELECT name FROM delegates ' + condition)
    return cursor.fetchall()


def check_delegate_is_registered(email_id: str) -> bool:
    cursor.execute('''SELECT * FROM delegates WHERE email=%s''', (email_id,))

    return bool(cursor.fetchone())
