import React from 'react';
import ProfileImage from './profile-image';
import Button from './button';

interface Props {
  styles?: string;
  data: any
}

const UserTooltip = (props: Props) => {
  return (
    <div
      className={`z-10 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${props?.styles}`}
    >
      <div className='p-3'>
        <div className='flex items-center justify-between mb-2'>
          <ProfileImage data={props?.data} />

          <div>
            <Button
              title='Follow Button'
              type='button'
              styles='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5'
            >
              Follow
            </Button>
          </div>
        </div>
        <p className='text-base truncate font-semibold leading-none text-gray-900 dark:text-white'>
          <span>{props?.data?.address}</span>
        </p>
        <p className='mb-3 text-sm font-normal'>
          <span className='hover:underline'>
            @{props?.data?.username}
          </span>
        </p>
        <p className='mb-4 text-sm truncate'>
          To fix the error, you should update the type property in the Props
          interface to allow only the specific set of values or undefined, like
          this
        </p>
        <ul className='flex text-sm'>
          <li className='mr-2'>
            <span className='font-semibold text-gray-900 dark:text-white'>
              799
            </span>
            <span>Following</span>
          </li>
          <li>
            <span className='font-semibold text-gray-900 dark:text-white'>
              3,758
            </span>
            <span>Followers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTooltip;
