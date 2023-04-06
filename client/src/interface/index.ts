import { BigNumber } from 'ethers';

export interface FormProps {
  title: string;
  description: string;
  image: string;
  category: string;
  dates: string;
  target: BigNumber;
}
