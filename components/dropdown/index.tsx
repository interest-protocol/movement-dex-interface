import { Button, Div } from '@stylin.js/elements';
import { FC, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { ChevronRightSVG } from '../svg';
import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({ onSelect, defaultValue, menuItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (value: string) => {
    onSelect(value);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    <Div ref={dropdownRef} position="relative">
      <Button
        mb="0.5rem"
        py="0.2rem"
        bg="none"
        opacity="0.7"
        width="3.438rem"
        height="1.8rem"
        display="flex"
        color="primary"
        fontSize="1rem"
        cursor="pointer"
        alignItems="center"
        border="none"
        borderRadius="0.5rem"
        onClick={toggleDropdown}
        textTransform="capitalize"
        justifyContent="center"
      >
        {defaultValue}
        <Div width="1.5rem" height="1.5rem">
          <ChevronRightSVG maxHeight="100%" maxWidth="100%" width="100%" />
        </Div>
      </Button>
      {isDropdownOpen && (
        <Div
          p="0.3rem"
          zIndex={999}
          width="3.438rem"
          maxHeight="32rem"
          position="absolute"
          borderRadius="0.25rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="black"
        >
          {menuItems.map((value: string | number) => (
            <Div
              p="0.5rem"
              key={v4()}
              display="flex"
              fontSize="1rem"
              cursor="pointer"
              fontFamily="Satoshi"
              alignItems="flex-start"
              background="lowContainer"
              textTransform="capitalize"
              justifyContent="flex-start"
              nHover={{
                opacity: 0.7,
                transition: 'all 0.5s ease-in-out',
              }}
              onClick={() => handleMenuItemClick(value as string)}
            >
              {value}
            </Div>
          ))}
        </Div>
      )}
    </Div>
  );
};

export default Dropdown;
