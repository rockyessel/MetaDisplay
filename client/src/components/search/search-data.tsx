import React from 'react';
import Search from './index'
import { useThirdWebContext } from '../../contexts/thirdweb';

const SearchData = () => {
  const [valueSelected, setValueSelected] = React.useState('assets');
  const { allAppreciators, getAssets, collections } = useThirdWebContext()
  const data = { allAppreciators: allAppreciators, allAssets: getAssets, allCollections: collections }

  return (
    <div>
      <div>
        <p>{valueSelected}</p>
        <ul>
          <li onClick={() => setValueSelected('assets')}>Assets</li>
          <li onClick={() => setValueSelected('collections')}>Collections</li>
          <li onClick={() => setValueSelected('appreciators')}>Appreciators</li>
          <li onClick={() => setValueSelected('users')}>Users</li>
        </ul>
      </div>

      <div>
        <Search valueSelected={valueSelected} data={data} />
      </div>
    </div>
  );
};

export default SearchData;
