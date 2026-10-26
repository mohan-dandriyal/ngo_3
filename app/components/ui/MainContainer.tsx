
import React, { ReactNode } from 'react'

interface mainContainerProps {
    children: ReactNode
}

function MainContainer({ children }: mainContainerProps) {
    return (
        <div className='max-w-360 mx-auto px-5 sm:px-8 lg:px-[50px]'>
            {children}
        </div>
    )
}

export default MainContainer