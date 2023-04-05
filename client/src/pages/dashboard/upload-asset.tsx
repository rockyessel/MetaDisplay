import React from 'react';
import { Button, Input } from '../../components';
import { UploadAssetRequest } from '../../utils/api-request';

interface Props {}

const UploadAsset = () => {
  const [getImageURL, setGetImageURl] = React.useState<string>();
  const [inputFile, setInputFile] = React.useState<string | Blob>('');
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    target: '',
    dates: `${new Date().toISOString()}`,
    image: `${!getImageURL ? '' : getImageURL}`,
    category: '',
  });

  console.log('getImageURL', getImageURL);

  const handleImageUpload = async () => {
    if (inputFile) {
      const data = new FormData();
      data.append('file', inputFile);
      const imageURL: string = await UploadAssetRequest(data);
      setGetImageURl(imageURL);
    }
  };

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

  React.useEffect(() => {
    handleImageUpload();
  }, [inputFile]);

  return (
    <section className='w-full h-full flex md:flex-col gap-5'>
      <section>
        <h1 className='font-bold text-4xl text-white'>Upload Assets</h1>

        <form
          onSubmit={handleSubmission}
          className='w-full flex flex-col gap-5'
        >
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
      <section className='flex-1 w-full h-auto relative'>
        {getImageURL && (
          <React.Fragment>
          <img
            className='lg:w-[35rem] xl:w-full h-[35rem] object-cover'
            src={getImageURL}
            alt='UploadAssetRequest'
            />
            <span>Delete</span>
            </React.Fragment>
        )}
      </section>
    </section>
  );
};

export default UploadAsset;
