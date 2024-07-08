'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { API_ROUTES } from '../../config';
import { MUTUAL_FUND_FAMILIES } from '../../constants';

export default function Dashboard() {
  const [username, setUserName] = useState(null);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem('username')
    if (userName) {
      setUserName(userName);
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchMutualFunds = async (family) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(API_ROUTES.LIST_MUTUAL_FUNDS(encodeURIComponent(family)), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch mutual funds');
      }

      const data = await response.json();
      setMutualFunds(data);
      setSelectedFamily(family);
    } catch (err) {
      setError('Error fetching mutual funds: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFamilyChange = (event) => {
    const family = event.target.value;
    setSelectedFamily(family);
    if (family) {
      fetchMutualFunds(family);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  if (!username) {
    return <div>Login to view dashboard</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">Dashboard</span>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">Welcome, {username}</a>
              <button onClick={handleLogout} className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Log Out</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Mutual Fund Families</h1>
        <div className="mb-6">
      <label htmlFor="family-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Mutual Fund Family
      </label>
      <div className="relative">
        <select
          id="family-select"
          value={selectedFamily}
          onChange={handleFamilyChange}
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a family</option>
          {MUTUAL_FUND_FAMILIES.map((family) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {selectedFamily && !isLoading && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{selectedFamily}</h2>
            <div className="space-y-4">
              {mutualFunds.map((fund, index) => (
                <div 
                  key={fund.Scheme_Code || index} 
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <Link 
                    href={`/dashboard/fund/${encodeURIComponent(fund.Scheme_Code)}`} 
                    className="block group"
                  >
                    <h3 className="text-lg text-gray-800 font-semibold group-hover:text-blue-600 transition-colors duration-200">{fund.Scheme_Name}</h3> 
                  </Link>
                  <p className="text-gray-600"><strong>Fund Family: </strong>{fund.Mutual_Fund_Family}</p>
                  <p className="text-gray-600"><strong>Net Value: </strong>{fund.Net_Asset_Value}</p>
                  <p className="text-gray-600"><strong>Scheme Type: </strong>{fund.Scheme_Type}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}