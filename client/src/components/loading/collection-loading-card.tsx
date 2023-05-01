import React from 'react';

interface Props {}

const CollectionLoadingCard = () => {
  return (
    <div className='animate-pulse w-screen h-[20rem] rounded-xl relative'>
      <div className='bg-violet-200 w-full h-full rounded-xl flex items-end'>
        <div className='w-full p-10 flex items-end gap-2'>
          <div className='h-40 w-40 bg-white shadow-lg shadow-violet-600 rounded-lg'></div>
          <div className='flex flex-col gap-2'>
            <div className='h-5 bg-white rounded w-28'></div>
            <div className='h-5 bg-white rounded w-20'></div>
            <div className='h-5 bg-white rounded w-16'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionLoadingCard;
