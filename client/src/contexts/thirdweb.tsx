import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useDisconnect,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { AssetsDisplayProps, FormProps } from '../interface';
import { AssetsDisplayDefault } from '../utils/constant';

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
  userAppreciation: (appreciateData: any) => void;
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
  userAppreciation: (appreciateData: any) => {},
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { data: assetsDisplay } = useContractRead(contract, 'getAssetsDisplay');
  const { mutateAsync: createAssetDisplay } = useContractWrite(
    contract,
    'createAssetDisplay'
  );
  const { mutateAsync: appreciateAsset } = useContractWrite(
    contract,
    'appreciateAsset'
  );
  const [getAssets, setGetAsset] = React.useState<AssetsDisplayProps[]>([]);
  const [assetToBeAppreciated, setAssetToBeAppreciated] =
    React.useState<AssetsDisplayProps>(AssetsDisplayDefault);
  const [assetToBeAppreciatedState, setAssetToBeAppreciatedState] =
    React.useState<boolean>(false);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const uploadAsset = async (form: FormProps) => {
    try {
      const data = await createAssetDisplay({
        args: [
          address,
          form.title,
          form.description,
          form.image,
          form.category,
          form.dates,
        ],
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
      console.log('appreciateData', appreciateData);
      const data = await appreciateAsset({
        args: [`${appreciateData._id}`],
      });
      console.log('Asset appreciated', data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssetsDisplay = async (): Promise<void> => {
    const allAssetsDisplay: AssetsDisplayProps[] = assetsDisplay?.map(
      (asset: AssetsDisplayProps, index: number) => ({
        owner: asset.owner,
        amountAppreciated: ethers.utils.formatEther(
          asset.amountAppreciated.toString()
        ),
        appreciation: asset.apprecation,
        appreciators: asset.appreciators,
        title: asset.title,
        description: asset.description,
        image: asset.image,
        category: asset.category,
        date: asset.dates,
        _id: index,
      })
    );
    setGetAsset(allAssetsDisplay);
  };

  const getAppreciator = async () => {
    const data = await contract?.call('getAppreciators', ['0']);

    // console.log('appreciators', data);
  };

  React.useEffect(() => {
    if (contract) getAppreciator();
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