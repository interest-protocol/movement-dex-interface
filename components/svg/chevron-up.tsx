import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronUp: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g opacity="0.6">
      <path
        d="M15.8327 12.9163L9.99935 7.08301L4.16602 12.9163"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </g>
  </svg>
);

export default ChevronUp;
