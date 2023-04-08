import { BigNumber } from 'ethers';

export interface FormProps {
  title: string;
  description: string;
  image: string;
  category: string;
  dates: string;
}

export interface AssetsDisplayProps {
  owner: string;
  amountAppreciated: BigNumber;
  apprecation: any[];
  appreciators: Appreciator[];
  title: string;
  description: string;
  image: string;
  category: string;
  dates: string;
  _id: number;
}

export interface UserDataProps {
  address:string;
  username:string,
  name:string;
  token:string;
  email:string;
  profile:string;
}

interface Appreciator {
  amountAppreciated:BigNumber;
  appreciationQuantity:BigNumber;
  appreciator:string;
}