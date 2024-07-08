
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/login`,
  LIST_MUTUAL_FUNDS: (param) => `${API_BASE_URL}/mutual-funds/list/${param}`,
  MUTUAL_FUND_INFO: (schemeCode) => `${API_BASE_URL}/mutual-funds/fund/${schemeCode}`,
  BUY_UNITS:`${API_BASE_URL}/mutual-funds/buy`
};