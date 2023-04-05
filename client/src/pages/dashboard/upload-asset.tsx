import React from 'react';
import { Input } from '../../components';

interface Props {}

const UploadAsset = () => {
  return (
    <section className='w-full h-full flex flex-col gap-5'>
      <h1 className='font-bold text-4xl text-white'>Upload Assets</h1>

      <form className='w-full flex flex-col gap-5'>
        <Input
          value={''}
          onChange={() => {}}
          placeholder={'Onchain: Inspiration'}
          label={'Title'}
          elementType={'input'}
          type='text'
        />
        <Input
          value={''}
          onChange={() => {}}
          placeholder={'Write asset description...'}
          label={'Description'}
          elementType={'textarea'}
        />
        <Input
          value={''}
          onChange={() => {}}
          label={'Asset File'}
          elementType={'file'}
          styles='file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]'
        />
        <Input
          value={''}
          onChange={() => {}}
          placeholder={'Music...'}
          label={'Category'}
          elementType={'input'}
          type='text'
        />
      </form>
    </section>
  );
};

export default UploadAsset;
