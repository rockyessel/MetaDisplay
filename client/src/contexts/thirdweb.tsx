  
import React from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useDisconnect,
  SmartContract,
} from '@thirdweb-dev/react';
import { ethers, utils,BigNumber } from 'ethers';
import { AssetsDisplayProps, FormProps } from '../interface';
import { AssetsDisplayDefault } from '../utils/constant';
import { Appreciation, summarizeAppreciations } from '../utils/services';


interface ContextProps {
  address?: string | undefined;
  connect?: (
    connectOptions?: { chainId?: number | undefined } | undefined
  ) => Promise<void>;
  disconnect: () => Promise<void>;
  uploadAsset: (form: FormProps) => Promise<void>;
  getAssets: AssetsDisplayProps[];
  handleAddAsset: (asset: AssetsDisplayProps) => void;
  assetToBeAppreciated?: AssetsDisplayProps;
  assetToBeAppreciatedState: boolean;
  userAppreciation: (appreciateData: any) => Promise<any>;
  getAppreciators: (_id: string) => Promise<any>;
  getAssetDisplay: (_id: string) => Promise<any>;
  contract: SmartContract<ethers.BaseContract> | undefined;
  getAssetWithId: (_id: string) => Promise<any>;
  AddCollection: (form: any) => Promise<void>;
  AddAssetToCollection: (form: any) => Promise<void>;
  collections: any[];
  allAppreciators: Appreciation[];
  loadingAssets: boolean;
  loadingCollection: boolean;
}

const ThirdWebContext = React.createContext<ContextProps>({
  address: undefined,
  connect: (connectOptions: { chainId?: number | undefined } | undefined) =>
    Promise.resolve(),
  disconnect: () => Promise.resolve(),
  uploadAsset: (form: FormProps) => Promise.resolve(),
  getAssets: [],
  handleAddAsset: (asset: AssetsDisplayProps) => {},
  assetToBeAppreciated: AssetsDisplayDefault,
  assetToBeAppreciatedState: false,
  userAppreciation: (appreciateData: any) => Promise.resolve(),
  getAppreciators: (_id: string) => Promise.resolve(),
  getAssetDisplay: (_id: string) => Promise.resolve(),
  contract: undefined,
  getAssetWithId: (_id: string) => Promise.resolve(),
  AddCollection: (form: any) => Promise.resolve(),
  AddAssetToCollection: (form: any) => Promise.resolve(),
  collections: [],
  allAppreciators: [],
  loadingAssets: true,
  loadingCollection: true,
});

