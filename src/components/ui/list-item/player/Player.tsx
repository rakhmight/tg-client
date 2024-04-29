import { FC } from 'react'
import { Avatar } from '@chakra-ui/react'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import PlayerRole from '../../titles/player-role/PlayerRole';
import PlayerName from '../../titles/player-name/PlayerName';

interface PlayerProps {
    name: string,
    role: string,
    playerID: string
}

const Player : FC<PlayerProps> = ({ name, role, playerID }) => {
    const { playerStatus } = useSelector((state:RootState)=>state)

    return(
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Avatar size='sm' name={name} />
                <PlayerName name={name} isOwn={playerStatus.value.playerID == playerID} />
            </div>

            <div>
                {
                    role == 'player' && (
                        <PlayerRole role='участник' isOwn={playerStatus.value.playerID == playerID} />
                    )
                    || role == 'admin' && (
                        <PlayerRole role='администратор' isOwn={playerStatus.value.playerID == playerID} />
                    )
                    || role == 'observer' && (
                        <PlayerRole role='наблюдатель' isOwn={playerStatus.value.playerID == playerID} />
                    )
                }
            </div>
        </div>
    )
}

export default Player