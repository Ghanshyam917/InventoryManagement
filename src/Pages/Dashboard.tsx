import React from 'react';
import { LogOut,BarChart3 } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href='/' className="flex items-center">
              {/* <Upload className="h-8 w-8 text-blue-600" /> */}
              <BarChart3 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">InventoryPro</span>
            </a>
            <a href="/login">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
            </a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome to your Dashboard</h1>
          <p className="mt-3 text-xl text-gray-500">You have successfully logged in!</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;