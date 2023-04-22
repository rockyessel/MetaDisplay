import React from 'react';
import { BsTwitter } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
type IconComponentType = IconType & { displayName: string };

interface Props {
  icon: JSX.Element
  title: string;
  description: string;
}

const ReusableTooltip = (props: Props) => {
  return (
    <div className='dropdown dropdown-end dropdown-hover'>
      <label tabIndex={0}>{props.icon}</label>
      <div
        tabIndex={0}
        className='card bg-[#141414] compact dropdown-content shadow-md shadow-violet-500 rounded-box w-64'
      >
        <div className='card-body'>
          <h2 className='card-title'>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReusableTooltip;
