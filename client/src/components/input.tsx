import React from 'react';

interface Props {
  value?: string;
  name: string;
  onChange: () => void;
  placeholder?: string;
  styles?: string;
  type?: string;
  label: string;
  elementType: string;
}

const Input = (props: Props) => {
  return (
    <label className='w-full flex flex-col gap-1'>
      <span className='font-medium text-xl'>{props.label}</span>

      {props.elementType === 'input' && (
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.styles} py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}
        />
      )}

      {props.elementType === 'textarea' && (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.styles} py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]`}
        />
      )}

      {props.elementType === 'file' && (
        <input
          name={props.name}
          type={'file'}
          value={props.value}
          onChange={props.onChange}
          className={`${props.styles}`}
        />
      )}
    </label>
  );
};

export default Input;
