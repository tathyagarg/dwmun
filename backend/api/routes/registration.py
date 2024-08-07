import json
import ast

from fastapi import (
    APIRouter,
    status,
    File,
    UploadFile,
    Body
)
from fastapi.responses import JSONResponse

from utils import *

router = APIRouter(prefix='/registration', tags=['registrations'])


def check_file_validity(payment: UploadFile, payment_content: bytes) -> STATUS:
    if payment == '':
        return 1, "Payment Proof not submitted"

    if payment.filename == '' or not check_valid_image_filetype(payment.filename):
        return 1, "Invalid file format"

    if not check_valid_image_filesize(payment_content):
        return 1, "File too large"

    return 0, ""


@router.post("/indi", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def individual_registration_ep(registration_data: str = Body(...), payment: UploadFile = File(...)):
    payment_content: bytes = await payment.read()
    filetype: str = get_filetype(payment.filename)

    log(
        LogLevel.CRITICAL,
        f'Recieved registration information\n\t{registration_data}',
        'routes.registration.individual_registration_ep'
    )

    parsed: dict = parse_str_to_dict(registration_data)

    registration_data: DelegateRegistrationData = DelegateRegistrationData.model_validate_json(json.dumps(parsed))

    if check_delegate_is_registered(registration_data.email):
        return 1, "Delegate already registered!"

    if (validity := check_file_validity(payment, payment_content)) != (0, ""):  # Invalid file check
        return validity

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

    if response[0] == 1:  # Registration threw error
        return response

    if "UNSC" not in (registration_data.primary_comm, registration_data.secondary_comm):  # Single delegate registration
        return response

    #  Delegate opted for UNSC as a committee preference, this handles their partner's registration

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


@router.post("/dele", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def delegation_registration_ep(registration_data: str = Body(...), payment: UploadFile = File(...)):
    payment_content: bytes = await payment.read()
    filetype: str = get_filetype(payment.filename)

    log(
        LogLevel.INFO,
        f'Recieved registration information: {registration_data}',
        'routes.registration.delegation_registration_ep'
    )

    registration_data: list[str] = ast.literal_eval(registration_data)
    registration_data: list[dict] = [ast.literal_eval(elem) for elem in registration_data]

    head_del: DelegateRegistrationData = DelegateRegistrationData.model_validate_json(json.dumps(registration_data[0]))

    school = head_del.school

    result = [head_del]

    for parsed in registration_data[1:]:
        parsed['school'] = school

        result.append(DelegateRegistrationData.model_validate_json(json.dumps(parsed)))

    final = []

    for delegate in result:
        data = SingleDelegateRegistrationData(
            name=delegate.name,
            email=delegate.email,
            phone_number=delegate.phone_number,
            school=delegate.school,
            grade=delegate.grade,
            primary_comm=delegate.primary_comm,
            secondary_comm=delegate.secondary_comm,
            primary_country=delegate.primary_country,
            primary_country_2=delegate.primary_country_2,
            secondary_country=delegate.secondary_country,
            secondary_country_2=delegate.secondary_country_2,
            prior_experience=delegate.prior_experience
        )

        final.append(data)

        if "UNSC" in (delegate.primary_comm, delegate.secondary_comm):
            if delegate.primary_comm == "UNSC":
                country = delegate.primary_country
                country2 = delegate.primary_country_2
            else:
                country = delegate.secondary_country
                country2 = delegate.secondary_country_2

            partner = SingleDelegateRegistrationData(
                name=delegate.double_name,
                email=delegate.double_email,
                phone_number=delegate.double_phone_number,
                school=delegate.school,
                grade=delegate.double_grade,
                primary_comm="UNSC",
                secondary_comm=delegate.double_primary_comm,
                primary_country=country,
                primary_country_2=country2,
                secondary_country=delegate.double_primary_country,
                secondary_country_2=delegate.double_secondary_country,
                prior_experience=delegate.double_prior_experience
            )

            final.append(partner)

    for delegate in final:
        if check_delegate_is_registered(delegate.email):  # Make sure none of the delegates have already registered
            return 1, f"Delegate {delegate.email} is already registered"

    if (validity := check_file_validity(payment, payment_content)) != (0, ""):  # Ensure file validity
        return validity

    response = register_delegation(
        delegates=final,
        file_data=payment_content,
        filetype=filetype
    )

    return response

