import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FormProps } from '../interface';

interface ContextProps {
  address?: string | undefined;
  connect?: (
    connectOptions?: { chainId?: number | undefined } | undefined
  ) => Promise<void>;
  uploadAsset: (form: FormProps) => Promise<void>;
}

const ThirdWebContext = React.createContext<ContextProps>({
  address: undefined,
  connect: (connectOptions: { chainId?: number | undefined } | undefined) =>
    Promise.resolve(),
  uploadAsset: (form: FormProps) => Promise.resolve(),
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { mutateAsync: createAssetDisplay } = useContractWrite(
    contract,
    'createAssetDisplay'
  );

  const address = useAddress();
  const connect = useMetamask();

  console.log('address', address);

  const uploadAsset = async (form: FormProps) => {
    console.log('uploadAsset', form);
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

  const value = {
    address,
    connect,
    uploadAsset,
  };
  return (
    <ThirdWebContext.Provider value={value}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebContextProvider;

export const useThirdWebContext = () => React.useContext(ThirdWebContext);
