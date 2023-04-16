import React from 'react';
import { useThirdWebContext } from '../../contexts/thirdweb';
import { AssetsDisplayProps } from '../../interface';
import { Card } from '../../components';

interface Props {}

const All = () => {
  const { address, getAssets, contract } = useThirdWebContext();
  const [userOwnAssets, setUserOwnAssets] = React.useState<
    AssetsDisplayProps[]
  >([]);

  React.useEffect(() => {
    if (address) {
      const filterAssetsForCurrentUser = getAssets?.filter(
        (asset) => asset.owner === address
      );
      setUserOwnAssets(filterAssetsForCurrentUser);
    }
  }, []);

  return (
    <main className='flex flex-col gap-10'>
      <section className='flex flex-col gap-3'>
        <p className='font-bold text-2xl text-white  underline underline-offset-4 decoration-violet-700'>
          All Assets uploaded
        </p>
        <ul className='flex flex-wrap gap-10'>
          {userOwnAssets?.map((asset, index) => (
            <Card asset={asset} key={index} />
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-3'>
        <p className='font-bold text-2xl text-white  underline underline-offset-4 decoration-violet-700'>
          All Collection created
        </p>
        <ul className='flex flex-wrap gap-10'>
          {userOwnAssets?.map((asset, index) => (
            <Card asset={asset} key={index} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default All;
