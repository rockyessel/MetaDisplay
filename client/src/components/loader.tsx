import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

interface Props {
  stateValue: string;
  styles?: string;
  iconStyles?: string;
}

const Loader = (props: Props) => {
  return (
    <div
      className={`flex justify-center items-center text-lg ${props?.styles}`}
    >
      <p className='flex items-center gap-2'>
        <CgSpinnerTwo
          className={`${
            props?.iconStyles ? props?.iconStyles : 'text-7xl text-violet-600'
          } flex-shrink-0 animate-spin`}
        />{' '}
        <span>{props.stateValue}</span>
      </p>
    </div>
  );
};

export default Loader;
