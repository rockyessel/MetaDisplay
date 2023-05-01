import React from 'react';
import { Appreciation } from '../../utils/services';
import { AssetUserFromDB, AssetsDisplayProps } from '../../interface';
import Input from '../input';
import { useUserContext } from '../../contexts/user-context';
import SearchList from './search-list';

interface Props {
  valueSelected: string;
  data: {
    allAssets: AssetsDisplayProps[];
    allCollections: any[];
    allAppreciators: Appreciation[];
  };
}

const Search = (props: Props): JSX.Element => {
  const [filterData, setFilterData] = React.useState<AssetUserFromDB[] | AssetUserFromDB[] | any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [assetUserFromDB, setAssetUserFromDB] = React.useState<AssetUserFromDB[]>();
  const { FindUserWithAddress } = useUserContext();

  React.useEffect(() => {
    const getData = async () => {
      if (props.data.allAppreciators) {
        try {
          const data = props.data.allAppreciators.map((appreciator) => {
            const promise = FindUserWithAddress(appreciator.appreciator);
            return promise;
          });
          const appreciatorDBInformation = await Promise.all(data);
          setAssetUserFromDB(appreciatorDBInformation);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [props.data.allAppreciators]);

  React.useEffect(() => {
    if (searchedValue.length === 0) {
      setFilterData([]);
    }
  }, [searchedValue, props.valueSelected]);

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
          const findTypedValue = props?.data?.allCollections?.filter(
            (collection) => collection?.title.toLowerCase().includes(typedValue)
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
          findTypedValue && setFilterData(findTypedValue);
        };

        return appreciatorsData();

      default:
        break;
    }
  };

  switch (props.valueSelected) {
    case 'Assets':
      return (
        <div className='relative w-full'>
          <div>
            <Input
              elementType='input'
              styles='w-full max-w-sm lg:max-w-lg'
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for an asset...'
            />
          </div>
          {filterData?.length > 0 && (
            <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1 z-[100] shadow-lg shadow-violet-500'>
              {filterData?.map((asset, index) => (
                <SearchList
                  to={`/explore/${asset?._id}`}
                  key={index}
                  image={asset?.image}
                  title={asset?.title}
                  description={asset?.description}
                />
              ))}
              {searchedValue.length > 0 && filterData?.length === 0 && (
                <li>No asset found</li>
              )}
            </ul>
          )}
        </div>
      );
    case 'Collections':
      return (
        <div className='relative w-full'>
          <div>
            <Input
              elementType='input'
              styles='w-full max-w-sm lg:max-w-lg'
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for a collection...'
            />
          </div>
          {filterData?.length > 0 && (
            <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1 z-[100] shadow-lg shadow-violet-500'>
              {filterData?.map((collection, index) => (
                <SearchList
                  to={`/collections/${collection?._id}`}
                  key={index}
                  image={collection?.profile}
                  title={collection?.title}
                  description={collection?.description}
                />
              ))}
              {searchedValue.length > 0 && filterData?.length === 0 && (
                <li>No Collection found</li>
              )}
            </ul>
          )}
        </div>
      );
    case 'Appreciators':
      return (
        <div className='relative w-full'>
          <div>
            <Input
              elementType='input'
              styles='w-full max-w-sm lg:max-w-lg'
              value={searchedValue}
              onChange={handleSearches}
              type='text'
              name={'assets'}
              placeholder='Search for an appreciator...'
            />
          </div>
          {filterData?.length > 0 && (
            <ul className='absolute bg-[#141414] px-4 py-2 rounded-md divide-y-[1px] divide-violet-500/20 mt-2 w-full flex flex-col gap-1 z-[100] shadow-lg shadow-violet-500'>
              {filterData?.map((appreciator, index) => (
                <SearchList
                  to={`/users/${appreciator?.address}`}
                  key={index}
                  image={appreciator?.profile}
                  title={appreciator?.name}
                  description={`@${appreciator?.username}`}
                />
              ))}
              {searchedValue.length > 0 && filterData?.length === 0 && (
                <li>No Appreciators found</li>
              )}
            </ul>
          )}
        </div>
      );

    default:
      return <div>No data</div>;
  }
};

export default Search;
