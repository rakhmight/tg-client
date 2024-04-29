import { FC, PropsWithChildren } from 'react'

const ResultsLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='h-[100vh] w-full flex items-center justify-center bg-[#e2e8f0]'>
            { children }
        </div>
    )
}

export default ResultsLayout