import React from 'react';
import { Button, CircleProgressbar, Input } from '../components';
import {
  UploadAssetRequest,
  UploadAssetRequestDelete,
} from '../utils/api-request';
import { VscListFlat } from 'react-icons/vsc';
import { BiCategoryAlt } from 'react-icons/bi';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useThirdWebContext } from '../contexts/thirdweb';
import { ethers } from 'ethers';

interface Props {}

const UploadAsset = () => {
  const [getImageURL, setGetImageURl] = React.useState<string>('');
  const [assetUploadPercent, setAssetUploadPercent] = React.useState<number>(0);
  const [inputFile, setInputFile] = React.useState<string | Blob>('');

  const { createAssetDisplay } = useThirdWebContext();

  const [form, setForm] = React.useState({
    title: '',
    description: '',
    image: `${!getImageURL ? '' : getImageURL}`,
    category: '',
    dates: ``,
    target: '0.01',
  });

  const handleAssetDelete = async (assetName: string) => {
    const getFileNameFromURL = !assetName ? '' : assetName.split('/').pop();
    await UploadAssetRequestDelete(getFileNameFromURL);
    setInputFile('');
    setAssetUploadPercent(0);
    setGetImageURl('');
  };

  const handleImageUpload = React.useMemo(
    () => async () => {
      if (inputFile) {
        const data = new FormData();
        data.append('file', inputFile);
        const imageURL: string = await UploadAssetRequest({
          data,
          setAssetUploadPercent,
        });
        setGetImageURl(imageURL);
      }
    },
    [inputFile]
  );

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

  const inputFileState =
    inputFile === undefined ? false : inputFile === '' ? true : false;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setInputFile(file);
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    form.image = getImageURL ? getImageURL : '';
    form.dates = new Date().toISOString();
    const { title, description, image } = form;

    console.log('form', form);

    // if (!title || !description || !image) return;
    await createAssetDisplay({
      ...form,
      target: ethers.utils.parseUnits(form.target, 18),
    });
  };

  React.useEffect(() => {
    handleImageUpload();
  }, [handleImageUpload]);

  return (
    <section className='w-full h-full flex flex-col gap-5'>
      <h1 className='font-bold text-4xl text-white'>Upload Assets</h1>
      <section className='w-full h-full flex-col lg:flex-row flex lg:justify-between gap-5'>
        <section className='flex flex-col gap-5'>
          <form
            onSubmit={handleSubmission}
            className='w-full flex flex-col gap-5'
          >
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
              value={form.description}
              onChange={handleUpdates}
              placeholder={'Write asset description...'}
              label={'Description'}
              elementType={'textarea'}
              name={'description'}
            />
            <Input
              value={form.category}
              onChange={handleUpdates}
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

            <Button
              type='submit'
              styles={'bg-[#141414]'}
              title={'Upload Asset'}
            >
              Upload
            </Button>
          </form>
        </section>

        <section className='w-full h-auto relative'>
          <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
            <div className='h-[29rem] flex justify-center items-center overflow-hidden'>
              {inputFileState && (
                <p>
                  <BiCategoryAlt className='text-7xl text-white' />
                </p>
              )}

              {getImageURL !== '' && (
                <img
                  className='w-full  h-full object-cover'
                  src={getImageURL}
                  alt='UploadAssetRequest'
                />
              )}

              {assetUploadPercent === 100 ? (
                <div className='flex flex-col'>
                  {getImageURL ? null : (
                    <>
                      <CircleProgressbar
                        circle_styles='text-green-500'
                        text_styles='text-green-300'
                        percent={assetUploadPercent}
                      />
                      <p className='inline-flex items-center flex-shrink-0 gap-2 px-4 py-2 text-lg'>
                        Upload completed
                      </p>
                    </>
                  )}
                </div>
              ) : assetUploadPercent === 0 && inputFile ? (
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <CgSpinnerTwo className='text-3xl flex-shrink-0 animate-spin text-violet-600' />{' '}
                  Starting...
                </p>
              ) : (
                <div
                  className={`${
                    assetUploadPercent > 0 ? null : 'hidden'
                  } flex flex-col`}
                >
                  <CircleProgressbar
                    circle_styles=''
                    text_styles=''
                    percent={assetUploadPercent}
                  />
                  <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                    Upload in progress...
                  </p>
                </div>
              )}
            </div>

            <div className='w-full flex items-center justify-between px-4 py-2 bg-[#141414]'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl flex-shrink-0' /> Uploaded
                asset will show here.
              </p>
              {getImageURL && (
                <Button
                  type='submit'
                  styles={'bg-rose-800 text-white'}
                  title={'Upload Asset'}
                  handleClick={() => handleAssetDelete(getImageURL)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default UploadAsset;
