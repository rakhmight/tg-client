import { FC, PropsWithChildren } from 'react'

const LobbyLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='h-[100vh] w-full relative flex items-center bg-[#e2e8f0]'>

            { children }

            <div className='absolute w-full h-[30px] bottom-0 flex items-center justify-center bg-[var(--main-color)]'>
                <span className='text-[#ddd]'>developed with <span className='text-[var(--red-color)]'>❤</span> by Diyor Rakhimov</span>
            </div>
        </div>
    )
}

export default LobbyLayout