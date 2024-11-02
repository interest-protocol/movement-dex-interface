import { FC } from 'react';

import { SVGProps } from './svg.types';

const BRL: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9445)">
      <g clipPath="url(#clip0_303_9445)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="#1A47B8" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.95726 3H-1V9.66667L49.0104 43L55 43V36.3333L4.95726 3Z"
          fill="white"
        />
        <path
          d="M0.986929 3L55 39.0945V43L53.0597 43L-1 6.86816V3H0.986929Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.6667 3H55V9.66667C55 9.66667 20.3595 31.8748 4.33333 43H-1V36.3333L49.6667 3Z"
          fill="white"
        />
        <path
          d="M55 3H53.1914L-1 39.1256V43H0.986929L55 6.89737V3Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.3655 3H34.681V15.3382H55V30.6537H34.681V43H19.3655V30.6537H-1V15.3382H19.3655V3Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.5789 3H31.4211V18.3846H55V27.6154H31.4211V43H22.5789V27.6154H-1V18.3846H22.5789V3Z"
          fill="#F93939"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9445"
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
          result="effect1_dropShadow_303_9445"
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
          in2="effect1_dropShadow_303_9445"
          result="effect2_dropShadow_303_9445"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9445"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9445">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BRL;
