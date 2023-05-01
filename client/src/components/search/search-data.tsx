import React from 'react';
import Search from './index';
import { useThirdWebContext } from '../../contexts/thirdweb';
import { IoMdArrowDropdown } from 'react-icons/io';
import Button from '../button';

const SearchData = () => {
  const [valueSelected, setValueSelected] = React.useState('Assets');
  const [dropdownState, setDropdownState] = React.useState(false);
  const { allAppreciators, getAssets, collections } = useThirdWebContext();
  const data = {
    allAppreciators: allAppreciators,
    allAssets: getAssets,
    allCollections: collections,
  };

  console.log('dropdownState', dropdownState);

  const handleDropdown = () => {
    setDropdownState((prev) => !prev);
  };

  return (
    <div className='flex items-center w-full gap-3'>
      <div className='flex flex-col gap-2 relative'>
        <Button
          title='Categories'
          styles='inline-flex flex-col items-center'
          type='button'
          handleClick={handleDropdown}
        >
          <span className='w-full inline-flex items-center gap-1 rounded-lg'>
            {valueSelected} <IoMdArrowDropdown />
          </span>
        </Button>
        {dropdownState && (
          <div className='z-10 bg-[#141414] rounded-lg shadow-lg shadow-violet-500 w-[10rem] absolute top-10 -left-10 mt-4'>
            <ul
              onClick={handleDropdown}
              className='py-2 px-2 w-full flex flex-col items-start divide-y divide-violet-100/10 cursor-pointer'
              aria-labelledby='dropdown-button'
            >
              <li
                className='p-2 w-full'
                onClick={() => setValueSelected('Assets')}
              >
                Assets
              </li>
              <li
                className='p-2 w-full'
                onClick={() => setValueSelected('Collections')}
              >
                Collections
              </li>
              <li
                className='p-2 w-full'
                onClick={() => setValueSelected('Appreciators')}
              >
                Appreciators
              </li>
              <li
                className='p-2 w-full'
                onClick={() => setValueSelected('Users')}
              >
                Users
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className='w-full flex-1'>
        <Search valueSelected={valueSelected} data={data} />
      </div>
    </div>
  );
};

export default SearchData;
