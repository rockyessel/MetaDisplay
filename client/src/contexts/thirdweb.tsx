import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { AssetsDisplayProps, FormProps } from '../interface';

interface ContextProps {
  address?: string | undefined;
  connect?: (
    connectOptions?: { chainId?: number | undefined } | undefined
  ) => Promise<void>;
  uploadAsset: (form: FormProps) => Promise<void>;
  getAssets: AssetsDisplayProps[];
}

const ThirdWebContext = React.createContext<ContextProps>({
  address: undefined,
  connect: (connectOptions: { chainId?: number | undefined } | undefined) =>
    Promise.resolve(),
  uploadAsset: (form: FormProps) => Promise.resolve(),
  getAssets: [],
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { data: assetsDisplay } = useContractRead(contract, 'getAssetsDisplay');
  const { mutateAsync: createAssetDisplay } = useContractWrite(
    contract,
    'createAssetDisplay'
  );
  const [getAssets, setGetAsset] = React.useState<AssetsDisplayProps[]>([]);

  const address = useAddress();
  const connect = useMetamask();

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
          form.target.toHexString(),
        ],
      });
      console.log('contract call success', data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getAssetsDisplay = async (): Promise<void> => {
      console.log('assetsDisplay', assetsDisplay);
      const allAssetsDisplay: AssetsDisplayProps[] = assetsDisplay.map(
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
          target: ethers.utils.formatEther(asset.target.toString()),
          _id: index,
        })
      );
      setGetAsset(allAssetsDisplay);
    };
    getAssetsDisplay();
  }, [assetsDisplay]);

  const value = {
    address,
    connect,
    uploadAsset,
    getAssets,
  };
  return (
    <ThirdWebContext.Provider value={value}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebContextProvider;

export const useThirdWebContext = () => React.useContext(ThirdWebContext);
