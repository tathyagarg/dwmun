from fastapi import (
    APIRouter,
    status,
    Depends,
    File,
    UploadFile,
)
from fastapi.responses import JSONResponse
from utils.models import DelegateRegistrationData
from utils.database_handler import (
    register_individual,
    register_delegation,
    check_delegate_is_registered,
    fetch_all_delegates
)
from utils.utils import (
    get_filetype,
    check_valid_image_filetype,
    check_valid_image_filesize
)

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
    return fetch_all_delegates()


@router.post("/individual", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def individual_registration_ep(registration_data: DelegateRegistrationData = Depends(), payment: UploadFile = File(...)):
    payment_content = await payment.read()
    filetype: str = get_filetype(payment.filename)

    if check_delegate_is_registered(registration_data.email):
        return "DELEGATE ALREADY REGISTERED"  # TODO: add proper response

    if (validity := check_file_validity(payment, payment_content)) != 0:
        return validity

    response = register_individual(
        data=registration_data,
        file_data=payment_content,
        filetype=filetype
    )

    return response

@router.post("/delegation", response_class=JSONResponse, status_code=status.HTTP_200_OK)
async def delegation_registration_ep(registration_data: list[DelegateRegistrationData], payment: UploadFile = File(...)):
    payment_content = payment.read()
    filetype: str = get_filetype(payment.filename)

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

