import { FC } from 'react';

import { SVGProps } from './svg.types';

const Picture: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 41 41"
    fill="none"
    {...props}
  >
    <path
      d="M13.6546 9.31104C15.9719 9.31308 17.8502 11.1914 17.8523 13.5067C17.8523 15.826 15.9739 17.7043 13.6546 17.7043C11.3394 17.7043 9.45898 15.826 9.45898 13.5067"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M6.74414 32.5519L10.5906 27.4375H10.8234L16.5931 32.6152H17.0117L25.8235 19.7915H26.1441L32.6223 28.93"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M39.3861 24.4712V1.61475H1.61523V39.3856H39.3861V33.1993"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
  </svg>
);

export default Picture;
