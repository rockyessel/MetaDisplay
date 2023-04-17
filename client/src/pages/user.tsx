import React from 'react';
import { Button, Input } from '../components';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const User = () => {
  const [userDetails, setUserDetails] = React.useState({
    address: '',
    name: '',
    username: '',
    email: '',
  });

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  return (
    <main className='flex flex-col gap-4'>
      <p className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
        Account Details
      </p>

      <section className='flex flex-col gap-10'>
        <div className='flex flex-col gap-5'>
          <p className='font-bold text-xl text-white'>User</p>
          <form className='flex flex-col gap-3'>
            <Input
              value={userDetails.address}
              onChange={() => {}}
              placeholder={'Onchain: Inspiration'}
              label={'Address'}
              elementType={'input'}
              type='text'
              name={'address'}
              styles='cursor-not-allowed'
              disabled={true}
            />

            <div className='flex items-center gap-5'>
              <Input
                value={userDetails?.name}
                onChange={() => {}}
                placeholder={'John Doe'}
                label={'Name'}
                elementType={'input'}
                type='text'
                name={'name'}
                styles='cursor-not-allowed'
                disabled={true}
              />
              <Input
                value={userDetails?.username}
                onChange={() => {}}
                placeholder={'john_doe'}
                label={'Username'}
                elementType={'input'}
                type='text'
                name={'username'}
                styles='cursor-not-allowed'
                disabled={true}
              />
            </div>
            <Input
              value={userDetails?.email}
              onChange={() => {}}
              placeholder={'example@company.com'}
              label={'Email'}
              elementType={'input'}
              type='text'
              name={'email'}
              styles='cursor-not-allowed'
              disabled={true}
            />

            <Button
              type='submit'
              styles={'text-white w-full bg-violet-700 cursor-not-allowed'}
              title={'Save changes'}
              handleClick={() => {}}
              disabled={true}
            >
              Save changes
            </Button>
          </form>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='font-bold text-xl text-white underline underline-offset-8 decoration-violet-700'>
            Website & Socials
          </p>
          <form className='flex flex-col gap-3'>
            <Input
              value={''}
              onChange={() => {}}
              placeholder={'https://marketplace.com'}
              label={'Website URL'}
              elementType={'input'}
              type='text'
              name={'website'}
            />

            <div className='flex items-center gap-5'>
              <Input
                value={''}
                onChange={() => {}}
                placeholder={'@john_doe_fb'}
                label={'Facebook'}
                elementType={'input'}
                type='text'
                name={'facebook'}
              />
              <Input
                value={''}
                onChange={() => {}}
                placeholder={'@john_doe_tt'}
                label={'Twitter'}
                elementType={'input'}
                type='text'
                name={'twitter'}
              />
            </div>

            <Input
              value={''}
              onChange={() => {}}
              placeholder={'@john_doe_ig'}
              label={'Instagram'}
              elementType={'input'}
              type='text'
              name={'instagram'}
            />

            <Button
              type='submit'
              styles={'text-white w-full bg-violet-700'}
              title={'Save changes'}
              handleClick={() => {}}
            >
              Save changes
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default User;
