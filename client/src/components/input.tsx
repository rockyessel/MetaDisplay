import React from 'react';

interface Props {
  value?: string;
  name: string;
  onChange: (event:  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>|any) => void;
  placeholder?: string;
  styles?: string;
  type?: string;
  label?: string;
  elementType: string;
  disabled?: boolean | undefined;
  step?: number | string | undefined
}

const Input = (props: Props) => {
  return (
    <label className='w-full flex flex-col gap-1'>
      <span className='font-medium text-lg'>{props.label}</span>

      {props.elementType === 'input' && (
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          step={props.step}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          className={`${props.styles} py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] w-full lg:w-2xl focus:ring-2 focus:ring-violet-700`}
        />
      )}

      {props.elementType === 'textarea' && (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.styles} py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] w-full lg:w-2xl focus:ring-2 focus:ring-violet-700`}
        />
      )}

      {props.elementType === 'file' && (
        <input
          name={props.name}
          type={'file'}
          value={props.value}
          onChange={props.onChange}
          className={`${props.styles} file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]`}
        />
      )}
    </label>
  );
};

export default Input;
