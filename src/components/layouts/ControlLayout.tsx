import { FC, PropsWithChildren } from 'react'

const ControlLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='w-full h-[100vh] bg-[#e2e8f0] flex flex-col items-center gap-7'>
            { children }
        </div>
    )
}

export default ControlLayout