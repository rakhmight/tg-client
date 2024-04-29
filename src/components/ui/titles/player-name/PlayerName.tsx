import { FC } from 'react'

interface PlayerNameProps {
    isOwn: boolean;
    name: string
}

const PlayerName : FC<PlayerNameProps> = ({ name, isOwn }) => {
    return(
        <>
        {
            isOwn && (
                <p className='text-[var(--special-color)] font-semibold'>{name}</p>
            ) || (
                <p>{name}</p>
            )
        }
        </>
    )
}

export default PlayerName