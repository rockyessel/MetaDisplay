import React from 'react';
import Button from './button';
import { useUserContext } from '../contexts/user-context';

interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const ReusableModal = (props: Props) => {
  const { handleReusableModalToggle, reusableModalValue } = useUserContext();
  return (
    <div className='tx_modal fixed top-0 left-0 overflow-hidden px-10 bg-black/40 z-[30] flex justify-center items-center'>
      <div className='bg-black  w-[30rem] h-auto  px-4 py-2 rounded-xl flex flex-col gap-5 z-[30] shadow-lg shadow-violet-600 overflow-hidden'>
        <h3 className='font-bold text-lg'>{props.title}</h3>
        {props.description !== undefined ? (
          <p className='py-4'>{props.description}</p>
        ) : (
          <div>{props?.children}</div>
        )}

        <Button
          handleClick={() => handleReusableModalToggle(reusableModalValue)}
          title='Close'
          type='button'
          styles='w-full'
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ReusableModal;
