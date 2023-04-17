import React from 'react';
import { BsSearch } from 'react-icons/bs';

interface Props {}

const Search = () => {
  return (
    <div className='flex-1 border-[1px] hidden border-gray-50/60 md:flex items-center gap-3 px-3 py-1.5 rounded-3xl max-w-sm lg:max-w-lg'>
      <BsSearch />
      <input
        type='text'
        className='bg-transparent outline-none w-full'
        placeholder='Search items, collection, accounts'
      />
    </div>
  );
};

export default Search;
