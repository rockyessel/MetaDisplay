import React from 'react';
import { Appreciation } from '../utils/services';
import { useUserContext } from '../contexts/user-context';
import { AssetUserFromDB } from '../interface';

interface Props {
  appreciator: Appreciation;
}

const AppreciatorList = (props: Props) => {
  const [assetUserFromDB, setAssetUserFromDB] = React.useState<AssetUserFromDB>();
  const { FindUserWithAddress } = useUserContext();

  React.useEffect(() => {
    const getData = async () => {
      if (props.appreciator) {
        const data = await FindUserWithAddress(props?.appreciator?.appreciator);
        // console.log('data', data);
        setAssetUserFromDB(data);
      }
    };

    getData();
  }, [props.appreciator]);

  return (
    <li className='w-[15rem] bg-[#141414] rounded-lg'>
      <img
        className='w-full object-cover h-40'
        src={assetUserFromDB?.profile}
        alt={assetUserFromDB?.name}
      />

      <div className='p-2 flex flex-col gap-2'>
        <p className='truncate'>{assetUserFromDB?.address}</p>
        <div className='flex justify-between'>
          <div className='flex flex-col truncate'>
            <p className='truncate'>{assetUserFromDB?.name}</p>
            <p className='text-white/60 text-sm'>
              @{assetUserFromDB?.username}
            </p>
          </div>
          <div className='flex flex-col'>
            <p>followers: {assetUserFromDB?.followers.length}</p>
            <p>following: {assetUserFromDB?.following.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AppreciatorList;
