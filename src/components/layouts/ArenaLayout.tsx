import { FC, PropsWithChildren } from 'react'

const ArenaLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='h-[100vh] w-full relative flex items-center bg-[#e2e8f0]'>
            { children }
        </div>
    )
}

export default ArenaLayout