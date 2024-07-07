import os
import base64
import dotenv
import traceback
from .logging import *
import mysql.connector
from PIL import Image
from io import BytesIO
from .models import SingleDelegateRegistrationData

dotenv.load_dotenv(override=True)

STATUS = tuple[int, str]
DB_CONFIG: dict[str, str] = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'database': os.getenv('DB_DATABASE'),
    'password': os.getenv('DB_PASSWORD'),
    'port': os.getenv('DB_PORT')
}

ADMIN_USERNAME = os.getenv('ADMIN_USER')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')


def error_catch(func):
    def inner(*args, **kwargs):
        try:
            res = func(*args, **kwargs)
            if res[0] == 1:
                log(
                    LogLevel.ERROR,
                    f'Encountered error during execution of {func}\n\tException\n\t\t{traceback.format_exc()}',
                    f'error_catch/{func}'
                )

                return 1, 'There seems to have been an issue on our side. Not to worry, your registration has been recorded. Please contact us at mundpsw@gmail.com so we can look into this issue.'
        except Exception:
            log(
                LogLevel.ERROR,
                f'Encountered error during execution of {func}\n\tException\n\t\t{traceback.format_exc()}',
                f'error_catch/{func}'
            )

            return 1, 'There seems to have been an issue on our side. Not to worry, your registration has been recorded. Please contact us at mundpsw@gmail.com so we can look into this issue.'
        else:
            return res

    return inner

def run_sql(sql: str, params: tuple[str, ...] = None) -> None:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            params = params or ()
            cursor.execute(sql, params)
            try:
                res = cursor.fetchall()
            except TypeError:
                log(LogLevel.INFO, f'SQL Query (Non-fetch) ran:\n\tQuery: {sql!r}\n\tParams: {params}', 'utils.database_handler.run_sql')
                db.commit()
                return
            else:
                log(LogLevel.INFO, f'SQL Query (Fetch) ran:\n\tQuery: {sql!r}\n\tParams: {params}\n\tData: {res!r}', 'utils.database_handler.run_sql')
                return res


@error_catch
def drop_tables() -> STATUS:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            try:
                cursor.execute('''DROP TABLE delegates''')
                log(LogLevel.ALERT, 'Table dropped: delegates', 'utils.database_handler.drop_tables')
                cursor.execute('''DROP TABLE delegations''')
                log(LogLevel.ALERT, 'Table dropped: delegations', 'utils.database_handler.drop_tables')

                db.commit()
            except Exception:
                exc = traceback.format_exc()

                log(LogLevel.ERROR, f'Error encountered in dropping a table:\n\tException: {exc}', 'utils.database_handler.drop_tables')
                return 1, exc
            else:
                log(LogLevel.INFO, f'Successfully dropped tables \'delegates\' and \'delegations\'', 'utils.database_handler.drop_tables')

                return 0, ""


