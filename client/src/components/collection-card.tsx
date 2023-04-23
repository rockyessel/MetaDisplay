import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxExternalLink } from 'react-icons/rx';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const CollectionCard = () => {
  const { getAssets, collections } = useThirdWebContext();

  const arrAssets = collections?.map((assetId) => assetId.assetId)
  console.log('arrAssets', arrAssets[1]);

  const data = getAssets.filter((assetId) => arrAssets[1].includes(assetId._id));
  console.log('data', data);
  return (
    <div className='w-full sm:w-[25rem] border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
      <div className='grid grid-cols-4 gap-1'>
        <img
          src='https://i.seadn.io/s/primary-drops/0xcd15cabf8f047e226a719826f0a4726e34e69e28/24146804:about:preview_media:d4232f34-be0b-4ed0-87ca-6a6b82601bc9.gif?auto=format&w=1920'
          alt=''
          className='w-full h-full object-cover row-span-3 col-span-2'
        />
        <img
          src='https://i.seadn.io/s/primary-drops/0xcd15cabf8f047e226a719826f0a4726e34e69e28/24146804:about:preview_media:d4232f34-be0b-4ed0-87ca-6a6b82601bc9.gif?auto=format&w=1920'
          alt=''
          className='w-full h-full object-cover col-span-2'
        />
        <img
          src='https://i.seadn.io/s/primary-drops/0xcd15cabf8f047e226a719826f0a4726e34e69e28/24146804:about:preview_media:d4232f34-be0b-4ed0-87ca-6a6b82601bc9.gif?auto=format&w=1920'
          alt=''
          className='w-full h-full object-cover row-span-2 '
        />
        <img
          src='https://i.seadn.io/s/primary-drops/0xcd15cabf8f047e226a719826f0a4726e34e69e28/24146804:about:preview_media:d4232f34-be0b-4ed0-87ca-6a6b82601bc9.gif?auto=format&w=1920'
          alt=''
          className='w-full h-full object-cover row-span-2 '
        />
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
