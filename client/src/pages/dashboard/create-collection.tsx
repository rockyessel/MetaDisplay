import React from 'react';
import { Button, Input } from '../../components';
import { generateImageURL } from '../../utils/api-request';
import axios from 'axios';
import { useThirdWebContext } from '../../contexts/thirdweb';

interface Props {}

const CreateCollection = () => {
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    category: '',
  });

  const { AddCollection } = useThirdWebContext();

  const [profileFile, setProfileFile] = React.useState<string | Blob>('');
  const [coverFile, setCoverFile] = React.useState<string | Blob>('');

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { target } = event;
    switch (type) {
      case 'profile':
        if (target.files) {
          const file = target.files[0];
          setProfileFile(file);
        }
        break;
      default:
        if (target.files) {
          const file = target.files[0];
          setCoverFile(file);
        }
        break;
    }
  };

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

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const [profileImage, coverImage] = await Promise.all([
      generateImageURL(profileFile),
      generateImageURL(coverFile),
    ]);

    const formData = {
      _id: profileImage._id,
      title: form.title,
      description: form.description,
      category: form.category,
      date: new Date().toISOString(),
      profile: profileImage.asset_url,
      cover: coverImage.asset_url,
    };

    AddCollection(formData);
  };

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

      <form onSubmit={handleSubmission} className='flex flex-col gap-5'>
        <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-10'>
          <Input
            value={form.title}
            onChange={handleUpdates}
            placeholder={'Onchain: Inspiration'}
            label={'Title'}
            elementType={'input'}
            type='text'
            name={'title'}
          />
          <Input
            value={form.category}
            onChange={handleUpdates}
            placeholder={'Onchain: Inspiration'}
            label={'Category'}
            elementType={'input'}
            type='text'
            name={'category'}
          />
        </div>

        <Input
          value={form.description}
          onChange={handleUpdates}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(event, 'cover')
              }
              label={'Cover'}
              elementType={'file'}
              styles='file'
              name={'cover'}
            />
            <Input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(event, 'profile')
              }
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
