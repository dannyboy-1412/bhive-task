import os
from dotenv import load_dotenv

load_dotenv()

username = os.getenv('USERNAME')

fake_users_db = {
    username: {
        "username": username,
        "hashed_password": os.getenv("PASSWORD_HASHED"),
        "disabled": False,
    }
}

mutual_fund_family_list = ['Aditya Birla Sun Life Mutual Fund', 'Axis Mutual Fund', 'Bajaj Finserv Mutual Fund', 'Bandhan Mutual Fund', 'Baroda BNP Paribas Mutual Fund', 'Canara Robeco Mutual Fund', 'DSP Mutual Fund', 'Edelweiss Mutual Fund', 'Franklin Templeton Mutual Fund', 'HDFC Mutual Fund', 'HSBC Mutual Fund', 'ICICI Prudential Mutual Fund', 'Invesco Mutual Fund', 'ITI Mutual Fund', 'Kotak Mahindra Mutual Fund', 'LIC Mutual Fund', 'Mirae Asset Mutual Fund', 'Nippon India Mutual Fund', 'SBI Mutual Fund', 'Sundaram Mutual Fund', 'Trust Mutual Fund', 'UTI Mutual Fund', 'PGIM India Mutual Fund', 'Tata Mutual Fund', 'Union Mutual Fund', 'Bank of India Mutual Fund', '360 ONE Mutual Fund (Formerly Known as IIFL Mutual Fund)', 'Groww Mutual Fund', 'JM Financial Mutual Fund', 'Mahindra Manulife Mutual Fund', 'Quantum Mutual Fund', 'quant Mutual Fund', 'Motilal Oswal Mutual Fund', 'Navi Mutual Fund', 'PPFAS Mutual Fund', 'WhiteOak Capital Mutual Fund', 'Helios Mutual Fund', 'NJ Mutual Fund', 'Samco Mutual Fund', 'Shriram Mutual Fund', 'Taurus Mutual Fund', 'Zerodha Mutual Fund', 'Old Bridge Mutual Fund', 'IL&FS Mutual Fund (IDF)']