import React from 'react';
import { Head, Navbar, Footer, ReusableModal, ShareIcons } from './index';
import { useUserContext } from '../contexts/user-context';

interface Props {
  children: React.ReactNode;
  description?: string;
  title?: string;
  alt?: string;
  image?: string;
  keywords?: string;
  type?: string;
  publishedAt?: string;
  updatedAt?: string;
  author_name?: string;
  MIME?: string;
  slug?: string;
}

const Layout = (props: Props) => {
  const { reusableModalState, reusableModalValue } = useUserContext();
  return (
    <React.Fragment>
      <Head
        description={props.description}
        title={props.title}
        image={props.image}
        alt={props.alt}
        keywords={`${props.keywords} 'digital assets,blockchain,Ethereum,appreciation,appreciators,creators,platform,smart contracts,collections,assets,NFTs,ownership,transactions,decentralized,marketplace,tokenization,blockchain'`}
        type={props.type}
        publishedAt={props.publishedAt}
        updatedAt={props.updatedAt}
        author_name={props.author_name}
        MIME={props.MIME}
      />
   
      <Navbar />
      <main className='px-4 lg:px-20 relative'>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
