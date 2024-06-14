import ast

ACCEPTED_FILETYPES = {'png', 'jpeg', 'jpg'}
THRESHOLD = 10 * 1024 * 1024

def get_filetype(filename: str) -> str:
    return filename.split('.')[-1]

def check_valid_image_filetype(filename: str) -> bool:
    return get_filetype(filename) in ACCEPTED_FILETYPES

def check_valid_image_filesize(size: str) -> bool:
    return len(size) <= THRESHOLD

def parse_str_to_dict(text: str) -> dict:
    result = ast.literal_eval(text)

    result.pop('confirmation')

    return result
