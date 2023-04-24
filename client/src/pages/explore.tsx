import React from 'react';
import { Card, CollectionCard, Loader, Layout, CollectionList, AppreciatorList } from '../components';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const Explore = () => {
  const { getAssets, collections, allAppreciators } = useThirdWebContext();
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
      <section className='flex flex-col gap-10 min-h-screen'>
        <div className='w-full overflow-x-auto flex flex-col gap-8'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Notable Collections
          </h1>

          <ul className='w-full flex gap-10 py-5'>
            {collections?.map((collection, index) => (
              <CollectionList key={index} collection={collection} />
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-8'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Assets
          </h1>

          <div className='flex flex-col gap-5'>
            <ul className='flex flex-wrap gap-10'>
              {getAssets?.length > 0 ? (
                getAssets.map((asset) => <Card key={asset._id} asset={asset} />)
              ) : getAssets?.length === 0 ? (
                <li>No user has uploaded any assets yet</li>
              ) : (
                <Loader stateValue='Loading Assets' />
              )}
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Collections
          </h1>

          <ul className='flex flex-wrap gap-10'>
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
          </ul>
        </div>

        <div className='flex flex-col gap-10'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Appreciators
          </h1>

          <ul className='flex flex-wrap gap-10'>
            {allAppreciators?.map((appreciator, index) => (
              <AppreciatorList appreciator={appreciator} key={index} />
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
