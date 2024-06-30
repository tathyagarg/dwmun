from .database_handler import run_sql
import asyncio
import datetime

HOURS_DELAY: int = 7

async def main():
    run_sql('SELECT name FROM admin;')
    print(f'Ran query at {datetime.datetime.now()}')

    await asyncio.sleep(HOURS_DELAY * 60 * 60)

if __name__ == '__main__':
    print("Starting job")

    event_loop = asyncio.new_event_loop()
    event_loop.create_task(main())

    event_loop.run_forever()
