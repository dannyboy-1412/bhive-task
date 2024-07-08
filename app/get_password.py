from getpass import getpass

from core.security import get_password_hash

if __name__ == "__main__":
    password = getpass("Enter password: ")
    password_hash = get_password_hash(password)

    print(f"Store this password hash in the .env file: {password_hash}")