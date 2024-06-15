import pydantic
from typing import Literal

COMMITTEES = ['CCC', 'DISEC', 'IPC', 'Lok-Sabha', 'Board-Room', 'UNHRC', 'UNSC']
COMMITTEE = Literal['CCC', 'DISEC', 'IPC', 'Lok-Sabha', 'Board-Room', 'UNHRC', 'UNSC']

def convert_comm_to_pure(comm: str) -> int:
    if comm.isupper():
        return comm

    return comm.replace('-', ' ')

class DelegateRegistrationData(pydantic.BaseModel):
    name: str
    email: str
    phone_number: str
    school: str
    grade: int

    primary_comm: COMMITTEE
    primary_country: str
    primary_country_2: str

    secondary_comm: COMMITTEE
    secondary_country: str
    secondary_country_2: str

    prior_experience: str = ''


