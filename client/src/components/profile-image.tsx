import React from 'react';

interface Props {
  styles?: string;
}

const ProfileImage = (props: Props) => {
  return (
    <img
      className={`w-10 object-contain h-10 border-[1.5px] border-gray-50/60 rounded-full ${props?.styles}`}
      src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
      alt=''
    />
  );
};

export default ProfileImage;
