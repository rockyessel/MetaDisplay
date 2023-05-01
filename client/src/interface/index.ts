import { BigNumber } from 'ethers';

export interface FormProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

export interface AssetsDisplayProps {
  owner: string;
  amountAppreciated: BigNumber;
  appreciation: any[];
  appreciators: Appreciator[];
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  _id: string;
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

export interface AssetUserFromDB {
  email:string;
  profile: string;
  name: string;
  username: string;
  token: string;
  address: string;
  followers: string[] | never[];
  following: string[] | never[];
}