import React from 'react';
import IconItem from './icon-item';
import { IoMdCloudUpload } from 'react-icons/io';
import { SiDatabricks } from 'react-icons/si';
import { SlCloudUpload, SlLogout } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { BiLayer, BiLibrary } from 'react-icons/bi';

interface Props {}

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-[#141414] flex justify-between items-center flex-col sticky top-6 h-[93vh] p-1'>
      <IconItem
        title='Upload Asset'
        handleClick={() => navigate('/dashboard/upload-asset')}
        styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
      >
        <IoMdCloudUpload className='text-2xl text-white' />
      </IconItem>

      <div className='flex flex-col gap-2'>
        <IconItem
          title='All'
          handleClick={() => navigate('/dashboard/all')}
          styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
        >
          <BiLibrary className='text-2xl text-white' />
        </IconItem>
        <IconItem
          title='Upload Asset'
          handleClick={() => navigate('/dashboard/upload-asset')}
          styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
        >
          <SlCloudUpload className='text-2xl text-white' />
        </IconItem>
        <IconItem
          title='Create Collection'
          handleClick={() => navigate('/dashboard/create-collection')}
          styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
        >
          <SiDatabricks className='text-2xl text-white' />
        </IconItem>
        <IconItem
          title='Create Collection'
          handleClick={() => navigate('/dashboard/user-account')}
          styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
        >
          <VscAccount className='text-2xl text-white' />
        </IconItem>
      </div>

      <IconItem
        title='Create Collection'
        handleClick={() => navigate('/dashboard/user-account')}
        styles='flex items-center gap-1 bg-[#252525] rounded-md hover:text-violet-800 hover:bg-violet-400'
      >
        <SlLogout className='text-2xl text-white' />
      </IconItem>
    </div>
  );
};

export default Sidebar;
