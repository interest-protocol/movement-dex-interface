import { FC } from 'react';

import { SVGProps } from './svg.types';

const JPY: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9457)">
      <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      <path
        d="M26.9993 32.3327C32.154 32.3327 36.3327 28.154 36.3327 22.9993C36.3327 17.8447 32.154 13.666 26.9993 13.666C21.8447 13.666 17.666 17.8447 17.666 22.9993C17.666 28.154 21.8447 32.3327 26.9993 32.3327Z"
        fill="#F93939"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9457"
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
          result="effect1_dropShadow_303_9457"
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
          in2="effect1_dropShadow_303_9457"
          result="effect2_dropShadow_303_9457"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9457"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default JPY;
