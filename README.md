# BHive Task

This README provides instructions for setting up and running the BHive Task project.

## Setup

1. Clone the repository:
```
git clone https://github.com/dannyboy-1412/bhive-task.git
```

2. Create a `.env` file in the root directory based on the `.env.example` file.

3. Generate a hashed password:
- Run the `get_password.py` script
- Enter your password when prompted in the terminal
- Copy the resulting hashed password (ignore any attribute error)
- Add the hashed password to the `.env` file

4. Generate a secret key:
```
openssl rand -hex 32
```

Add the generated key to the `.env` file

5. Obtain a RapidAPI key:
- Visit the RapidAPI website
- Generate an API key
- Add the API key to the `.env` file

## Running the Application

### Backend (FastAPI server)

1. Navigate to the `app` directory:
```
cd app
```

2. Start the FastAPI server:
```
uvicorn main:app

```
### Frontend (UI)

1. Navigate to the `ui` folder:
```
cd ui
```

2. Start the development server:
```
npm run dev
```

Your application should now be up and running!