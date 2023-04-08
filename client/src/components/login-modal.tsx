import React from 'react';
import Input from './input';
import { useThirdWebContext } from '../contexts/thirdweb';
import { loginDefaultValue } from '../utils/constant';
import Button from './button';
import Loader from './loader';
import { useUserContext } from '../contexts/user-context';

interface Props extends HTMLInputElement {}

const LoginModal = () => {
  const [formData, setFormData] = React.useState<typeof loginDefaultValue>(loginDefaultValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDisconnected, setIsDisconnected] = React.useState<boolean>(false);
  const { address, disconnect } = useThirdWebContext();
  const { LoginUserWithAddress, userData,userLogState, handleLoginToggle } =
    useUserContext();

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { target } = event;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (address) {
      setIsLoading(true);
      formData.address = address;
      await LoginUserWithAddress(formData);
      setFormData(loginDefaultValue);
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsDisconnected(true);
    setTimeout(() => {
      disconnect();
      setIsDisconnected(false);
    }, 2000);
  };

  return (
    <React.Fragment>
      {address && address.length > 0 && (
        <main className='tx_modal fixed top- left-0 overflow-hidden backdrop-blur-lg bg-black/40 z-[3] flex justify-center items-center'>
          {isLoading ? (
            <section className='bg-black w-full sm:w-[40rem] h-screen sm:h-auto px-4 py-2 rounded-xl flex flex-col gap-5 shadow-lg shadow-violet-600'>
              <Loader
                stateValue={`Fetching account with address: ${
                  address && address.slice(0, 10)
                }...`}
              />
            </section>
          ) : userLogState ? (
            <section className='bg-black  w-[40rem] h-auto  px-4 py-2 rounded-xl flex flex-col gap-5 shadow-lg shadow-violet-600 overflow-hidden'>
              <p className='border-b-[1px] border-gray-600/60 text-xl text-green-500'>
                Account Verified
              </p>
              <p className='w-full'>
                You are the own of the account with address:{' '}
                <span className='w-full text-violet-500 font-bold underline truncate'>
                  {address && address.slice(0, 5)}...
                </span>
              </p>
              <Button
                handleClick={handleLoginToggle}
                type='submit'
                styles={'bg-violet-600'}
                title={'Close'}
              >
                Close
              </Button>
            </section>
          ) : (
            <section className='bg-black w-full sm:w-[40rem] h-screen sm:h-auto px-4 py-2 rounded-xl flex flex-col gap-5 shadow-lg shadow-violet-600 overflow-y-auto'>
              <p className='inline-flex items-center flex-shrink-0 gap-2 px-4 py-2 text-lg'>
                Verify Address
              </p>
              <form onSubmit={handleSubmission} className='flex flex-col gap-5'>
                <Input
                  value={address && address}
                  onChange={handleFormChange}
                  placeholder={'0xA73E601F85d697F88fB0AC4135d1132053904344'}
                  label={'Address'}
                  elementType={'input'}
                  type='text'
                  styles='cursor-not-allowed'
                  name={'address'}
                  disabled={true}
                />

                <Input
                  value={formData.username}
                  onChange={handleFormChange}
                  placeholder={'johndoe'}
                  label={'Username'}
                  elementType={'input'}
                  type='text'
                  name={'username'}
                />
                <Input
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder={'joe23!eir!@@3213'}
                  label={'Password'}
                  elementType={'input'}
                  type='text'
                  name={'password'}
                />
                <Button
                  type='submit'
                  styles={'bg-[#141414]'}
                  title={'Register'}
                >
                  Verify
                </Button>
                <Button
                  type='button'
                  styles={'bg-violet-600'}
                  title={'Register'}
                  handleClick={handleDisconnect}
                >
                  {isDisconnected ? (
                    <Loader
                      styles='w-full flex-row justify-center items-center'
                      stateValue={`Disconnecting`}
                      iconStyles='text-2xl'
                    />
                  ) : (
                    'Disconnect Wallet'
                  )}
                </Button>
              </form>
            </section>
          )}
        </main>
      )}
    </React.Fragment>
  );
};

export default LoginModal;
