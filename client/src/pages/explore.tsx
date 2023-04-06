import React from 'react';
import { IoMdGrid } from 'react-icons/io';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { BsDatabase, BsCurrencyDollar } from 'react-icons/bs';
import { Button, Card, DropMenu, Loader } from '../components';
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

  console.log('getAssets', getAssets);

  return (
    <section className='flex flex-col gap-10 min-h-screen'>
      <h1 className='font-bold text-4xl text-white'>Explore gallery</h1>

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
          {getAssets.length > 0 ? (
            getAssets.map((asset) => <Card key={asset._id} asset={asset} />)
          ) : (
            <li>
              <Loader stateValue='Loading Assets' />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Explore;
