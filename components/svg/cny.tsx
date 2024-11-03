import { FC } from 'react';

import { SVGProps } from './svg.types';

const CNY: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9439)">
      <g clipPath="url(#clip0_303_9439)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="#F93939" />
        <path
          d="M57.6667 3H12.3333C9.38781 3 7 5.38781 7 8.33333V37.6667C7 40.6122 9.38781 43 12.3333 43H57.6667C60.6122 43 63 40.6122 63 37.6667V8.33333C63 5.38781 60.6122 3 57.6667 3Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6616 22.28L17.7416 24.3413L18.4883 19.976L15.3203 16.8826L19.7016 16.2506L21.6616 12.2773L23.619 16.2506L28.0003 16.8826L24.827 19.976L25.579 24.3386L21.6616 22.28ZM31.0003 11H33.667V13.6666H31.0003V11ZM33.667 16.3333H36.3336V19H33.667V16.3333ZM33.667 21.6666H36.3336V24.3333H33.667V21.6666ZM31.0003 27H33.667V29.6666H31.0003V27Z"
          fill="#FFDA2C"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9439"
        x="0.142858"
        y="0.714286"
        width="53.7143"
        height="53.7143"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4.57143" />
        <feGaussianBlur stdDeviation="3.42857" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.258824 0 0 0 0 0.278431 0 0 0 0 0.298039 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_303_9439"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.285714" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.258824 0 0 0 0 0.278431 0 0 0 0 0.298039 0 0 0 0.32 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_303_9439"
          result="effect2_dropShadow_303_9439"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9439"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9439">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CNY;
