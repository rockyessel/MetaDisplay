import React from 'react';

interface Props {
  percent: number;
  circle_styles: string;
  text_styles: string;
}

const CircleProgressbar = (props: Props) => {
  const circumference = 60 * 2 * Math.PI;

  return (
    <div className='flex items-center justify-center overflow-hidden rounded-full'>
      <svg className='w-40 h-40 transform -rotate-90'>
        <circle
          className='text-gray-300'
          strokeWidth='10'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='80'
          cy='80'
        />
        <circle
          className={`${
            !props.circle_styles ? 'text-blue-600' : props.circle_styles
          }`}
          strokeWidth='10'
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (props.percent / 100) * circumference
          }
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='80'
          cy='80'
        />
      </svg>
      <span className={`absolute text-xl ${!props.text_styles ? 'text-blue-700' : props.text_styles}`}>
        {props.percent}%
      </span>
    </div>
  );
};

export default CircleProgressbar;
