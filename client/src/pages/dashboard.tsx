import React from 'react';
import { Sidebar } from '../components/dashboard';
import { Outlet } from 'react-router-dom';

interface Props {}

const Dashboard = () => {
  return (
    <div className='w-full relative sm:p-8 p-4 min-h-[83.9vh] flex flex-row'>
      <div className='sm:flex hidden relative'>
        <Sidebar />
      </div>
      <div className='w-full h-full ml-20'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
