import asyncio
import datetime
import os
import dotenv
import mysql.connector

dotenv.load_dotenv()

HOURS_DELAY: int = 7

DB_CONFIG: dict[str, str] = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'database': os.getenv('DB_DATABASE'),
    'password': os.getenv('DB_PASSWORD'),
    'port': os.getenv('DB_PORT')
}

db = mysql.connector.connect(**DB_CONFIG)
cursor = db.cursor(buffered=True)

async def main():
    cursor.execute('SELECT name FROM admin;')
    print(f'Ran query at {datetime.datetime.now()}')

    await asyncio.sleep(HOURS_DELAY * 60 * 60)

if __name__ == '__main__':
    print("Starting job")

    event_loop = asyncio.new_event_loop()
    event_loop.create_task(main())

    event_loop.run_forever()
