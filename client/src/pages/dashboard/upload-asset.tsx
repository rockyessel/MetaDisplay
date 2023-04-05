import React from 'react';
import { Button, Input } from '../../components';

interface Props {}

const UploadAsset = () => {
  const [inputFile, setInputFile] = React.useState<File>();
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    target: '',
    dates: `${new Date().toISOString()}`,
    image: '',
    category: '',
  });

  console.log('form', form);
  console.log('inputFile', inputFile);

  const handleUpdates = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(formState);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setInputFile(file);
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  React.useEffect(()=>{},[])

  return (
    <section className='w-full h-full flex flex-col gap-5'>
      <h1 className='font-bold text-4xl text-white'>Upload Assets</h1>

      <form onSubmit={handleSubmission} className='w-full flex flex-col gap-5'>
        <Input
          value={form.title}
          onChange={(
            event:
              | React.ChangeEvent<HTMLInputElement>
              | React.ChangeEvent<HTMLTextAreaElement>
          ) => handleUpdates(event)}
          placeholder={'Onchain: Inspiration'}
          label={'Title'}
          elementType={'input'}
          type='text'
          name={'title'}
        />
        <Input
          value={form.description}
          onChange={(
            event:
              | React.ChangeEvent<HTMLInputElement>
              | React.ChangeEvent<HTMLTextAreaElement>
          ) => handleUpdates}
          placeholder={'Write asset description...'}
          label={'Description'}
          elementType={'textarea'}
          name={'description'}
        />
        <Input
          value={form.category}
          onChange={(
            event:
              | React.ChangeEvent<HTMLInputElement>
              | React.ChangeEvent<HTMLTextAreaElement>
          ) => handleUpdates(event)}
          placeholder={'Music...'}
          label={'Category'}
          elementType={'input'}
          type='text'
          name={'category'}
        />
        <Input
          onChange={(event: any) => handleFileChange(event)}
          label={'Asset File'}
          elementType={'file'}
          styles='file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]'
          name={'file'}
        />

        <Button type='submit' styles={'bg-[#141414]'} title={'Upload Asset'}>
          Upload
        </Button>
      </form>
    </section>
  );
};

export default UploadAsset;
