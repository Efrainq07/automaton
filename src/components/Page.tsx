import React from 'react';

export function Page ({ children, container, itemsStart, scrollable }: Props) {
  return (
    <div 
      className={`flex flex-shrink flex-col ${scrollable? 'min-h-dvh' : 'h-dvh'} pt-[80px] justify-start ${itemsStart ? 'items-start' : 'items-center'} text-white custom-bg w-full ${container && 'container'}`}
    >
      {children}
    </div>
  );
};

type Props = {
  children: any,
  container?: boolean
  itemsStart?: boolean
  scrollable?: boolean
}