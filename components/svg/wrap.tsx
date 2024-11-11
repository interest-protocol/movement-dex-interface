import { FC } from 'react';

import { SVGProps } from './svg.types';

const Wrap: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 20"
    fill="none"
    {...props}
  >
    <path
      d="M14.249 0.689453L10.7188 4.21973L11.7793 5.28027L13.499 3.56055V11.5H5.99902V13H14.999V3.56055L16.7188 5.28027L17.7793 4.21973L14.249 0.689453ZM2.99902 7V16.4395L1.2793 14.7197L0.21875 15.7803L3.74902 19.3105L7.2793 15.7803L6.21875 14.7197L4.49902 16.4395V8.5H11.999V7H2.99902Z"
      fill="currentColor"
    />
  </svg>
);

export default Wrap;
