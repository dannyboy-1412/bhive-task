from typing import Annotated, List, Optional
from pydantic import ValidationError
from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi import Depends, HTTPException, status
from fastapi.responses import JSONResponse

from schemas.user_models import User
from schemas.funds_models import MutualFundScheme, RequestBuyMutualScheme
from db.fake_db import mutual_fund_family_list
from core.security import get_current_active_user
from core.external_api import call_api

router = APIRouter(
    prefix="/mutual-funds",
    tags=["funds"]
)


@router.get("/list/{fund_family}", response_model=List[MutualFundScheme])
async def list_mutual_funds(
    current_user: Annotated[User, Depends(get_current_active_user)],
    fund_family: Optional[str] = None,
):
    params = {'Scheme_Type':'Open'}
    if fund_family:
        if fund_family not in mutual_fund_family_list:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid mutual fund")
        params['Mutual_Fund_Family'] = fund_family

    data = call_api(params=params)
    parsed_data = [MutualFundScheme(**item) for item in data]
    
    return parsed_data


@router.get("/fund/{code}")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
    code: int
):
    params = {
        'Scheme_Type':'Open',
        'Scheme_Code':code
    }
    
    data = call_api(params=params)[0]
    
    return JSONResponse(content=data)

@router.post("/buy")
async def buy_scheme(
    current_user: Annotated[User, Depends(get_current_active_user)],
    request: RequestBuyMutualScheme
):
    try:
        item_code = request.scheme_code
        quantity = request.quantity
        params = {'Scheme_Type':'Open'}
        params['Scheme_Code'] = item_code

        if quantity < 1:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Quantity must be greater than zero")

        data = call_api(params=params)[0]

        value_per_unit = data.get('Net_Asset_Value')
        purchase_value = value_per_unit * quantity
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))

    return JSONResponse(content={'purchased':True,'value':f"Order for {quantity} units of {data.get('Scheme_Name')} successful for amount of Rs {purchase_value:.2f}"})