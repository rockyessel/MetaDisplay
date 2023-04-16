import React from 'react';
import { Button, Input } from '../../components';

interface Props {}

const CreateCollection = () => {
  return (
    <main className='flex flex-col gap-5'>
      <section className='flex flex-col gap-5'>
        <p className='font-bold text-4xl text-white'>Collections</p>
        <p>
          Create a collection to display all your assets in one place with a
          common category.
        </p>
      </section>

      <section>
        <p className='font-bold text-2xl text-white'>Create now</p>
      </section>

      <form className='flex flex-col gap-5'>
        <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-10'>
          <Input
            value={''}
            onChange={() => {}}
            placeholder={'Onchain: Inspiration'}
            label={'Name'}
            elementType={'input'}
            type='text'
            name={'name'}
          />
          <Input
            value={''}
            onChange={() => {}}
            placeholder={'Onchain: Inspiration'}
            label={'Category'}
            elementType={'input'}
            type='text'
            name={'category'}
          />
        </div>

        <Input
          value={''}
          onChange={() => {}}
          placeholder={'Write your collection description here...'}
          label={'Description'}
          styles='h-40'
          elementType={'textarea'}
          type='text'
          name={'description'}
        />

        <div className='flex flex-col gap-2'>
          <p className='font-bold text-2xl text-white'>
            Choose a cover image and profile for your collection.
          </p>

          <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-10'>
            <Input
              onChange={() => {}}
              label={'Cover'}
              elementType={'file'}
              styles='file'
              name={'cover'}
            />
            <Input
              onChange={() => {}}
              label={'Profile'}
              elementType={'file'}
              name={'profile'}
            />
          </div>
        </div>

        <Button
          type='submit'
          styles={'bg-violet-600 text-white'}
          title={'Upload Asset'}
          //   handleClick={() => handleAssetDelete(getAssetData)}
        >
          Create Collection
        </Button>
      </form>
    </main>
  );
};


export default CreateCollection;