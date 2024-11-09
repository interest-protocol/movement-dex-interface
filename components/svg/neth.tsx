import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const NETH: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => {
  const id = useId();

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip0_${id})`}>
        <rect width="40" height="40" fill={`url(#paint0_linear_${id})`} />
        <path
          d="M20.361 7.25L20.1948 7.81488V24.2062L20.361 24.3721L27.9697 19.8747L20.361 7.25Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
        <path
          d="M20.3611 7.25L12.7524 19.8747L20.3611 24.3722V16.4163V7.25Z"
          fill="currentColor"
          fillOpacity="0.36"
        />
        <path
          d="M20.3612 26.8468L20.2676 26.9609V32.7999L20.3612 33.0734L27.9745 22.3516L20.3612 26.8468Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
        <path
          d="M20.3611 33.0735V26.8468L12.7524 22.3516L20.3611 33.0735Z"
          fill="currentColor"
          fillOpacity="0.36"
        />
        <path
          d="M20.3608 24.3737L27.9694 19.8763L20.3608 16.418V24.3737Z"
          fill="currentColor"
        />
        <path
          d="M12.7524 19.8763L20.361 24.3738V16.418L12.7524 19.8763Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <linearGradient
          id={`paint0_linear_${id}`}
          x1="40"
          y1="20"
          x2="0"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F36F61" />
          <stop offset="1" stopColor="#FFAC24" />
        </linearGradient>
        <clipPath id={`clip0_${id}`}>
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NETH;
