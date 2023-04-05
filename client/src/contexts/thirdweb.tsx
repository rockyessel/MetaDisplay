import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const ThirdWebContext = React.createContext({});

const ThirdWebProvider = (props: any) => {
  return (
    <ThirdWebContext.Provider value={{}}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebProvider;
