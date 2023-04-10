import React from 'react';
import { useLocation } from 'react-router-dom';
import Input from './input';
import Button from './button';
import { useThirdWebContext } from '../contexts/thirdweb';
import { AssetsDisplayDefault } from '../utils/constant';
import { ethers } from 'ethers';
import Loader from './loader';

interface appreciateProps {
  assetId: number;
  amount: ethers.BigNumber;
}

const AppreciateAssetModal = () => {
  const location = useLocation();
  const { assetToBeAppreciated, handleAddAsset, userAppreciation } =
    useThirdWebContext();
  const [appreciate, setAppreciate] = React.useState<string>('');
  const [appreciateStateValue, setAppreciateStateValue] =
    React.useState<string>('Appreciate');
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSuccess, setLoadingIsSuccess] = React.useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    setButtonDisable(true);
    const data = {
      address: assetToBeAppreciated?.owner,
      _id: assetToBeAppreciated?._id,
      amount: appreciate,
    };

    const receipt = await userAppreciation(data);

    console.log('receipt', receipt);

    if (receipt.state) {
      setError(true);
      setLoading(false);
      setAppreciateStateValue(`${receipt.error}`);
      setTitle(`${receipt.error}`);
      const time = setTimeout(() => {
        setTitle('Appreciate');
        setAppreciateStateValue('Appreciate');
        setButtonDisable(false);
        setError(false);
        handleAddAsset(AssetsDisplayDefault);
      }, 10000);

      return () => clearTimeout(time);
    }

    if (receipt.receipt.confirmations === 1) {
      setLoading(false);
      setLoadingIsSuccess(true);
      setAppreciateStateValue(`Asset appreciated successfully`);
      setTitle(`Asset appreciated successfully`);
      const time = setTimeout(() => {
        handleAddAsset(AssetsDisplayDefault);
      }, 2000);
      return () => clearTimeout(time);
    }

  };

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
          styles={`${
            buttonDisable
              ? isSuccess === true
                ? 'bg-green-500 text-[#141414]'
                : error === true
                ? 'bg-rose-400'
                : 'bg-violet-400 cursor-not-allowed text-black'
              : 'bg-[#141414]'
          } w-full mt-4`}
          title={title}
          disabled={buttonDisable}
        >
          {isLoading ? (
            <Loader iconStyles='text-2xl' stateValue='Appreciating...' />
          ) : (
            appreciateStateValue
          )}
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
