import React from 'react';
import Input from './input';
import { useThirdWebContext } from '../contexts/thirdweb';
import { formDataInitialValue } from '../utils/constant';
import Button from './button';
import { RegisterUser } from '../utils/api-request';

interface Props extends HTMLInputElement {}

const RegisterModal = () => {
  const [formData, setFormData] =
    React.useState<typeof formDataInitialValue>(formDataInitialValue);
  const [inputFile, setInputFile] = React.useState<string | Blob>('');
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

  const handleFileChange = (event: any) => {
    const { target } = event;
    if (target.files) {
      const file = target.files[0];
      setInputFile(file);
    }
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { name, username, email, password } = formData;
    const formData_ = new FormData();
    formData_.append('file', inputFile);
    formData_.append('name', name);
    formData_.append('username', username);
    formData_.append('email', email);
    formData_.append('password', password);
    await RegisterUser(formData_);
  };

  return (
    <React.Fragment>
      {address && address.length > 0 && (
        <main className='tx_modal fixed top- left-0 overflow-hidden backdrop-blur-lg bg-black/40 z-[3] flex justify-center items-center'>
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
                name={'address'}
              />
              <Input
                value={formData.name}
                onChange={handleFormChange}
                placeholder={'John Doe'}
                label={'Full name'}
                elementType={'input'}
                type='text'
                name={'name'}
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
                value={formData.email}
                onChange={handleFormChange}
                placeholder={'johndoe@gmail.com'}
                label={'Email'}
                elementType={'input'}
                type='text'
                name={'email'}
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

              <Input
                onChange={handleFileChange}
                styles={
                  'file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]'
                }
                label={'Upload Profile'}
                elementType={'file'}
                type='file'
                name={'file'}
              />
              <Button type='submit' styles={'bg-[#141414]'} title={'Register'}>
                Upload
              </Button>
            </form>
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export default RegisterModal;
