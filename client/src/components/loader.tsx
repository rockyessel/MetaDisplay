import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

interface Props {
  stateValue: string;
  styles?: string;
}

const Loader = (props: Props) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 text-lg ${props?.styles}`}>
      <CgSpinnerTwo className='text-7xl flex-shrink-0 animate-spin text-violet-600' />{' '}
      <span>{props.stateValue}</span>
    </div>
  );
};

export default Loader;
