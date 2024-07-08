'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '../../../../config';

export default function FundDetails({ params }) {
  const [username, setUserName] = useState(null);
  const [fundInfo, setFundInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [purchaseResult, setPurchaseResult] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { schemeCode } = params;

  useEffect(() => {
    const currentUser = localStorage.getItem('username')
    setUserName(currentUser)
    const fetchFundInfo = async () => {
      try {
        const response = await fetch(API_ROUTES.MUTUAL_FUND_INFO(schemeCode), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch fund information');
        }

        const data = await response.json();
        setFundInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFundInfo();
  }, [schemeCode]);

  const handleBuyUnits = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPurchaseResult(null);

    try {
      const response = await fetch(API_ROUTES.BUY_UNITS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ 
            Scheme_Code: schemeCode,  
            quantity: parseInt(quantity)  
          })
      });

      if (!response.ok) {
        throw new Error('Failed to purchase units');
      }

      const data = await response.json();
      setPurchaseResult(data.value);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  if (!username) {
    return <Link href="/login">Login</Link>;
  }
  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <span className="font-semibold text-xl text-gray-800">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">Welcome, {username}</a>
              <button onClick={handleLogout} className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Log Out</button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {fundInfo && (
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-blue-500 text-white">
              <h1 className="text-3xl font-bold">{fundInfo.Scheme_Name}</h1>
              <p className="mt-1 max-w-2xl text-sm">{fundInfo.Mutual_Fund_Family}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Scheme Code</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.Scheme_Code}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Net Asset Value</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.Net_Asset_Value}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.Date}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Scheme Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.Scheme_Type}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Scheme Category</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.Scheme_Category}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ISIN Div Payout/Growth</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.ISIN_Div_Payout_ISIN_Growth}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ISIN Div Reinvestment</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fundInfo.ISIN_Div_Reinvestment}</dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Buy Units</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Enter the quantity of units you want to purchase.</p>
              </div>
              <form onSubmit={handleBuyUnits} className="mt-5 sm:flex sm:items-center">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="quantity" className="sr-only">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 text-gray-600 rounded-md"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Buy Units
                </button>
              </form>
              {purchaseResult && (
                <div className="mt-3 text-sm text-green-600">
                  Purchase successful: {purchaseResult}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}