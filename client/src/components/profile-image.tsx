import React from 'react';
import { UserDataProps } from '../interface';

interface Props {
  styles?: string;
  data?: UserDataProps
}

const ProfileImage = (props: Props) => {
  console.log('props', props?.data?.profile);
  return (
    <img
      className={`w-10 object-contain h-10 border-[1.5px] border-gray-50/60 rounded-full ${props?.styles}`}
      src={
        props?.data?.profile
          ? props?.data.profile
          : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
      }
      alt={props?.data?.address}
    />
  );
};

export default ProfileImage;
