import { FC } from 'react';

import { SVGProps } from './svg.types';

const USD: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 54 55" {...props}>
    <g filter="url(#filter0_dd_303_9433)">
      <g clipPath="url(#clip0_303_9433)">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
        <path
          d="M27.5489 33.9804H26.4509L26.7254 29.5882C26.7099 29.3569 26.5988 29.2961 26.1764 29.3137L21.7842 29.8627C21.7842 29.8627 22.6077 28.7647 22.6077 28.2157C22.6077 27.6667 17.6666 24.098 17.6666 24.098C17.6666 24.098 18.7646 23.8235 19.0391 23.549C19.3136 23.2745 17.9411 20.2549 17.9411 20.2549C17.9411 20.2549 20.7307 21.3529 20.9607 21.0784C21.1906 20.8039 21.5097 19.7059 21.5097 19.7059C21.5097 19.7059 23.7058 22.1765 24.2548 22.1765C24.8038 22.1765 23.1568 16.1373 23.1568 16.1373C23.1568 16.1373 24.5293 17.2353 25.0783 17.2353C25.6273 17.2353 26.9999 13.6667 26.9999 13.6667C26.9999 13.6667 28.3724 17.2353 28.647 17.2353C28.9215 17.2353 30.843 16.1373 30.843 16.1373C30.843 16.1373 29.4705 21.902 29.745 22.1765C30.0195 22.451 32.4901 19.7059 32.4901 19.7059C32.4901 19.7059 32.7646 20.8039 33.0391 21.0784C33.3136 21.3529 36.0587 20.2549 36.0587 20.2549C36.0587 20.2549 34.6862 23.2745 34.9607 23.549C35.2352 23.8235 36.3332 24.098 36.3332 24.098C36.3332 24.098 31.3921 27.6667 31.3921 28.2157C31.3921 28.7647 31.9411 29.8627 31.9411 29.8627L27.8234 29.3137C27.4924 29.2188 27.3777 29.2908 27.2744 29.5882L27.5489 33.9804Z"
          fill="#F93939"
        />
        <path d="M41.6666 3H55V43H41.6666V3Z" fill="#F93939" />
        <path d="M-1 3H12.3333V43H-1V3Z" fill="#F93939" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_303_9433"
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
          result="effect1_dropShadow_303_9433"
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
          in2="effect1_dropShadow_303_9433"
          result="effect2_dropShadow_303_9433"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_9433"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_303_9433">
        <rect x="7" y="3" width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default USD;
