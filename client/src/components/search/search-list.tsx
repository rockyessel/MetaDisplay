import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  image: string;
  description?: string;
  username?: string;
  to: string;
}

const SearchList = (props: Props) => {
  return (
    <li className='truncate'>
      <Link
        className='truncate inline-flex items-end gap-1 py-2'
        to={props?.to}
      >
        <img
          className='w-10 h-10 rounded-md'
          src={props?.image}
          alt={props?.title}
        />
        <span className='inline-flex flex-col leading-none truncate'>
          <span className='truncate font-bold'>
            {props?.title}
          </span>
          <span className='truncate text-xs'>
            {props?.description} || {props?.username}
          </span>
        </span>
      </Link>
    </li>
  );
};

export default SearchList;
