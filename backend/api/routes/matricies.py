from fastapi import (
    APIRouter
)

router = APIRouter(prefix="/matricies", tags=['matricies'])

MATRIX_DATA = {
    'Board-Room': ['Test A', 'Test B'],
    'CCC': ['Test C', 'Test D'],
    'UNSC': ['Test E', 'Test F']
}

@router.get('/{comm}')
async def get_committee_matrix(comm: str) -> list[str]:
    return MATRIX_DATA.get(comm, [])
