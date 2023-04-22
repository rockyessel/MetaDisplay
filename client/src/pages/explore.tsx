import React from 'react';
import { IoMdGrid } from 'react-icons/io';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { BsDatabase, BsCurrencyDollar } from 'react-icons/bs';
import {
  Button,
  Card,
  CollectionCard,
  DropMenu,
  Loader,
  Layout,
} from '../components';
import { useThirdWebContext } from '../contexts/thirdweb';

interface Props {}

const data = ['Anime', 'Games', 'Music', 'Movies'];
const collections = ['iamthobi', 'thebftguy', 'metaboys', 'nft_collector'];
const price = [
  '$1 to $5',
  '$5 to $10',
  '$10 to $15',
  '$15 to $30',
  'More than $30',
];

const Explore = () => {
  const { getAssets } = useThirdWebContext();
  return (
    <Layout
      description={'MetaDisplay is a blockchain-based platform that enables creators to receive appreciation for their digital assets in the form of Ether from appreciators.'}
      title={'MetaDisplay - Explore'}
      image={''}
      alt={'MetaDisplay - Explore'}
      keywords={'digital assets,blockchain,Ethereum,appreciation,appreciators,creators,platform,smart contracts,collections,assets,NFTs,ownership,transactions,decentralized,marketplace,tokenization,blockchain'}
      type={'Website'}
      publishedAt={''}
      updatedAt={''}
      author_name={'Rocky Essel'}
      MIME={'png'}
    >
      <section className='flex flex-col gap-10 min-h-screen'>
        <div className='flex flex-col gap-10'>
          <h1 className='font-bold text-4xl text-white underline underline-offset-8 decoration-violet-700'>
            Explore gallery
          </h1>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-wrap items-center justify-between'>
              <div>
                <Button
                  title='All Categories'
                  type='button'
                  styles='border-[1px] relative group border-gray-50/60 rounded-3xl inline-flex items-center gap-1 px-3 py-1.5'
                >
                  <IoMdGrid /> All Categories <MdOutlineArrowDropDown />
                  <DropMenu
                    handleClick={() => {}}
                    styles={'absolute hidden group-hover:block top-10 left-0'}
                    data={data}
                  />
                </Button>
                <Button
                  title='Collections'
                  type='button'
                  styles='border-[1px] relative group border-gray-50/60 rounded-3xl inline-flex items-center gap-1 px-3 py-1.5'
                >
                  <BsDatabase /> Collections <MdOutlineArrowDropDown />
                  <DropMenu
                    handleClick={() => {}}
                    styles={'absolute hidden group-hover:block top-10 left-0'}
                    links={collections}
                  />
                </Button>
                <Button
                  title='Price range'
                  type='button'
                  styles='border-[1px] relative group border-gray-50/60 rounded-3xl inline-flex items-center gap-1 px-3 py-1.5'
                >
                  <BsCurrencyDollar /> Price range <MdOutlineArrowDropDown />
                  <DropMenu
                    handleClick={() => {}}
                    styles={'absolute hidden group-hover:block top-10 left-0'}
                    data={data}
                  />
                </Button>
                <Button
                  title='All Categories'
                  type='button'
                  styles='border-[1px] relative group border-gray-50/60 rounded-3xl inline-flex items-center gap-1 px-3 py-1.5'
                >
                  <IoMdGrid /> All Categories <MdOutlineArrowDropDown />
                  <DropMenu
                    handleClick={() => {}}
                    styles={'absolute hidden group-hover:block top-10 left-0'}
                    data={data}
                  />
                </Button>
              </div>

              <div>
                <Button
                  title='All Categories'
                  type='button'
                  styles='border-[1px] relative group border-gray-50/60 rounded-3xl inline-flex items-center gap-1 px-3 py-1.5'
                >
                  <IoMdGrid /> All Categories <MdOutlineArrowDropDown />
                  <DropMenu
                    handleClick={() => {}}
                    styles={'absolute hidden group-hover:block top-10 left-0'}
                    data={data}
                  />
                </Button>
              </div>
            </div>
            {/* <Loader stateValue='Loading Assets' /> */}

            <ul className='flex flex-wrap gap-10'>
              {getAssets?.length > 0 ? (
                getAssets.map((asset) => <Card key={asset._id} asset={asset} />)
              ) : (
                <li>
                  <Loader stateValue='Loading Assets' />
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-10'>
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
            <CollectionCard />
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
