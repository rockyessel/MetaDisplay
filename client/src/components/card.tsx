import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';
import ProfileImage from './profile-image';
import UserTooltip from './user-tooltip';
import { Link } from 'react-router-dom';
import { AssetsDisplayProps, UserDataProps } from '../interface';
import { useThirdWebContext } from '../contexts/thirdweb';
import { FaEthereum } from 'react-icons/fa';
import { useUserContext } from '../contexts/user-context';
import { SiHiveBlockchain } from 'react-icons/si';
import { userDataDefault } from '../utils/constant';
import { ethers } from 'ethers';
import { Summation } from '../utils/services';
import MoreButton from './more-button';
import ShareIcons from './share-icons';
import ReusableModal from './reusable-modal';
import Button from './button';

interface Props {
  asset: AssetsDisplayProps;
}

export interface GetAllAppreciatorsProps {
  appreciator: string;
  appreciationQuantity: string;
  amountAppreciated: ethers.BigNumber;
}

const Card = (props: Props) => {
  const [assetOwner, setAssetOwner] =
    React.useState<UserDataProps>(userDataDefault);

  // Context
  const { handleAddAsset, address, collections, AddAssetToCollection } =
    useThirdWebContext();
  const {
    getAllUsers,
    FindUserWithAddress,
    reusableModalState,
    reusableModalValue,
  } = useUserContext();

  const [selectedCollection, setSelectedCollection] = React.useState('');
  const getAddressFromProps = props?.asset?.appreciators?.map(
    (address) => address.appreciator
  );
  const matchingUsers = getAllUsers.filter((user) =>
    getAddressFromProps.includes(user.address)
  );
  const formattedTotal = Summation(props?.asset?.appreciators);

  const assetOwnersCollection: any[] =
    address &&
    collections?.filter((collection) => collection.owner === address);

  console.log('assetOwnersCollection', assetOwnersCollection);

  const getUserWithAddress = async () => {
    const data = (await FindUserWithAddress(
      props?.asset?.owner
    )) as unknown as UserDataProps;
    setAssetOwner(data);
  };

  React.useEffect(() => {
    getUserWithAddress();
  }, []);

  return (
    <li className='w-full sm:w-[288px]'>
      {reusableModalState && reusableModalValue === 'card' && (
        <ReusableModal title={`layout`}>
          <ShareIcons
            slug={props?.asset?._id}
            baseURL='http://localhost:5173'
            title={props.asset?.title}
            body={props?.asset?.description}
          />
        </ReusableModal>
      )}
      {reusableModalState && reusableModalValue === 'select-collection' && (
        <ReusableModal
          buttonElement={
            <Button
              handleClick={() =>
                AddAssetToCollection({
                  assetId: props?.asset?._id,
                  collectionId: selectedCollection,
                })
              }
              type='button'
              styles='w-full'
              title='Add'
            >
              Add
            </Button>
          }
          title={`select-collection`}
        >
          <ul>
            {assetOwnersCollection?.map((collection, index) => (
              <li
                onClick={() => setSelectedCollection(collection?._id)}
                className='px-4 py-2 rounded-md bg-[#141414]'
                key={index}
              >
                {collection?.title}
              </li>
            ))}
          </ul>
        </ReusableModal>
      )}
      <header className='w-full flex items-center rounded-t-lg bg-[#141414] px-4 py-2 justify-between'>
        <div className='flex mb-3 -space-x-3'>
          {matchingUsers.length > 0 ? (
            matchingUsers?.map((appreciator, index) => (
              <ProfileImage key={index} data={appreciator} />
            ))
          ) : (
            <div className='w-10 h-10 shadow-md shadow-violet-800 bg-white rounded-full text-black text-xl inline-flex justify-center items-center'>
              <SiHiveBlockchain title='No appreciation shown' />
            </div>
          )}
        </div>

        <div className='inline-flex items-center gap-2 '>
          {address && (
            <FaEthereum
              title='Appreciate Asset'
              className='text-3xl hover:text-violet-500 cursor-pointer'
              onClick={() => handleAddAsset(props?.asset)}
            />
          )}

          <MoreButton asset={props?.asset} position='dropdown-left' />
        </div>
      </header>

      <Link to={`/explore/${props?.asset?._id}`}>
        <main className='w-full'>
          <img
            title={props?.asset?.title}
            className='w-full h-[18rem] object-cover'
            src={props?.asset?.image}
          />
        </main>
      </Link>

      <footer className='w-full flex flex-col gap-2 bg-[#141414] rounded-b-3xl px-4 py-2'>
        <div className='w-full inline-flex gap-5 items-center justify-between'>
          <span className='truncate'>{props?.asset?.title}</span>
          <span className='inline-flex items-center gap-1'>
            <AiOutlineHeart /> 54
          </span>
        </div>
        <div className='w-full inline-flex items-center justify-between'>
          <span>Appreciated</span>
          <span>{formattedTotal} ETH</span>
        </div>
        <div className='w-full inline-flex items-center justify-between gap-5'>
          <div className='w-full h-full group relative'>
            <ProfileImage data={assetOwner} />
            <UserTooltip
              data={assetOwner}
              styles='hidden left-0 group-hover:block absolute after:content-[""] after:absolute after:bottom-full after:left-0 after:border-8 after:border-solid after:border-x-transparent after:border-t-transparent after:border-b-white after:translate-y-0.5 after:translate-x-0.5'
            />
          </div>
          <p className='truncate'>
            by <span className='font-semibold'>{props?.asset?.owner}</span>
          </p>
        </div>
      </footer>
    </li>
  );
};

export default Card;
