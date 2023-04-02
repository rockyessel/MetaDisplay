import React from 'react';
import { Link } from 'react-router-dom';
import Button from './button';

interface Props {
  links?: string[] | undefined;
  handleClick: () => void;
  styles: string;
  data?: string[] | undefined;
}

const DropMenu = (props: Props) => {
    const state = props?.links?.length! < 0 || props?.links === undefined;
    
    console.log('state', state);

  return (
    <div
      className={`flex flex-col z-10 bg-white divide-y divide-gray-100 rounded-3xl shadow w-full ${props?.styles}`}
    >
      {state
        ? props?.data?.map((item, index) => (
            <p
              key={index}
              className='px-4 py-2 first:rounded-t-3xl last:rounded-b-3xl hover:bg-gray-100 text-black'
              title={item}
            >
              {item}
            </p>
          ))
        : props?.links?.map((link, index) => (
            <Link
              className='px-4 py-2 first:rounded-t-3xl last:rounded-b-3xl hover:bg-gray-100 text-black'
              key={index}
              to={link}
            >
              {link}
            </Link>
          ))}
    </div>
  );
};

export default DropMenu;
