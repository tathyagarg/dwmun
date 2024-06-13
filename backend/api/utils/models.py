import pydantic
from typing import Literal

COMMITTEE = Literal['CCC', 'DISEC', 'IPC', 'Lok Sabha', 'SSCI', 'UNHRC', 'UNSC']

class DelegateRegistrationData(pydantic.BaseModel):
    name: str
    email: str
    phone_number: str
    school: str
    grade: int

    primary_comm: COMMITTEE
    primary_country: str

    secondary_comm: COMMITTEE
    secondary_country: str

    prior_experience: str = ''


