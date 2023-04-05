import React from 'react';
import { Navbar, Sidebar } from '../../components/dashboard';
import { Outlet } from 'react-router-dom';

interface Props {}

const Dashboard = () => {
  return (
    <div className='w-full relative sm:p-8 p-4 min-h-[83.9vh] flex flex-row'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
