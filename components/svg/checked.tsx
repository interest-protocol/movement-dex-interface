import { FC } from 'react';

import { SVGProps } from './svg.types';

const Checked: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 20 20" {...props}>
    <path
      d="M17.8447 4.9998L7.49948 15.345L2.1543 9.9998L3.33281 8.82129L7.49948 12.988L16.6661 3.82129L17.8447 4.9998Z"
      fill="currentColor"
    />
  </svg>
);

export default Checked;
