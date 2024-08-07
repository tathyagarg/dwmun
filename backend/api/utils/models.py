from typing import Literal

import pydantic

COMMITTEES = ['CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC']
COMMITTEE = Literal['CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC']
COMMITTEE_ALLOW_EMPTY = Literal['CCC', 'DISEC', 'IPC', 'Lok Sabha', 'Committee X', 'UNHRC', 'UNSC', '']

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

    double_name: str = ''
    double_email: str = ''
    double_phone_number: str = ''
    double_grade: int = 0

    double_primary_comm: COMMITTEE_ALLOW_EMPTY = ''
    double_primary_country: str = ''
    double_secondary_country: str = ''

    double_prior_experience: str = ''

class SingleDelegateRegistrationData(pydantic.BaseModel):
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

    def __repr__(self) -> str:
        return str(vars(self))
