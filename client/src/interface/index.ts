import { BigNumber } from 'ethers';

export interface FormProps {
  title: string;
  description: string;
  image: string;
  category: string;
  dates: string;
  target: BigNumber;
}

export interface AssetsDisplayProps {
  owner:string
  amountAppreciated: BigNumber;
  apprecation: any[];
  appreciators: any[];
  title: string;
  description: string;
  image: string;
  category: string;
  dates: string;
  target: BigNumber;
  _id: number;
}
