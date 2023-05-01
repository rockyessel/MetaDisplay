import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  collection: any;
}

const CollectionList = (props: Props) => {

  const styles = {
    backgroundImage: `url('${props?.collection?.cover}')`,
  };
  return (
    <li className='w-screen h-[20rem] rounded-xl relative' style={styles}>
      <Link className='flex-shrink-0' to={`/collections/${props?.collection?._id}`}>
        <div className='hero-overlay absolute bg-black/40 backdrop-blur-sm flex items-end p-2 sm:p-5'>
          <div className='flex items-end gap-2'>
            <img
              className='w-40 h-40 rounded-lg border-4 border-[#14141414]/60'
              src={props?.collection?.profile}
              alt={props?.collection?.title}
            />
            <div className='flex flex-col'>
              <p>Collection name:{' '}<span className='font-extrabold'>{props?.collection?.title}</span></p>
              <p>Category:{' '}<span className='font-bold'>{props?.collection?.category}</span></p>
              <p>Assets:{' '}<span className='font-bold'>{props?.collection?.assetId?.length}</span></p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CollectionList;
