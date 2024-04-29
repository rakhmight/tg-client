import { FC } from 'react'

interface PlayerRoleProps {
    role: string;
    isOwn: boolean;
}

const PlayerRole : FC<PlayerRoleProps> = ({ role, isOwn }) => {
    
    return(
        <>
        {
            isOwn && (
                <p className='text-[var(--special-color)] font-semibold'>{role}</p>
            ) || (
                <p className='text-[#777]'>{role}</p>
            )
        }
        </>
    )
}

export default PlayerRole