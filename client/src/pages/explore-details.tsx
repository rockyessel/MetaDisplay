import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxExternalLink } from 'react-icons/rx';
import { FaEthereum } from 'react-icons/fa';
import { VscListFlat, VscCopy } from 'react-icons/vsc';
import {
  CollectionCard,
  ReusableModal,
  ShareIcons,
  Layout,
  MoreButton,
  ProfileImage,
} from '../components';
import { Link, useParams } from 'react-router-dom';
import { useThirdWebContext } from '../contexts/thirdweb';
import { Summation } from '../utils/services';
import { useUserContext } from '../contexts/user-context';
import { SiHiveBlockchain } from 'react-icons/si';
import { ethers } from 'ethers';
import { AssetDetailsDefault } from '../utils/constant';
import { AssetsDisplayProps } from '../interface';
import moment from 'moment';

interface Props {}

export interface AssetDetailsProps {
  found: {
    views: number;
    saves: never[];
    _id: string;
    asset_url: string;
  };
  success: boolean;
}

interface CurrentAssetProps {}

const ExploreDetails = () => {
  const { assetId } = useParams();
  const [assetUserFromDB, setAssetUserFromDB] = React.useState({username: ''});
  const { getAssets, handleAddAsset, getAssetWithId, address } = useThirdWebContext();
  const { getAllUsers, FindUserWithAddress, AssetViewCounts, GetAsset,reusableModalState, reusableModalValue } = useUserContext();
  const [assetDetails, setAssetDetails] = React.useState<AssetDetailsProps>(AssetDetailsDefault);
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = React.useState<AssetsDisplayProps>();
  const [totalAssets, setTotalAssets] = React.useState<number>();


  const getAddressFromProps = currentAsset?.appreciators?.map((address) => address.appreciator);
  const matchingUsers = getAllUsers?.filter((user) => getAddressFromProps?.includes(user?.address));
  const totalAppreciation = Summation(currentAsset?.appreciators);

  const getAllData = async () => {
    if (assetId) {
      const asset_info = await GetAsset(assetId);
      setAssetDetails(asset_info);
    }


  };
  React.useEffect(() => {
    if (!hasIncremented) {
      const time = setTimeout(() => {
        if (assetId)
          AssetViewCounts(assetId).then(() => {
            setHasIncremented(true);
          });
      }, 5000);

      return () => clearTimeout(time);
    }
  }, []);

  React.useEffect(() => {
    if (assetId)
      getAssetWithId(assetId).then((data) => {
        setCurrentAsset(data);
      });
    getAllData();
  }, [assetId]);

  React.useEffect(()=>{
const getData = async () => {
   if (currentAsset) {
     const data = await FindUserWithAddress(currentAsset?.owner);
     setAssetUserFromDB(data);
   }
}

getData()
  }, [currentAsset])

  React.useEffect(() => {
    const totalAssetsUploads = getAssets?.filter(
      (asset) => asset?.owner === currentAsset?.owner
    )?.length;
    setTotalAssets(totalAssetsUploads);
  }, [assetId]);

  const mimeType = currentAsset?.image?.split('.')?.slice(-1)[0];

  return (
    <Layout
      description={currentAsset?.description}
      title={currentAsset?.title}
      image={currentAsset?.image}
      alt={currentAsset?.title}
      keywords={`asset, ${currentAsset?.title}`}
      type={'Asset Page'}
      publishedAt={currentAsset?.date}
      updatedAt={''}
      author_name={assetUserFromDB?.username}
      MIME={mimeType}
      slug={assetId && assetId}
    >
      {reusableModalState && reusableModalValue === 'explore-details' && (
        <ReusableModal title={`Share with others`}>
          <ShareIcons
            slug={currentAsset?._id}
            baseURL='https://metadisplay.vercel.app'
            title={currentAsset?.title}
          />
        </ReusableModal>
      )}
      <section className='w-full flex flex-col gap-10 pb-5'>
        <div className='w-full flex flex-col lg:flex-row items-center gap-5'>
          <div className='w-full lg:w-[30rem] h-full lg:h-[34.4rem]  overflow-hidden border-[1px] border-gray-50/60 rounded-t-md'>
            <div className='w-full bg-[#141414] rounded-t-md inline-flex items-center justify-between px-3 py-1.5'>
              <span>
                {address && (
                  <FaEthereum
                    title='Appreciate Asset'
                    className='text-3xl hover:text-violet-500 cursor-pointer'
                    onClick={() => {
                      if (currentAsset) {
                        handleAddAsset(currentAsset);
                      }
                    }}
                  />
                )}
              </span>
              <MoreButton position='dropdown-left' />
            </div>

            <div>
              <img
                src={currentAsset?.image}
                className='w-full lg:w-[30rem] h-full lg:h-[34.4rem] object-cover'
                alt=''
              />
            </div>
          </div>

          <div className='w-full lg:w-auto flex-1 h-full flex flex-col gap-3 lg:gap-5'>
            <div className='flex flex-col gap-4'>
              <div className='w-full flex justify-between font-bold text-xl lg:text-3xl'>
                <p className='inline-flex flex-col'>
                  <span className='text-xs'>Category</span>
                  <span className='font-medium text-violet-400 cursor-pointer'>
                    {' '}
                    Angry WAVs
                  </span>
                </p>

                <p className='inline-flex flex-col'>
                  <span className='text-xs'>Day Uploaded</span>
                  <span>{moment(currentAsset?.date).format('dddd')}</span>
                </p>
              </div>
              <div className='w-full flex justify-between font-bold text-xl lg:text-3xl'>
                <p className='inline-flex flex-col'>
                  <span className='text-xs'>Title</span>
                  <span>{currentAsset?.title}</span>
                </p>

                <p className='inline-flex flex-col'>
                  <span className='text-xs'>Total Appreciation</span>
                  <span>
                    {totalAppreciation ? totalAppreciation : '0.0000'} ETH
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-1 h-full'>
                <div className='flex mb-3 -space-x-3'>
                  {matchingUsers.length > 0 ? (
                    matchingUsers?.map((appreciator, index) => (
                      <ProfileImage key={index} data={appreciator} />
                    ))
                  ) : (
                    <div className='w-10 h-10 bg-white rounded-full text-black text-xl inline-flex justify-center items-center'>
                      <SiHiveBlockchain title='No appreciation shown' />
                    </div>
                  )}
                </div>
                {matchingUsers.length === 0 ? (
                  <span>No appreciation shown yet.</span>
                ) : (
                  <span className='text-sm'>
                    {matchingUsers.length} appreciate to{' '}
                    <span className='font-medium text-violet-400 cursor-pointer'>
                      {assetUserFromDB?.username}
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' /> Description
              </p>

              <p className='px-4 py-2 bg-[#141414]'>
                {currentAsset?.description}
              </p>
            </div>

            <div className='w-full flex flex-col lg:flex-row items-center gap-5'>
              <div className='w-full flex-shrink-0 lg:w-auto border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60'>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' /> Socials
                </p>
                <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                  <a
                    className='flex flex-col items-center'
                    title='Instagram'
                    rel='noopener'
                    href='#'
                  >
                    <img
                      className='w-[3.3rem] h-[3.3rem]'
                      src='https://metadisplay.s3.amazonaws.com/instagram.png'
                      alt=''
                    />
                    {/* <p className='text-sm'>Instagram</p> */}
                  </a>

                  <a
                    className='flex flex-col items-center'
                    title='Facebook'
                    rel='noopener'
                    href=''
                  >
                    <img
                      className='w-[3.3rem] h-[3.3rem]'
                      src='https://metadisplay.s3.amazonaws.com/facebook.png'
                      alt=''
                    />
                    {/* <p className='text-sm'>Facebook</p> */}
                  </a>

                  <a
                    className='flex flex-col items-center'
                    title='Twitter'
                    rel='noopener'
                    href='#'
                  >
                    <img
                      className='w-[3.3rem] h-[3.3rem]'
                      src='https://metadisplay.s3.amazonaws.com/twitter.png'
                      alt=''
                    />
                    {/* <p className='text-sm'>Twitter</p> */}
                  </a>
                </div>
              </div>

              <div className='w-full border-[1px] flex-1 border-gray-50/60 rounded-t-md  divide-y-[1px] divide-gray-50/60'>
                <div>
                  <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                    <VscListFlat className='text-3xl' /> Public Information
                  </p>
                </div>
                <div className='px-4 py-2 bg-[#141414]  flex flex-col gap-1'>
                  <span className='inline-flex items-center justify-between gap-16'>
                    <span className='flex-shrink-0'>Website</span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='truncate text-violet-400 font-medium'>
                        https://open...
                      </span>
                      <VscCopy />
                    </span>
                  </span>
                  <span className='inline-flex items-center justify-between gap-16'>
                    <span className='flex-shrink-0'>Total Assets Uploaded</span>
                    <span>{totalAssets}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
              <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' />
                  Collections
                </p>
                <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                  34
                </div>
              </div>
              <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' /> Views
                </p>
                <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                  {assetDetails?.found?.views}
                </div>
              </div>
              <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' /> Saves
                </p>
                <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                  {assetDetails?.found?.saves?.length}
                </div>
              </div>
              <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' /> Category
                </p>
                <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                  {currentAsset?.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='w-full relative overflow-x-auto shadow-md'>
            <div className='w-full p-5 text-lg font-semibold text-left border-[1px] rounded-t-md border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
              Appreciate Lists
              <p className='mt-1 text-sm font-normal '>
                Here is the list of appreciation show to this creator by other
                user.
              </p>
            </div>
            {currentAsset?.appreciators?.length &&
            currentAsset.appreciators.length > 0 ? (
              <table className='w-full text-sm text-left'>
                <thead className='uppercase bg-[#141414] text-gray-400 border-[1px] border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
                  <tr>
                    <th className='px-6 py-3'>Appreciators</th>
                    <th className='px-6 py-3'>Amount appreciated</th>
                    <th className='px-6 py-3'>Quantity</th>
                  </tr>
                </thead>
                <tbody className='border-[1px] border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
                  {currentAsset?.appreciators?.map((appreciator, index) => (
                    <tr key={index} className='bg-[#141414]'>
                      <td className='px-6 py-4 truncate'>
                        {appreciator?.appreciator}
                      </td>
                      <td className='px-6 py-4'>
                        {ethers.utils.formatEther(
                          appreciator?.amountAppreciated.toString()
                        )}{' '}
                        ETH
                      </td>
                      <td className='px-6 py-4'>
                        {appreciator?.appreciationQuantity.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='w-full border-[1px] border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md bg-[#141414]'>
                <p className='w-full px-6 py-4'>
                  Be the first to show appreciation to this creator's asset.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='w-full'>
          <p className='font-bold text-4xl text-white'>Collections</p>
          <CollectionCard />
        </div>
      </section>
    </Layout>
  );
};

export default ExploreDetails;
