import React from 'react';
import { Appreciation } from '../utils/services';
import { useUserContext } from '../contexts/user-context';

interface Props {
  appreciator: Appreciation;
}

interface AssetUserFromDB {
  profile:string
  name:string
  username:string
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
    <li>
      <div className='w-[15rem]  bg-[#141414]rounded-lg shadow'>
        <img
          className='rounded-t-lg w-full object-cover h-40'
          src={assetUserFromDB?.profile}
          alt={assetUserFromDB?.name}
        />

        <div className='p-5 border border-gray-200'>
          <p className='mb-2 font-bold tracking-tight'>
            <span>{assetUserFromDB?.name}</span>{' '}
            <span className='text-gray-400 text-sm'>
              @{assetUserFromDB?.username}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default AppreciatorList;
