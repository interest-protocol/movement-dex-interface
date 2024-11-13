import { FC } from 'react';

import { SVGProps } from './svg.types';

const INR: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9451)">
      <g clipPath="url(#clip0_303_9451)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.0004 29.6667C30.6804 29.6667 33.667 26.68 33.667 23C33.667 19.32 30.6804 16.3333 27.0004 16.3333C23.3204 16.3333 20.3337 19.32 20.3337 23C20.3337 26.68 23.3204 29.6667 27.0004 29.6667ZM27.0004 27C29.2084 27 31.0004 25.208 31.0004 23C31.0004 20.792 29.2084 19 27.0004 19C24.7924 19 23.0004 20.792 23.0004 23C23.0004 25.208 24.7924 27 27.0004 27Z"
          fill="#1A47B8"
        />
        <path
          d="M27.0003 24.3334C27.7366 24.3334 28.3336 23.7364 28.3336 23C28.3336 22.2636 27.7366 21.6667 27.0003 21.6667C26.2639 21.6667 25.6669 22.2636 25.6669 23C25.6669 23.7364 26.2639 24.3334 27.0003 24.3334Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-1 29.6667H55V43H-1V29.6667Z"
          fill="#249F58"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-1 3H55V16.3333H-1V3Z"
          fill="#FF6C2D"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9451"
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
          result="effect1_dropShadow_303_9451"
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
          in2="effect1_dropShadow_303_9451"
          result="effect2_dropShadow_303_9451"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9451"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9451">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default INR;
