import { FC } from 'react';

import { SVGProps } from './svg.types';

const AUD: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9421)">
      <g clipPath="url(#clip0_303_9421)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="#1A47B8" />
        <path
          d="M57.6667 3H12.3333C9.38781 3 7 5.38781 7 8.33333V37.6667C7 40.6122 9.38781 43 12.3333 43H57.6667C60.6122 43 63 40.6122 63 37.6667V8.33333C63 5.38781 60.6122 3 57.6667 3Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3335 33.6666L15.0002 32.3333L16.3335 29.6666L17.6668 32.3333L20.3335 33.6666L17.6668 35L16.3335 37.6666L15.0002 35L12.3335 33.6666ZM39.0002 11V13.6666H41.6668V11H39.0002ZM47.0002 13.6666V16.3333H49.6668V13.6666H47.0002ZM36.3335 19V21.6666H39.0002V19H36.3335ZM44.3335 21.6666V24.3333H47.0002V21.6666H44.3335ZM41.6668 29.6666V32.3333H44.3335V29.6666H41.6668Z"
          fill="white"
        />
        <path
          d="M32.3329 9.79302H13.6662C12.1934 9.79302 10.9995 10.9869 10.9995 12.4597V25.793C10.9995 27.2658 12.1934 28.4597 13.6662 28.4597H32.3329C33.8056 28.4597 34.9995 27.2658 34.9995 25.793V12.4597C34.9995 10.9869 33.8056 9.79302 32.3329 9.79302Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.666 20.4597H13.666V17.793H21.666V12.4597H24.3327V17.793H32.3327V20.4597H24.3327V25.793H21.666V20.4597ZM28.3327 23.1264V25.793H32.3327V23.1264H28.3327ZM28.3327 12.4597V15.1263H32.3327V12.4597H28.3327ZM13.666 23.1264V25.793H17.666V23.1264H13.666ZM13.666 12.4597V15.1263H17.666V12.4597H13.666Z"
          fill="#F93939"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9421"
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
          result="effect1_dropShadow_303_9421"
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
          in2="effect1_dropShadow_303_9421"
          result="effect2_dropShadow_303_9421"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9421"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9421">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AUD;
