import React, { ReactNode } from 'react';

interface mainContainerProps {
  children: ReactNode;
  className?: string;
}

function MainContainer({ children, className = '' }: mainContainerProps) {
  return (
    <div className={`mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export default MainContainer;
