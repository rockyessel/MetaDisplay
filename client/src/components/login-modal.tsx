import React from 'react';
import Input from './input';
import { useThirdWebContext } from '../contexts/thirdweb';
import { loginDefaultValue } from '../utils/constant';
import Button from './button';
import { RegisterUser } from '../utils/api-request';
import Loader from './loader';

interface Props extends HTMLInputElement {}

const LoginModal = () => {
  const [formData, setFormData] =
    React.useState<typeof loginDefaultValue>(loginDefaultValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { address } = useThirdWebContext();

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
      const {  username, password } = formData;
      await RegisterUser(formData);
      setFormData(loginDefaultValue);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {address && address.length > 0 && (
        <main className='tx_modal fixed top- left-0 overflow-hidden backdrop-blur-lg bg-black/40 z-[3] flex justify-center items-center'>
          {isLoading ? (
            <Loader
              stateValue={`Registering to address:${address && address}`}
            />
          ) : (
            <section className='bg-black w-full sm:w-[40rem] h-screen sm:h-auto px-4 py-2 rounded-xl flex flex-col gap-5 shadow-lg shadow-violet-600 overflow-y-auto'>
              <p>Register Account After Connecting Wallet</p>
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
                  Upload
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
