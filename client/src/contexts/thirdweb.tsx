import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

interface ContextProps {
  address?: string | undefined;
  connect?: (
    connectOptions?: { chainId?: number | undefined } | undefined
  ) => Promise<void>;
  createAssetDisplay: (form: any) => Promise<void>;
}

const ThirdWebContext = React.createContext<ContextProps>({
  address: undefined,
  connect: (connectOptions: { chainId: 0 | undefined } | undefined) =>
    Promise.resolve(),
  createAssetDisplay: (form: any) => Promise.resolve(),
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { mutateAsync } = useContractWrite(contract, 'createAssetDisplay');

  const address = useAddress();
  const connect = useMetamask();

  console.log('address', address);

  const createAssetDisplay = async (form: any) => {
    console.log('createAssetDisplay', form);
    try {
      const data = await mutateAsync([
        address,
        form.title,
        form.description,
        form.image,
        form.category,
        form.dates,
        form.target,
      ]);

      console.log('contract call success', data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    address,
    connect,
    createAssetDisplay,
  };
  return (
    <ThirdWebContext.Provider value={value}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebContextProvider;

export const useThirdWebContext = () => React.useContext(ThirdWebContext);
