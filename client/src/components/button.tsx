import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  styles: string;
  type?: ButtonType;
  title: string;
}

const Button = (props: Props) => {
  return (
    <button
      className={`${props.styles} px-4 py-3.5 rounded-lg hover:bg-violet-700 font-medium`}
      type={props?.type}
      title={props.title}
      onClick={props?.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
