import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import ProfileImage from './profile-image';
import UserTooltip from './user-tooltip';
import { Link } from 'react-router-dom';
import { AssetsDisplayProps } from '../interface';

interface Props {
  asset: AssetsDisplayProps;
}

const Card = (props: Props) => {
  return (
    <li className='w-full sm:w-[288px]'>
      <header className='w-full flex items-center rounded-t-lg bg-[#141414] px-4 py-2 justify-between'>
        <div className='flex mb-3 -space-x-3'>
          <ProfileImage />
          <ProfileImage />
          <ProfileImage />
        </div>

        <div className='hover:bg-violet-500 rounded-lg'>
          <RiMoreFill className='text-3xl' />
        </div>
      </header>

      <Link
        to={`/explore/${props?.asset?.owner}/${props?.asset?.title
          ?.toLowerCase()
          ?.replaceAll(' ', '-')}`}
      >
        <main className='w-full'>
          <img
            title={props?.asset?.title}
            className='w-full h-[18rem] object-cover'
            src={props?.asset?.image}
          />
        </main>
      </Link>

      <footer className='w-full flex flex-col gap-2 bg-[#141414] rounded-b-3xl px-4 py-2'>
        <div className='w-full inline-flex items-center justify-between'>
          <span>{props?.asset?.title}</span>
          <span className='inline-flex items-center gap-1'>
            <AiOutlineHeart /> 54
          </span>
        </div>
        <div className='w-full inline-flex items-center justify-between'>
          <span>Appreciated</span>
          <span>{props?.asset?.amountAppreciated.toString()} ETH</span>
        </div>
        <div className='w-full inline-flex items-center justify-between gap-5'>
          <div className='w-full h-full group relative'>
            <ProfileImage />
            <UserTooltip styles='hidden left-0 group-hover:block absolute after:content-[""] after:absolute after:bottom-full after:left-0 after:border-8 after:border-solid after:border-x-transparent after:border-t-transparent after:border-b-white after:translate-y-0.5 after:translate-x-0.5' />
          </div>
          <p className='truncate'>
            by <span className='font-semibold'>{props?.asset?.owner}</span>
          </p>
        </div>
      </footer>
    </li>
  );
};

export default Card;
