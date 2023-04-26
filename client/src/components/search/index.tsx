import React from 'react';
import { Appreciation } from '../../utils/services';
import { AssetsDisplayProps } from '../../interface';
import Input from '../input';
import { useUserContext } from '../../contexts/user-context';
import { AssetUserFromDB } from '../appreciator-list';

interface Props {
  valueSelected: string;
  data: {
    allAssets: AssetsDisplayProps[];
    allCollections: any[];
    allAppreciators: Appreciation[];
  };
}

interface FilterDataProps {

}

const Search = (props: Props): JSX.Element => {
  const [filterData, setFilterData] = React.useState<any[] | AssetUserFromDB[] | undefined>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [assetUserFromDB, setAssetUserFromDB] = React.useState<AssetUserFromDB[]>();
  const { FindUserWithAddress } = useUserContext();

  console.log('filterData', filterData); 
  console.log('assetUserFromDB', assetUserFromDB); 



React.useEffect(() => {
  const getData = async () => {
    if (props.data.allAppreciators) {
      try {
        const data = props.data.allAppreciators.map((appreciator) => {
          const promise = FindUserWithAddress(appreciator.appreciator);
          return promise;
        });
        const assetUserFromDB = await Promise.all(data);
        setAssetUserFromDB(assetUserFromDB);
      } catch (error) {
        console.log(error);
      }
    }
  };
  getData();
}, [props.data.allAppreciators]);

  const handleSearches = (event: any) => {
    switch (props.valueSelected) {
      case 'Assets':
        const assetFunction = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = props?.data?.allAssets?.filter((asset) =>
            asset?.title.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };
        return assetFunction();
      case 'Collections':
        const collectionData = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = props?.data?.allCollections?.filter((collection) =>
            collection?.title.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };
        return collectionData();
      case 'Appreciators':
        const appreciatorsData = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = assetUserFromDB?.filter((appreciator) =>
            appreciator?.username.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };

        return appreciatorsData();

      default:
        break;
    }
  };

  switch (props.valueSelected) {
    case 'Assets':
      return (
        <div className='relative'>
          <div>
            <Input
              elementType='input'
              styles=''
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for an asset...'
            />
          </div>
          <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1'>
            {filterData?.map((asset, index) => (
              <li className='truncate inline-flex items-end gap-1 py-2' key={index}>
                <img
                  className='w-10 h-10 rounded-md'
                  src={asset?.image}
                  alt={asset?.title}
                />
                <span className='inline-flex flex-col leading-none truncate'>
                  <span className='truncate font-bold'>{asset?.title}</span>
                  <span className='truncate text-xs'>{asset?.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'Collections':
      return (
        <div className='relative'>
          <div>
            <Input
              elementType='input'
              styles=''
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for a collection...'
            />
          </div>
          <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1'>
            {filterData?.map((collection, index) => (
              <li className='truncate inline-flex items-end gap-1 py-2' key={index}>
                <img
                  className='w-10 h-10 rounded-md'
                  src={collection?.profile}
                  alt={collection?.title}
                />
                <span className='inline-flex flex-col leading-none truncate'>
                  <span className='truncate font-bold'>
                    {collection?.title}
                  </span>
                  <span className='truncate text-xs'>
                    {collection?.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'Appreciators':
      return (
        <div className='relative'>
          <div>
            <Input
              elementType='input'
              styles='w-full'
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for an appreciator...'
            />
          </div>
          <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1'>
            {filterData?.map((appreciator, index) => (
              <li className='truncate inline-flex items-end gap-1 py-2' key={index}>
                <img
                  className='w-10 h-10 rounded-md'
                  src={appreciator?.profile}
                  alt={appreciator?.name}
                />
                <span className='inline-flex flex-col leading-none truncate'>
                  <span className='truncate font-bold'>
                    {appreciator?.name}
                  </span>
                  <span className='truncate text-xs'>
                    @{appreciator?.username}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return <div>No data</div>;
  }
};

export default Search;
