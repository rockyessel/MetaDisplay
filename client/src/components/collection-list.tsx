import React from 'react';
import { MdOutlineVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';

interface Props {
  collection: any;
}

const CollectionList = (props: Props) => {
  const [assetUserFromDB, setAssetUserFromDB] = React.useState({username: ''});
  const { FindUserWithAddress } = useUserContext();

  const getData = async () => {
    const data = await FindUserWithAddress(props?.collection?.owner);
    setAssetUserFromDB(data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <li
      className='w-[20rem] h-[20rem] rounded-xl relative'
      style={{ backgroundImage: `url("${props?.collection?.cover}")` }}
    >
      <Link
        className='flex-shrink-0'
        to={`/collections/${props?.collection?._id}`}
      >
        <div className='hero-overlay absolute bg-black/40 backdrop-blur-sm flex items-end p-2 sm:p-5'>
          <div className='flex items-end gap-2'>
            <img
              className='w-28 h-28 rounded-lg border-4 border-[#14141414]/60'
              src={props?.collection?.profile}
              alt={props?.collection?.title}
            />
            <div className='flex flex-col'>
              <p>
                Assets:{' '}
                <span className='font-bold'>
                  {props?.collection?.assetId?.length}
                </span>
              </p>
              <p className='font-extrabold'>{props?.collection?.title}</p>
              <p className='inline-flex items-center gap-1 truncate'>
                By <span className='font-bold'>{assetUserFromDB?.username}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CollectionList;
