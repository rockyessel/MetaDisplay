import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useDisconnect,
} from '@thirdweb-dev/react';
import { BigNumber, ethers } from 'ethers';
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
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { data: assetsDisplay } = useContractRead(contract, 'getAssetsDisplay');
  const { mutateAsync: createAssetDisplay } = useContractWrite(
    contract,
    'createAssetDisplay'
  );
  const { mutateAsync: appreciateAsset, error: appreciateError } =
    useContractWrite(contract, 'appreciateAsset');
  const [getAssets, setGetAsset] = React.useState<AssetsDisplayProps[]>([]);
  const [assetToBeAppreciated, setAssetToBeAppreciated] =
    React.useState<AssetsDisplayProps>(AssetsDisplayDefault);
  const [assetToBeAppreciatedState, setAssetToBeAppreciatedState] =
    React.useState<boolean>(false);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  console.log('getAssets', getAssets);
  console.log('ABIs', contract?.abi);

  const uploadAsset = async (form: FormProps) => {
    try {
      const data = await createAssetDisplay({
        args: [
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
      return data;
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
        amountAppreciated: ethers.utils.formatEther(
          asset.amountAppreciated.toString()
        ),
        appreciation: asset.appreciation,
        appreciators: asset.appreciators,
        title: asset.title,
        description: asset.description,
        image: asset.image,
        category: asset.category,
        date: asset.date,
        _id: asset._id,
      })
    );
    setGetAsset(allAssetsDisplay);
  };

  const getAssetDisplay = async (_id: string): Promise<void> => {
    try {
      if (contract) {
        const data = await contract.call('getAssetDisplay', [
          `0xd972ddb9578dfcb8dad3bf69c0115d1ba9910e722986c2758fb01c8d70718ae8`,
        ]);
        console.log('getAssetDisplay', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAppreciator = async () => {
    if (contract) {
      const data = await contract.call('getAppreciators', [
        `0xd972ddb9578dfcb8dad3bf69c0115d1ba9910e722986c2758fb01c8d70718ae8`,
      ]);
      console.log('getAssetDisplay', data);
    }
  };

  React.useEffect(() => {
    if (contract) getAppreciator();
    if (contract) getAssetsDisplay();
    // sendETH();
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
