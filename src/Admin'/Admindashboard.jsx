import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Navbar />


      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 ">
      
        <aside className="bg-white w-full md:w-64 p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/dashboard2" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/product2" className="hover:text-blue-600">Product</Link>

            <a href="#" className="text-gray-700 hover:text-blue-600">Users</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Reports</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin</span>
              <img
                src="https://as2.ftcdn.net/v2/jpg/04/75/00/99/1000_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Users</h3>
              <p className="text-2xl font-bold">123</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Revenue</h3>
              <p className="text-2xl font-bold">$12,340</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Errors</h3>
              <p className="text-2xl font-bold text-red-500">3</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
