import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

interface Props {
  stateValue: string;
  styles?: string;
  iconStyles?:string;
}

const Loader = (props: Props) => {
  return (
    <div className={`inline-flex items-center gap-2 text-lg ${props?.styles}`}>
      <CgSpinnerTwo className={`${props?.iconStyles ? props?.iconStyles : 'text-7xl'} flex-shrink-0 animate-spin text-violet-600`} />{' '}
      <span>{props.stateValue}</span>
    </div>
  );
};

export default Loader;
