from pydantic import BaseModel, Field


class MutualFundScheme(BaseModel):
    scheme_code: int = Field(..., alias="Scheme_Code")
    scheme_name: str = Field(..., alias="Scheme_Name")
    mutual_fund_family: str = Field(..., alias="Mutual_Fund_Family")
    net_asset_value: float = Field(..., alias="Net_Asset_Value")
    scheme_type: str = Field(..., alias="Scheme_Type")
    class Config:
        populate_by_name = True

class RequestBuyMutualScheme(BaseModel):
    scheme_code: str = Field(..., alias="Scheme_Code")
    quantity: int = Field(..., description="Quantity to buy")