import React from 'react';
import { BsSearch } from 'react-icons/bs';

interface Props {}

const Search = () => {
  return (
    <div className='flex-1 border-[1px] hidden border-gray-50/60 md:flex items-center gap-3 px-3 py-1.5 rounded-3xl max-w-sm lg:max-w-lg'>
      <BsSearch />
      <input
        type='text'
        className='bg-transparent outline-none w-full'
        placeholder='Search items, collection, accounts'
      />
    </div>
  );
};

export default Search;
{
  /* <div className='flex flex-wrap items-center justify-between'>
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
</div>; */
}
