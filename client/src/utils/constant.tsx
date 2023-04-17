import { ethers } from 'ethers';

export const formInitialValue = {
  _id: '',
  title: '',
  description: '',
  image: ``,
  category: '',
  date: ``,
};

export const formDataInitialValue = {
  address: '',
  name: '',
  username: '',
  email: '',
  password: '',
};

export const loginDefaultValue = {
  address: '',
  username: '',
  password: '',
}


export const userDataDefault = {
  address: '',
  username: '',
  name: '',
  token: '',
  email: '',
  profile: '',
}

export const AssetsDisplayDefault = {
  owner: '',
  amountAppreciated: ethers.BigNumber.from(0),
  appreciation: [],
  appreciators: [],
  title: '',
  description: '',
  image: '',
  category: '',
  date: '',
  _id: '',
};

export const AssetDetailsDefault = {
  found: {
    views: 0,
    saves: [],
    _id: '',
    asset_url: '',
  },
  success: false,
};