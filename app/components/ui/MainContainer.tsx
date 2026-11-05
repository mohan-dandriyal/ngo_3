import React, { ReactNode } from 'react';

interface mainContainerProps {
  children: ReactNode;
  className?: string;
}

function MainContainer({ children, className = '' }: mainContainerProps) {
  return (
    <div className='px-4 sm:px-8 lg:px-12 '>
    <div className={`mx-auto max-w-[1366px]   ${className}`}>
      {children}
    </div>
    </div>
  );
}

export default MainContainer;
