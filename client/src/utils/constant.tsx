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



export const AssetUserFromDBDefault = {
  address: '',
  username: '',
  name: '',
  token: '',
  email: '',
  profile: '',
  followers: [],
  following: []
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

export const defaultMetaData = {
  description: `description`,
  title: `title`,
  image: `image`,
  alt: 'alt',
  keywords: 'keywords',
  type: `type`,
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author_name: 'Rocky Essel',
  MIME: 'png',
};
