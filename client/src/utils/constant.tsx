import { ethers } from 'ethers';

export const formInitialValue = {
  title: '',
  description: '',
  image: ``,
  category: '',
  dates: ``,
  target: ethers.BigNumber.from(0),
};

export const formDataInitialValue = {
  address: '',
  name: '',
  username: '',
  email: '',
  password: '',
}