import React from 'react';
import Button from '../button';

interface Props {
  handleClick: () => void;
  children: React.ReactNode;
  title: string;
  styles: string;
}

const IconItem = (props: Props) => {
  return (
    <Button
      type='button'
      styles={props.styles}
      title={props.title}
      handleClick={props?.handleClick}
    >
      {props.children}
    </Button>
  );
};

export default IconItem;