@error_catch
def create_tables() -> STATUS:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            try:
                log(
                    LogLevel.INFO,
                    'Creating table: \'delegations\'',
                    'utils.database_handler.create_tables'
                )
                cursor.execute('''CREATE TABLE IF NOT EXISTS delegations (
                    id INT AUTO_INCREMENT,
                    PRIMARY KEY (id)
                )''')
                log(
                    LogLevel.INFO,
                    'Table \'delegations\' successfully created',
                    'utils.database_handler.create_tables'
                )

                log(
                    LogLevel.INFO,
                    'Creating table: \'delegates\'',
                    'utils.database_handler.create_tables'
                )
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
                        ON DELETE CASCADE
                        ON UPDATE CASCADE
                );''')
                log(
                    LogLevel.INFO,
                    'Table \'delegates\' successfully created',
                    'utils.database_handler.create_tables'
                )

                log(
                    LogLevel.INFO,
                    'Creating table: \'admin\'',
                    'utils.database_handler.create_tables'
                )
                cursor.execute('''CREATE TABLE IF NOT EXISTS admin (
                    admin_id INT AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    PRIMARY KEY (admin_id)
                );''')
                log(
                    LogLevel.INFO,
                    'Table \'admin\' successfully created',
                    'utils.database_handler.create_tables'
                )

                cursor.execute('SELECT * FROM admin')
                data_exists = cursor.fetchall()
                if not data_exists:
                    log(
                        LogLevel.ALERT,
                        'Admin data not found, inserting environment variables as row:\n\tName: ADMIN_USERNAME\n\tPassword: ADMIN_PASSWORD',
                        'utils.database_handler.create_tables'
                    )
                    cursor.execute('INSERT INTO admin (name, password) VALUES (%s, %s)', (ADMIN_USERNAME, ADMIN_PASSWORD))

                db.commit()
            except Exception:
                exc = traceback.format_exc()

                log(
                    LogLevel.ERROR,
                    f'Error encountered in creating tables:\n\tException: {exc}',
                    'utils.database_handler.create_tables'
                )
                return 1, exc
            else:
                log(
                    LogLevel.INFO,
                    'All tables successfully created',
                    'utils.database_handler.create_tables'
                )
                return 0, ''


@error_catch
def register_individual(data: SingleDelegateRegistrationData, file_data: bytes, filetype: str) -> STATUS:
    fname = f'{data.name}.{filetype}'
    Image.open(BytesIO(file_data)).save(fname)

    log(
        LogLevel.INFO,
        f'Precaution re-logging registration data\n\tRegistration Data: {data!r}\n\tFile Data: {fname}',
        'utils.database_handler.register_individual'
    )

    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
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

                log(
                    LogLevel.INFO,
                    f'Registering delegate with data:\n\tName: {data.name}\n\tE-Mail: {data.email}\n\tPhone Number: {data.phone_number}',
                    'utils.database_handler.register_individual'
                )

                cursor.execute('''INSERT INTO delegates (
                    name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                        secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''', delegate_data)

                db.commit()
            except Exception:
                exc = traceback.format_exc()

                log(
                    LogLevel.ERROR,
                    f'Registration failed\n\tException: {exc}',
                    'utils.database_handler.register_individual'
                )
                return 1, exc
            else:
                log(
                    LogLevel.INFO,
                    'Registration successful',
                    'utils.database_handler.register_individual'
                )
                os.remove(fname)

                return 0, ''


@error_catch
def register_delegation(delegates: list[SingleDelegateRegistrationData], file_data: str, filetype: str) -> STATUS:
    fname = f'{delegates[0].name}.{filetype}'
    Image.open(BytesIO(file_data)).save(fname)

    log(
        LogLevel.INFO,
        f'Precaution re-logging delegation registration data\n\tRegistration Data: {delegates!r}\n\tFile Data: {fname}',
        'utils.database_handler.register_delegation'
    )

    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
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
                try:
                    log(
                        LogLevel.INFO,
                        f'Creating delegation',
                        'utils.database_handler.register_delegation'
                    )
                    cursor.execute('''INSERT INTO delegations () VALUES ()''')
                    delegation_id = cursor.lastrowid
                except Exception:
                    exc = traceback.format_exc()

                    log(
                        LogLevel.ERROR,
                        f'Creating delegation failed\n\tException: {exc}',
                        'utils.database_handler.register_delegation'
                    )
                    return 1, exc


                # Register the head del
                try:
                    log(
                        LogLevel.INFO,
                        f'Registering head delegate:\n\tName: {head_del.name}\n\tE-Mail: {head_del.email}\n\tPhone Number: {head_del.phone_number}',
                        'utils.database_handler.register_delegation'
                    )
                    cursor.execute('''INSERT INTO delegates (
                        name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                            secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype, is_head, delegation_id
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE, %s)''', (*delegate_data, delegation_id))
                except Exception:
                    exc = traceback.format_exc()

                    log(
                        LogLevel.ERROR,
                        f'Registering head delegate failed:\n\tException: {exc}',
                        'utils.database_handler.register_delegation'
                    )
                    return 1, exc

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

                    try:
                        log(
                            LogLevel.INFO,
                            f'Registering delegate as part of delegation:\n\tName: {delegate.name}\n\tE-Mail: {delegate.email}\n\tPhone Number: {delegate.phone_number}',
                            'utils.database_handler.register_delegation'
                        )
                        cursor.execute('''INSERT INTO delegates (
                            name, email, phone_number, school, grade, primary_comm, primary_country, primary_country_2,
                                secondary_comm, secondary_country, secondary_country_2, prior_experience, payment, filetype, is_head, delegation_id
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, FALSE, %s)''', (*delegate_data, delegation_id))
                    except Exception:
                        exc = traceback.format_exc()

                        log(
                            LogLevel.ERROR,
                            f'Registering delegate as part of delegation failed:\n\tException: {exc}',
                            'utils.database_handler.register_delegation'
                        )
                        return 1, exc

                db.commit()
            except Exception:
                exc = traceback.format_exc()

                log(
                    LogLevel.ERROR,
                    f'Registration failed\n\tException: {exc}',
                    'utils.database_handler.register_delegation'
                )
                return 1, exc
            else:
                log(
                    LogLevel.INFO,
                    f'Delegation registered successfully',
                    'utils.database_handler.register_delegation'
                )
                os.remove(fname)

                return 0, ''


def fetch_all_delegates(condition: str = ''):
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            log(
                LogLevel.INFO,
                f'Fetching delegate information\n\tCondition: {condition}',
                'utils.database_handler.fetch_all_delegates'
            )

            cursor.execute(f'SELECT * FROM delegates ' + condition)
            data = cursor.fetchall()

            log(
                LogLevel.INFO,
                f'Fetching delegate information successful',
                'utils.database_handler.fetch_all_delegates'
            )

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


def fetch_admin_data() -> tuple[str, str]:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            try:
                log(
                    LogLevel.INFO,
                    f'Fetching admin information',
                    'utils.database_handler.fetch_admin_data'
                )
                cursor.execute('SELECT name, password FROM admin')

                return cursor.fetchone()
            except Exception:
                exc = traceback.format_exc()

                log(
                    LogLevel.ERROR,
                    f'Error in fetching admin data\n\tException: {exc}',
                    'utils.database_handler.fetch_admin_data'
                )

                return 1, exc


def check_delegate_is_registered(email_id: str) -> bool:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            cursor.execute('''SELECT * FROM delegates WHERE email=%s''', (email_id,))
            res = cursor.fetchone()
            return bool(res)


def fetch_delegate_field(field: str, email: str) -> tuple[str | int | bool, ...]:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            cursor.execute(f"SELECT {field} FROM delegates WHERE email=%s", (email,))
            data = cursor.fetchone()

            return data

def fetch_delegates_field(field: str, condition: str) -> list[tuple[str | int | bool, ...]]:
    with mysql.connector.connect(**DB_CONFIG) as db:
        with db.cursor(buffered=True) as cursor:
            cursor.execute(f"SELECT {field} FROM delegates WHERE {condition}")
            data = cursor.fetchall()

            return data
