import React from 'react';
import {
  Card,
  CollectionCard,
  Loader,
  Layout,
  CollectionList,
  AppreciatorList,
  AssetLoadingCard,
} from '../components';
import { useThirdWebContext } from '../contexts/thirdweb';
import SearchData from '../components/search/search-data';
import Hero from '../components/hero';

interface Props {}

const Explore = () => {
  const {
    getAssets,
    collections,
    allAppreciators,
    loadingAssets,
    loadingCollection,
  } = useThirdWebContext();

  console.log('loadingAssets', loadingAssets);
  return (
    <Layout
      description={
        'MetaDisplay is a blockchain-based platform that enables creators to receive appreciation for their digital assets in the form of Ether from appreciators.'
      }
      title={'MetaDisplay - Explore'}
      image={''}
      alt={'MetaDisplay - Explore'}
      keywords={
        'digital assets,blockchain,Ethereum,appreciation,appreciators,creators,platform,smart contracts,collections,assets,NFTs,ownership,transactions,decentralized,marketplace,tokenization,blockchain'
      }
      type={'Website'}
      publishedAt={''}
      updatedAt={''}
      author_name={'Rocky Essel'}
      MIME={'png'}
    >
      <section className='flex flex-col gap-10 min-h-screen py-10'>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Collections
          </h1>

          <div className='flex flex-col gap-5'>
            <ul className='flex gap-10 py-5'>
              <Hero collections={collections} />
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Assets
          </h1>

          <div className='w-full flex flex-col gap-5'>
            <ul className='flex overflow-x-auto gap-10 py-5'>
              {getAssets?.length > 0 &&
                getAssets.map((asset) => (
                  <Card key={asset._id} asset={asset} />
                ))}

              {loadingAssets ? (
                <React.Fragment>
                  <AssetLoadingCard />
                  <AssetLoadingCard />
                  <AssetLoadingCard />
                  <AssetLoadingCard />
                </React.Fragment>
              ) : (
                getAssets.length === 0 && <li>No asset uploaded yet.</li>
              )}

              {}
            </ul>

            <div className='w-full flex justify-end'>
              <ul className='flex items-center gap-4'>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Next
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  1
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  2
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  ...
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  4
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  5
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Previous
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Collections
          </h1>

          <div className='w-full flex flex-col gap-5'>
            <ul className='flex overflow-x-auto gap-10 py-5'>
              <CollectionCard />
              <CollectionCard />
              <CollectionCard />
              <CollectionCard />
              <CollectionCard />
            </ul>

            <div className='w-full flex justify-end'>
              <ul className='flex items-center gap-4'>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Next
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  1
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  2
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  ...
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  4
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  5
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Previous
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Top Appreciators
          </h1>

          <div className='w-full flex flex-col gap-5'>
            <ul className='flex overflow-x-auto gap-10 py-5'>
              {allAppreciators?.map((appreciator, index) => (
                <AppreciatorList appreciator={appreciator} key={index} />
              ))}
              {allAppreciators?.map((appreciator, index) => (
                <AppreciatorList appreciator={appreciator} key={index} />
              ))}
            
            </ul>

            <div className='w-full flex justify-end'>
              <ul className='flex items-center gap-4'>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Next
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  1
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  2
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  ...
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  4
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  5
                </li>
                <li className='px-4 py-2 active:ring-2 active:ring-violet-600 hover:shadow-md hover:shadow-violet-500 rounded-lg shadow-sm shadow-violet-400'>
                  Previous
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
