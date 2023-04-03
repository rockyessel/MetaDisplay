import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import ProfileImage from './profile-image';
import UserTooltip from './user-tooltip';

interface Props {}

const Card = () => {
  return (
    <li className='w-full sm:w-[288px]'>
      <header className='flex items-center rounded-t-3xl px-4 py-2 bg-[#141414] justify-between'>
        <div className='flex mb-3 -space-x-3'>
          <ProfileImage />
          <ProfileImage />
          <ProfileImage />
        </div>

        <div>
          <RiMoreFill className='text-3xl' />
        </div>
      </header>

      <main>
        <img
          className='w-full h-[18rem] object-cover'
          src='https://klaudbox.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Ffiles%2Fut3w84xx%2Fproduction%2F0e1b8a553d29ab837a71867b151acd49982bdd08.webp&w=1080&q=75'
          alt=''
        />
      </main>

      <footer className='w-full flex flex-col gap-2 bg-[#141414] rounded-b-3xl px-4 py-2'>
        <div className='w-full inline-flex items-center justify-between'>
          <span>TheHappiness</span>
          <span className='inline-flex items-center gap-1'>
            <AiOutlineHeart /> 54
          </span>
        </div>
        <div className='w-full inline-flex items-center justify-between'>
          <span>Bought Amount</span>
          <span>ETH 0.5</span>
        </div>
        <div className='w-full inline-flex items-center justify-between gap-5'>
          <div className='w-full h-full group relative'>
            <ProfileImage />
            <UserTooltip styles='hidden left-0 group-hover:block absolute after:content-[""] after:absolute after:bottom-full after:left-0 after:border-8 after:border-solid after:border-x-transparent after:border-t-transparent after:border-b-white after:translate-y-0.5 after:translate-x-0.5' />
          </div>
          <p className='truncate'>
            by <span>0x60D0A1B4cD08f7A66C13ac30ABC568c98B79A2cd</span>
          </p>
        </div>
      </footer>
    </li>
  );
};

export default Card;
