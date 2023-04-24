import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxExternalLink } from 'react-icons/rx';
import { useThirdWebContext } from '../contexts/thirdweb';
import { Link } from 'react-router-dom';

interface Props {}

const CollectionCard = () => {
  const { getAssets, collections } = useThirdWebContext();

  const arrAssets = collections?.map((assetId) => assetId.assetId);

  const data = getAssets.filter((assetId) =>
    arrAssets[1].includes(assetId._id)
  );
  return (
    <div className='w-full sm:w-[25rem] border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
      <div className='w-full px-4 py-2 bg-[#141414] inline-flex items-center justify-between gap-5'>
        <p className='truncate'>Michael Circle - Demons.wav</p>
        <p className='inline-flex items-center gap-1'>
          <RxExternalLink />

          <span className='inline-flex items-center gap-1'>
            <AiOutlineHeart /> 54
          </span>
        </p>
      </div>
      <div
        className={`grid grid-cols-4 gap-1 ${
          data.length > 5 &&
          'first:row-span-3 first:col-span-2  [&>*:nth-child(2)]:row-span-2 [&>*:nth-child(3)]:row-span-2 [&>*:nth-child(4)]:row-span-2'
        }`}
      >
        {data.map((asset) => (
            <img
              src={asset?.image}
              alt=''
              className='w-full h-full object-cover row-span-3 col-span-2'
            />
        ))}
      </div>

      <div className='w-full px-4 py-2 bg-[#141414] inline-flex items-center justify-between gap-5'>
        <p className='truncate'>Michael Circle - Demons.wav</p>
        <p className='inline-flex items-center gap-1'>
          <RxExternalLink />

          <span className='inline-flex items-center gap-1'>
            <AiOutlineHeart /> 54
          </span>
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
