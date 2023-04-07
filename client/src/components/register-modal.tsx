import React from 'react';
import Input from './input';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const RegisterModal = () => {
  const { address } = useThirdWebContext();

  return (
    <main className='tx_modal fixed top- left-0 overflow-hidden backdrop-blur-lg bg-black/40 z-[3] flex justify-center items-center'>
      <section className='bg-black w-[40rem] px-4 py-2 rounded-xl flex flex-col gap-5 shadow-lg shadow-violet-600'>
        <p>Register Account After Connecting Wallet</p>
        <form className='flex flex-col gap-5'>
          <Input
            value={address && address}
            onChange={() => {}}
            placeholder={'0xA73E601F85d697F88fB0AC4135d1132053904344'}
            label={'Address'}
            elementType={'input'}
            type='text'
            name={'title'}
          />
          <Input
            value={''}
            onChange={() => {}}
            placeholder={'John Doe'}
            label={'Full name'}
            elementType={'input'}
            type='text'
            name={'title'}
          />
          <Input
            value={''}
            onChange={() => {}}
            placeholder={'johndoe'}
            label={'Username'}
            elementType={'input'}
            type='text'
            name={'title'}
          />
          <Input
            value={''}
            onChange={() => {}}
            placeholder={'johndoe@gmail.com'}
            label={'Email'}
            elementType={'input'}
            type='text'
            name={'title'}
          />

          <Input
            value={''}
            onChange={() => {}}
            placeholder={'joe23!eir9ocdsas!@@3213'}
            label={'Password'}
            elementType={'input'}
            type='text'
            name={'title'}
          />

          <Input
            onChange={() => {}}
            styles={
              'file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]'
            }
            label={'Upload Profile'}
            elementType={'file'}
            type='file'
            name={'file'}
          />
        </form>
      </section>
    </main>
  );
};

export default RegisterModal;
