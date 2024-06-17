from fastapi import (
    APIRouter,
    status,
    File,
    UploadFile,
    Body
)
from fastapi.responses import JSONResponse
from utils.models import (
    DelegateRegistrationData,
    SingleDelegateRegistrationData
)
from utils.database_handler import (
    register_individual,
    register_delegation,
    check_delegate_is_registered,
    fetch_all_delegates
)
from utils.utils import (
    get_filetype,
    check_valid_image_filetype,
    check_valid_image_filesize,
    parse_str_to_dict
)
import json

router = APIRouter(prefix='/registration', tags=['registrations'])


def check_file_validity(payment, payment_content) -> str | int:
    if payment == '':
        return "PAYMENT PROOF NOT SUBMITTED"  # TODO: add proper response

    if payment.filename == '' or not check_valid_image_filetype(payment.filename):
        return "INVALID FILE FORMAT"  # TODO: add proper response

    if not check_valid_image_filesize(payment_content):
        return "FILE TOO LARGE"  # TODO: add proper response

    return 0

@router.get("/individual", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def get_indis_ep():
    return fetch_all_delegates(params='name, email')


@router.post("/individual", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def individual_registration_ep(registration_data: str = Body(...), payment: UploadFile = File(...)):
    payment_content = await payment.read()
    filetype: str = get_filetype(payment.filename)

    parsed = parse_str_to_dict(registration_data)

    print(json.dumps(parsed))

    registration_data: DelegateRegistrationData = DelegateRegistrationData.model_validate_json(json.dumps(parsed))

    if check_delegate_is_registered(registration_data.email):
        print(registration_data.email)
        return "DELEGATE ALREADY REGISTERED"  # TODO: add proper response

    if (validity := check_file_validity(payment, payment_content)) != 0:
        return validity

    print(registration_data.primary_comm)

    primary_registration_data = SingleDelegateRegistrationData(
        name=registration_data.name,
        email=registration_data.email,
        phone_number=registration_data.phone_number,
        school=registration_data.school,
        grade=registration_data.grade,
        primary_comm=registration_data.primary_comm,
        secondary_comm=registration_data.secondary_comm,
        primary_country=registration_data.primary_country,
        primary_country_2=registration_data.primary_country_2,
        secondary_country=registration_data.secondary_country,
        secondary_country_2=registration_data.secondary_country_2,
        prior_experience=registration_data.prior_experience
    )

    response = register_individual(
        data=primary_registration_data,
        file_data=payment_content,
        filetype=filetype
    )

    if response[0] == 1:
        return response

    if "UNSC" not in (registration_data.primary_comm, registration_data.secondary_comm):
        return response

    if registration_data.primary_comm == "UNSC":
        country = registration_data.primary_country
        country2 = registration_data.primary_country_2
    else:
        country = registration_data.secondary_country
        country2 = registration_data.secondary_country_2

    secondary_registration_data = SingleDelegateRegistrationData(
        name=registration_data.double_name,
        email=registration_data.double_email,
        phone_number=registration_data.double_phone_number,
        school=registration_data.school,
        grade=registration_data.double_grade,
        primary_comm="UNSC",
        secondary_comm=registration_data.double_primary_comm,
        primary_country=country,
        primary_country_2=country2,
        secondary_country=registration_data.double_primary_country,
        secondary_country_2=registration_data.double_secondary_country,
        prior_experience=registration_data.double_prior_experience
    )

    response = register_individual(
        data=secondary_registration_data,
        file_data=payment_content,
        filetype=filetype
    )

    return response

@router.post("/delegation", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def delegation_registration_ep(registration_data: str = Body(...), payment: UploadFile = File(...)):
    payment_content = await payment.read()
    filetype: str = get_filetype(payment.filename)

    print(registration_data)

    for delegate in registration_data:
        if check_delegate_is_registered(delegate.email):
            return f"DELEGATE {delegate.email} ALREADY REGISTERED"  # TODO: add proper response

    if (validity := check_file_validity(payment, payment_content)) != 0:
        return validity

    response = register_delegation(
        delegates=registration_data,
        file_data=payment_content,
        filetype=filetype
    )

    return response

