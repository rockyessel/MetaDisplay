import React from 'react';
import Search from './index';
import { useThirdWebContext } from '../../contexts/thirdweb';
import { IoMdArrowDropdown } from 'react-icons/io';
import Button from '../button';

const SearchData = () => {
  const [valueSelected, setValueSelected] = React.useState('Assets');
  const { allAppreciators, getAssets, collections } = useThirdWebContext();
  const data = {
    allAppreciators: allAppreciators,
    allAssets: getAssets,
    allCollections: collections,
  };

  return (
    <div className='flex items-center w-full'>
      <Button
        title='Categories'
        styles='inline-flex flex-col items-center'
        type='button'
      >
        <span className='w-full inline-flex items-center gap-1 rounded-lg'>
          {valueSelected} <IoMdArrowDropdown />
        </span>
        <div className='z-10 bg-[#141414]  rounded-lg shadow w-full hidden'>
          <ul
            className='py-2 px-2 w-full flex flex-col items-start divide-y divide-violet-100'
            aria-labelledby='dropdown-button'
          >
            <li className='p-2' onClick={() => setValueSelected('Assets')}>
              Assets
            </li>
            <li className='p-2' onClick={() => setValueSelected('Collections')}>
              Collections
            </li>
            <li
              className='p-2'
              onClick={() => setValueSelected('Appreciators')}
            >
              Appreciators
            </li>
            <li className='p-2' onClick={() => setValueSelected('Users')}>
              Users
            </li>
          </ul>
        </div>
      </Button>

      <div className='w-full'>
        <Search valueSelected={valueSelected} data={data} />
      </div>
    </div>
  );
};

export default SearchData;
