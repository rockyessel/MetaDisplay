import React from 'react';
import { useLocation } from 'react-router-dom';
import Input from './input';
import Button from './button';
import { useThirdWebContext } from '../contexts/thirdweb';
import { AssetsDisplayDefault } from '../utils/constant';
import { ethers } from 'ethers';

interface appreciateProps {
  assetId: number;
  amount: ethers.BigNumber;
}

const AppreciateAssetModal = () => {
  const location = useLocation();
  const { assetToBeAppreciated, handleAddAsset, userAppreciation } =
    useThirdWebContext();
  const [appreciate, setAppreciate] = React.useState<string>('');
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      amount: ethers.BigNumber.from(Number(appreciate)),
      _id: assetToBeAppreciated?._id,
    };
    await userAppreciation(data);
    handleAddAsset(AssetsDisplayDefault);
    setLoading(false);
  };

  console.log('appreciate', appreciate);
  console.log('type', typeof appreciate);

  return (
    <main className='tx_modal fixed first-letter top-0 left-0 overflow-hidden px-10 backdrop-blur-lg bg-black/40 z-[3] flex justify-center items-center'>
      <form
        onSubmit={handleSubmission}
        className='flex flex-col justify-center items-center gap-1 bg-black py-5 px-4 rounded-md shadow-lg shadow-violet-500'
      >
        <div className='w-full my-[20px] p-4 bg-[#141414] rounded-[10px]'>
          <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-violet-400'>
            Asset Appreciation
          </h4>
          <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-gray-500'>
            No amount is small, so support this creator so they know you care.
          </p>
        </div>
        <Input
          value={appreciate}
          onChange={(event) => setAppreciate(event.target.value)}
          placeholder={'0.0001 ETH'}
          label={'Appreciation the asset'}
          elementType={'input'}
          type='number'
          step={'0.0001'}
          name={'name'}
        />
        <Button
          type='submit'
          styles={'bg-[#141414] w-full mt-4'}
          title={'Register'}
        >
          Appreciate
        </Button>
        <Button
          type='submit'
          handleClick={() => handleAddAsset(AssetsDisplayDefault)}
          styles={'hover:bg-rose-500 bg-[#141414] w-full'}
          title={'Register'}
        >
          Close
        </Button>
      </form>
    </main>
  );
};

export default AppreciateAssetModal;
