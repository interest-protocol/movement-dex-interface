import { FC } from 'react';

import { SVGProps } from './svg.types';

const USD: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9411)">
      <g clipPath="url(#clip0_303_9411)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 3H31V21.6667H7V3Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31 3L31 5.66667H63V3H31ZM31 8.33333V11H63V8.33333H31ZM31 13.6667V16.3333H63V13.6667H31ZM31 19L31 21.6667H63V19H31ZM7 24.3333V27H63V24.3333H7ZM7 29.6667V32.3333H63V29.6667H7ZM7 35V37.6667H63V35H7ZM7 40.3333V43H63V40.3333H7Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.66635 5.66668V8.33335H12.333V5.66668H9.66635ZM14.9997 5.66668V8.33335H17.6663V5.66668H14.9997ZM20.333 5.66668V8.33335H22.9997V5.66668H20.333ZM25.6663 5.66668V8.33335H28.333V5.66668H25.6663ZM22.9997 8.33335V11H25.6663V8.33335H22.9997ZM17.6663 8.33335V11H20.333V8.33335H17.6663ZM12.333 8.33335V11H14.9997V8.33335H12.333ZM9.66635 11V13.6667H12.333V11H9.66635ZM14.9997 11V13.6667H17.6663V11H14.9997ZM20.333 11V13.6667H22.9997V11H20.333ZM25.6663 11V13.6667H28.333V11H25.6663ZM9.66635 16.3333V19H12.333V16.3333H9.66635ZM14.9997 16.3333V19H17.6663V16.3333H14.9997ZM20.333 16.3333V19H22.9997V16.3333H20.333ZM25.6663 16.3333V19H28.333V16.3333H25.6663ZM22.9997 13.6667V16.3333H25.6663V13.6667H22.9997ZM17.6663 13.6667V16.3333H20.333V13.6667H17.6663ZM12.333 13.6667V16.3333H14.9997V13.6667H12.333Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9411"
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
          result="effect1_dropShadow_303_9411"
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
          in2="effect1_dropShadow_303_9411"
          result="effect2_dropShadow_303_9411"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9411"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9411">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default USD;
