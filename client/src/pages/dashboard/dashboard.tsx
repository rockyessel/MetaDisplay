import React from 'react';
import { Navbar, Sidebar } from '../../components/dashboard';
import { Outlet } from 'react-router-dom';

interface Props {}

const Dashboard = () => {
  return (
    <div className='relative sm:p-8 p-4 min-h-screen flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
