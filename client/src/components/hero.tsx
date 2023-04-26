import React from 'react';
import { MdOutlineVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';
import CollectionList from './collection-list';

interface Props {
  collections: any[];
}

const Hero = (props: Props) => {
  const [currentSlider, setCurrentSlider] = React.useState(0);
  const collectionLength = props?.collections?.length - 1;
  const repeat = currentSlider === collectionLength ? 0 : currentSlider + 1;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlider(repeat);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlider, repeat]);

  return (
    <React.Fragment>
      {props?.collections?.map(
        (collection, index) =>
          index === currentSlider && (
            <CollectionList key={index} collection={collection} />
          )
      )}
    </React.Fragment>
  );
};

export default Hero;