export const ThirdWebContextProvider = (props: any) => {
  const { contract } = useContract(`${process.env.VITE_META_DISPLAY_WALLET}`);
  const { data: assetsDisplay } = useContractRead(contract, 'getAllAssets');
  const { data: getAllCollections } = useContractRead(contract, 'getAllCollections');
  const { data: getAllAppreciators } = useContractRead(contract, 'getAllAppreciators');
  const { mutateAsync: createAssetDisplay } = useContractWrite(contract, 'createAsset');
  const { mutateAsync: createCollection } = useContractWrite(contract, 'createCollection');
  const { mutateAsync: appreciateAsset } = useContractWrite(contract, 'appreciateAssetById');
  const { mutateAsync: addAssetToCollection } = useContractWrite(contract, 'addAssetToCollection');
  const [getAssets, setGetAsset] = React.useState<AssetsDisplayProps[]>([]);
  const [assetToBeAppreciated, setAssetToBeAppreciated] = React.useState<AssetsDisplayProps>(AssetsDisplayDefault);
  const [assetToBeAppreciatedState, setAssetToBeAppreciatedState] = React.useState<boolean>(false);
  const [arrAppreciators, setArrAppreciators] = React.useState<any[]>([]);
  const [collections, setCollections] = React.useState<any[]>([]);
  const [allAppreciators, setAllAppreciators] = React.useState<any[]>([]);
  const [loadingAssets, setLoadingAssets] = React.useState<boolean>(true);
  const [loadingCollection, setLoadingCollection] = React.useState<boolean>(true);

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();


  const uploadAsset = async (form: FormProps) => {
    try {
       await createAssetDisplay({
        args: [
          form._id,
          form.title,
          form.description,
          form.image,
          form.category,
          form.date,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAsset = (asset: AssetsDisplayProps) => {
    setAssetToBeAppreciatedState((prev) => !prev);
    setAssetToBeAppreciated(asset);
  };

  const userAppreciation = async (appreciateData: any) => {
    try {
      const amount = ethers.utils.parseEther(appreciateData.amount).toString();
      const data = await appreciateAsset({
        args: [appreciateData.address, appreciateData._id],
        overrides: { value: amount },
      });
      return data 
    } catch (error) {
      console.log(error);
      return {
        error: 'User rejected transaction',
        state: true,
        error_obj: error,
      };
    }
  };

  const getAssetsDisplay = async (): Promise<void> => {
    const allAssetsDisplay: AssetsDisplayProps[] = assetsDisplay?.map(
      (asset: AssetsDisplayProps) => ({
        owner: asset.owner,
        appreciators: asset.appreciators,
        title: asset.title,
        description: asset.description,
        image: asset.image,
        category: asset.category,
        date: asset.date,
        _id: asset._id,
      })
    );

    setGetAsset(allAssetsDisplay);
    setLoadingAssets(false)
  };

  const getAssetDisplay = async (_id: string): Promise<void> => {
    try {
      if (contract) {
        const data = await contract.call('getAsset', [`${_id}`]);

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddCollection = async (form: any) => {

    const data = await createCollection({
      args: [
        form._id,
        address,
        form.profile,
        form.cover,
        form.title,
        form.description,
        form.date,
        form.category,
      ],
    });

  }

    const AddAssetToCollection = async (form: any) => {

      console.log('AddAssetToCollection Context:', form);
      const data = await addAssetToCollection({
        args: [form.collectionId, form.assetId],
      });

      // console.log('Asset added to collection successfully', data);
    };

  const getAllCollection = async () => {
    setCollections(getAllCollections);
    setLoadingCollection(false)
  }

  const getEveryAppreciators =  () => {
    const appreciators = getAllAppreciators?.map((appreciator:Appreciation) => ({
      appreciator: appreciator?.appreciator,
      amountAppreciated: ethers.utils.formatEther(appreciator?.amountAppreciated.toString()),
      appreciationQuantity: appreciator?.appreciationQuantity
    }) )
    const data = summarizeAppreciations(appreciators);
    setAllAppreciators(data);
  }


  const getAssetWithId = async (_id: string) => {
    const data = await contract?.call('getAssetById', [`${_id}`]);


    const asset = {
      owner: data?.owner,
      appreciators: data?.appreciators,
      title: data?.title,
      description: data?.description,
      image: data?.image,
      category: data?.category,
      date: data?.date,
      _id: data?._id,
    };

    return asset;
  };

  const getAppreciators = async (_id: string) => {
    try {
      if (contract) {
        const data = await contract.call('getAppreciatorsByAssetId', [
          `${_id}`,
        ]);

        const appreciators: any = data?.map((data: any) => ({
          appreciator: data.appreciator,
          appreciationQuantity: ethers.utils.formatEther(
            data.appreciationQuantity.toString()
          ),
          amountAppreciated: ethers.utils.formatEther(
            data.amountAppreciated.toString()
          ),
        }));

        setArrAppreciators(appreciators);

        return appreciators;
      }
    } catch (error) {
      return error;
    }
  };


  React.useEffect(() => {
    if (contract) getAssetsDisplay();
    if (contract) getAllCollection();
    if (contract) getEveryAppreciators();
  }, [assetsDisplay]);

  const value = {
    address,
    connect,
    uploadAsset,
    getAssets,
    disconnect,
    handleAddAsset,
    assetToBeAppreciated,
    assetToBeAppreciatedState,
    userAppreciation,
    getAppreciators,
    getAssetDisplay,
    contract,
    getAssetWithId,
    AddCollection,
    AddAssetToCollection,
    collections,
    allAppreciators,
    loadingAssets,
    loadingCollection,
  };

  return (
    <ThirdWebContext.Provider value={value}>
      {props.children}
    </ThirdWebContext.Provider>
  );
};

export default ThirdWebContextProvider;

export const useThirdWebContext = () => React.useContext(ThirdWebContext);
// https://thirdweb.com/sepolia/0x08b84eF132dB542802CE2c80C8051FF7Fdf1B668/explorer
// https://thirdweb.com/sepolia
