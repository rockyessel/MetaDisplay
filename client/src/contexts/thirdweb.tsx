import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useDisconnect,
  SmartContract,
} from '@thirdweb-dev/react';
import { BigNumber, ethers, utils } from 'ethers';
import { AssetsDisplayProps, FormProps } from '../interface';
import { AssetsDisplayDefault } from '../utils/constant';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
// import Web3 from 'web3';

interface ContextProps {
  address?: string | undefined;
  connect?: (
    connectOptions?: { chainId?: number | undefined } | undefined
  ) => Promise<void>;
  disconnect: () => Promise<void>;
  uploadAsset: (form: FormProps) => Promise<void>;
  getAssets: AssetsDisplayProps[];
  handleAddAsset: (asset: AssetsDisplayProps) => void;
  assetToBeAppreciated?: AssetsDisplayProps;
  assetToBeAppreciatedState: boolean;
  userAppreciation: (appreciateData: any) => Promise<any>;
  getAppreciators: (_id: string) => Promise<any>;
  getAssetDisplay: (_id: string) => Promise<any>;
  contract: SmartContract<ethers.BaseContract> | undefined;
}

const ThirdWebContext = React.createContext<ContextProps>({
  address: undefined,
  connect: (connectOptions: { chainId?: number | undefined } | undefined) =>
    Promise.resolve(),
  disconnect: () => Promise.resolve(),
  uploadAsset: (form: FormProps) => Promise.resolve(),
  getAssets: [],
  handleAddAsset: (asset: AssetsDisplayProps) => {},
  assetToBeAppreciated: AssetsDisplayDefault,
  assetToBeAppreciatedState: false,
  userAppreciation: (appreciateData: any) => Promise.resolve(),
  getAppreciators: (_id: string) => Promise.resolve(),
  getAssetDisplay: (_id: string) => Promise.resolve(),
  contract: undefined,
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { data: assetsDisplay } = useContractRead(contract, 'getAllAssets');
  const { mutateAsync: createAssetDisplay } = useContractWrite(contract, 'createAsset');
  const { mutateAsync: appreciateAsset, error: appreciateError } = useContractWrite(contract, 'appreciateAssetById');
  const [getAssets, setGetAsset] = React.useState<AssetsDisplayProps[]>([]);
  const [assetToBeAppreciated, setAssetToBeAppreciated] =
    React.useState<AssetsDisplayProps>(AssetsDisplayDefault);
  const [assetToBeAppreciatedState, setAssetToBeAppreciatedState] =
    React.useState<boolean>(false);
  const [arrAppreciators, setArrAppreciators] = React.useState<any[]>([]);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  // console.log('getAssets', getAssets);
  // console.log('ABIs', contract?.abi);

  const uploadAsset = async (form: FormProps) => {
    try {
      const data = await createAssetDisplay({
        args: [
          form._id,
          address,
          form.title,
          form.description,
          form.image,
          form.category,
          form.date,
        ],
        overrides: { value: ethers.utils.parseEther('0.0005') }, // send 0.1 ether with the contract call
      });
      console.log('contract call success', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAsset = (asset: AssetsDisplayProps) => {
    setAssetToBeAppreciatedState((prev) => !prev);
    setAssetToBeAppreciated(asset);
  };

  const userAppreciation = async (appreciateData: any) => {
    try {
      const amount = ethers.utils.parseEther(appreciateData.amount).toString();
      const data = await appreciateAsset({
        args: [appreciateData.address, appreciateData._id],
        overrides: { value: amount },
      });
      return { success: true, data };
    } catch (error) {
      console.log(error);
      return {
        error: 'User rejected transaction',
        state: true,
        error_obj: error,
      };
    }
  };

  const getAssetsDisplay = async (): Promise<void> => {
    const allAssetsDisplay: AssetsDisplayProps[] = assetsDisplay?.map(
      (asset: AssetsDisplayProps) => ({
        owner: asset.owner,
        appreciators: asset.appreciators,
        title: asset.title,
        description: asset.description,
        image: asset.image,
        category: asset.category,
        date: asset.date,
        _id: asset._id,
      })
    );

    console.log('allAssetsDisplay', allAssetsDisplay);
    setGetAsset(allAssetsDisplay);
  };

  const getAssetDisplay = async (_id: string): Promise<void> => {
    try {
      if (contract) {
        const data = await contract.call('getAsset', [`${_id}`]);
        // console.log('getAssetDisplay', data);

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAppreciators = async (_id: string) => {
    try {
      if (contract) {
        const data = await contract.call('getAppreciatorsByAssetId', [`${_id}`]);

        const appreciators: any = data?.map((data: any) => ({
          appreciator: data.appreciator,
          appreciationQuantity: ethers.utils.formatEther(
            data.appreciationQuantity.toString()
          ),
          amountAppreciated: ethers.utils.formatEther(
            data.amountAppreciated.toString()
          ),
        }));

        setArrAppreciators(appreciators);
        console.log('appreciators', appreciators);

        return appreciators;
      }
    } catch (error) {
      console.log('getAppreciators from ThirdWebContext', error);
      return error;
    }
  };

  React.useEffect(() => {
    if (contract) getAssetsDisplay();
  }, [assetsDisplay]);

  const value = {
    address,
    connect,
    uploadAsset,
    getAssets,
    disconnect,
    handleAddAsset,
    assetToBeAppreciated,
    assetToBeAppreciatedState,
    userAppreciation,
    getAppreciators,
    getAssetDisplay,
    contract,
  };
  return (
    <ThirdWebContext.Provider value={value}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebContextProvider;

export const useThirdWebContext = () => React.useContext(ThirdWebContext);
// https://thirdweb.com/sepolia/0x08b84eF132dB542802CE2c80C8051FF7Fdf1B668/explorer
// https://thirdweb.com/sepolia
