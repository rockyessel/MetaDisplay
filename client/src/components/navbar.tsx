import React from 'react';
import { TfiThemifyFaviconAlt } from 'react-icons/tfi';
import { BsSearch, BsSun, BsMoon } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const Navbar = () => {
  const { address, connect } = useThirdWebContext();

  const navigate = useNavigate();

  const handleConnection = async () => {
    if (address) navigate('/dashboard/upload-asset');
    if (connect) await connect();
    else console.log('No connection was made');
  };

  return (
    <header className='w-full flex items-center justify-between py-3'>
      <div className='w-full flex items-center gap-10'>
        <Link to='/'>
          <span className='inline-flex items-center'>
            <TfiThemifyFaviconAlt className='text-green-400 text-3xl' />{' '}
            <span className='font-extrabold'>MetaDisplay</span>
          </span>
        </Link>

        <div className='flex-1 border-[1px] hidden border-gray-50/60 md:flex items-center gap-3 px-3 py-1.5 rounded-3xl max-w-sm lg:max-w-lg'>
          <BsSearch />
          <input
            type='text'
            className='bg-transparent outline-none w-full'
            placeholder='Search items, collection, accounts'
          />
        </div>
      </div>

      <div className='block md:hidden'>
        <label className='btn btn-circle swap swap-rotate'>
          {/* <!-- this hidden checkbox controls the state --> */}
          <input type='checkbox' />

          {/* <!-- hamburger icon --> */}
          <svg
            className='swap-off fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>

          {/* <!-- close icon --> */}
          <svg
            className='swap-on fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
          </svg>
        </label>
      </div>

      <nav className='w-full hidden md:flex items-center gap-6 justify-end'>
        <ul className='flex items-center gap-2'>
          <Link to='/'>
            <li>Home</li>
          </Link>

          <li>Collections</li>
        </ul>

        <ul className='flex items-center gap-2'>
          <li
            onClick={handleConnection}
            title={`${address ? 'Dashboard' : 'Connect your wallet'}`}
            className='bg-violet-600 hover:bg-violet-700 text-white font-light rounded-2xl w-fit px-4 py-2'
          >
            {address ? 'Dashboard' : 'Connect your wallet'}
          </li>
          <li>
            <label className='swap swap-rotate border-[1px] border-gray-50/60 rounded-full p-2'>
              <input title='Mode Toggle' type='checkbox' />
              <BsSun className='swap-on fill-current w-6 h-6' />
              <BsMoon className='swap-off fill-current w-6 h-6' />
            </label>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

// . . .  - Share, save, view, appreciate, follow user
// . . . - wallet connected - add to collection, create collection, delete asset
