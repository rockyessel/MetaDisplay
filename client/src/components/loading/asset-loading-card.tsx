import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';

interface Props {}

const AssetLoadingCard = () => {
  return (
    <li className='w-full sm:w-[288px] hover:shadow-lg hover:shadow-violet-500 rounded-b-3xl'>
      <div className='animate-pulse flex flex-col'>
        <header className='w-full flex items-center rounded-t-lg py-3.5 bg-[#141414] px-4 justify-between'>
          <div className='rounded-full bg-violet-200 h-10 w-10'></div>
          <div className='shadow-md shadow-violet-800 rounded-lg'>
            <AiOutlineMore className='text-3xl' />
          </div>
        </header>

        <div className='w-full h-[18rem] object-cover bg-violet-200'></div>

        <footer className='flex-1 w-full flex flex-col gap-2 bg-[#141414] rounded-b-3xl px-4 py-4'>
          <div className='py-[0.19rem] items-center flex  gap-4 justify-items-stretch place-content-between'>
            <div className='h-2.5 bg-violet-200 rounded w-32'></div>
            <div className='h-2.5 bg-violet-200 rounded w-10 col-span-1'></div>
          </div>
          <div className='py-[0.19rem] items-center flex  gap-4 justify-items-stretch place-content-between'>
            <div className='h-3 bg-violet-200 rounded w-28'></div>
            <div className='h-3 bg-violet-200 w-16 rounded col-span-1'></div>
          </div>

          <div className='py-[0.19rem] items-center flex  gap-4 justify-items-stretch place-content-between'>
            <div className='rounded-full bg-violet-200 h-10 w-10 shadow-md shadow-violet-800'></div>
            <div className='h-4 bg-violet-200 rounded w-20'></div>
          </div>
        </footer>
      </div>
    </li>
  );
};

export default AssetLoadingCard;
