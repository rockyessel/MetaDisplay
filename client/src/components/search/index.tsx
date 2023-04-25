import React from 'react';
import { Appreciation } from '../../utils/services';
import { AssetsDisplayProps } from '../../interface';
import Input from '../input';
import { useUserContext } from '../../contexts/user-context';

interface Props {
  valueSelected: string;
  data: {
    allAssets: AssetsDisplayProps[];
    allCollections: any[];
    allAppreciators: Appreciation[];
  };
}

const Search = (props: Props): JSX.Element => {
  const [filterData, setFilterData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [assetUserFromDB, setAssetUserFromDB] = React.useState({});
  const { FindUserWithAddress } = useUserContext();

  console.log('filterData', filterData);



  React.useEffect(() => {
    const getData = async () => {
      if (props.data.allAppreciators) {
        const data = await FindUserWithAddress(props?.appreciator?.appreciator);
        // console.log('data', data);
        setAssetUserFromDB(data);
      }
    };

    getData();
  }, [props.data.allAppreciators]);

  const handleSearches = (event: any) => {
    switch (props.valueSelected) {
      case 'assets':
        const assetFunction = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = props?.data?.allAssets?.filter((asset) =>
            asset?.title.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };
        return assetFunction();
      case 'collections':
        const collectionData = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = props?.data?.allCollections?.filter((collection) =>
            collection?.title.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };
        return collectionData();
      case 'appreciators':
        const appreciatorsData = () => {
          const typedValue = event.target.value.toLowerCase();
          setSearchedValue(typedValue);
          const findTypedValue = props?.data?.allAppreciators?.filter((appreciator) =>
            appreciator?.appreciator.toLowerCase().includes(typedValue)
          );
          setFilterData(findTypedValue);
        };

        return appreciatorsData();

      default:
        break;
    }
  };

  switch (props.valueSelected) {
    case 'assets':
      return (
        <div>
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
          <ul>
            {props?.data?.allAssets.map((asset, index) => (
              <li key={index}>{asset?.owner}</li>
            ))}
          </ul>
        </div>
      );
    case 'collections':
      return (
        <div>
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
          <ul>
            {props?.data?.allCollections.map((collection, index) => (
              <li key={index}>{collection?.owner}</li>
            ))}
          </ul>
        </div>
      );
    case 'appreciators':
      return (
        <div>
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
          <ul>
            {props?.data?.allAppreciators.map((appreciator, index) => (
              <li key={index}>{appreciator?.appreciator}</li>
            ))}
          </ul>
        </div>
      );

    default:
      return <div>No data</div>;
  }
};

export default Search;
