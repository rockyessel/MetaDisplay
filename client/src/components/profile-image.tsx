import React from 'react';
import { UserDataProps } from '../interface';

interface Props {
  styles?: string;
  data?: UserDataProps
}

const ProfileImage = (props: Props) => {

  return (
    <img
      className={`shadow-md shadow-violet-800 w-10 object-contain h-10 border-[1.5px] border-gray-50/60 rounded-full ${props?.styles}`}
      src={
        props?.data?.profile
          ? props?.data.profile
          : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
      }
      title={props?.data?.username}
      alt={props?.data?.address}
    />
  );
};

export default ProfileImage;
