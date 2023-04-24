import React from 'react';
import { useThirdWebContext } from '../../contexts/thirdweb';
import { AssetsDisplayProps } from '../../interface';
import { Button, Card } from '../../components';

interface Props {}

const AddAssetCollection = () => {
  const {
    handleAddAsset,
    address,
    collections,
    AddAssetToCollection,
    getAssets,
    contract,
  } = useThirdWebContext();
  const assetOwnersCollection: any[] =
    address &&
    collections?.filter((collection) => collection.owner === address);
  const [selectedCollection, setSelectedCollection] = React.useState('');
  const [selectedAsset, setSelectedAsset] = React.useState('');
  const [userOwnAssets, setUserOwnAssets] = React.useState<
    AssetsDisplayProps[]
  >([]);

  React.useEffect(() => {
    if (address) {
      const filterAssetsForCurrentUser = contract
        ? getAssets?.filter((asset) => asset.owner === address)
        : [];
      setUserOwnAssets(filterAssetsForCurrentUser);
    }
  }, []);

  console.log('AddAssetCollection', {
    collectionId: selectedCollection,
    assetId: selectedAsset,
  });

  const handleAddCollection = () => {
    AddAssetToCollection({
      collectionId: selectedCollection,
      assetId: selectedAsset,
    });
    setSelectedAsset('');
    setSelectedCollection('');
  };

  return (
    <div>
      <section className='flex flex-col gap-3'>
        <p className='font-bold text-2xl text-white  underline underline-offset-4 decoration-violet-700'>
          All Assets uploaded
        </p>
        <ul className='flex flex-wrap gap-10'>
          {userOwnAssets?.map((asset, index) => (
            <li onClick={() => setSelectedAsset(asset?._id)} key={index}>
              {asset?.title}
            </li>
          ))}
        </ul>
      </section>

      <ul className='flex flex-col gap-2 divide-y-2 divide-gray-50/70'>
        {assetOwnersCollection?.map((collection, index) => (
          <li
            onClick={() => setSelectedCollection(collection?._id)}
            className={`truncate px-4 cursor-pointer hover:bg-violet-500 hover:text-black py-2 rounded-md ${
              selectedCollection === collection?._id
                ? 'bg-violet-800 text-black font-bold'
                : ''
            }`}
            key={index}
          >
            <span className='flex items-center gap-2'>
              <img
                className='w-10 h-10 rounded-md'
                src={collection?.profile}
                alt={collection?.title}
              />
              <span>
                <span className='flex flex-col gap-1'>
                  <span> {collection?.title}</span>
                  <span>{collection?.description}</span>
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <Button
        styles='w-full'
        title='Add asset to collection'
        handleClick={handleAddCollection}
      >
        Add
      </Button>
    </div>
  );
};

export default AddAssetCollection;
