import { FC, useState, useEffect } from 'react'
import PlayerName from '../../titles/player-name/PlayerName'
import { Avatar } from '@chakra-ui/react'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react'

interface PlayerResultProps {
    name: string,
    playerID: string,
    hearts?: number
}

const PlayerResult : FC<PlayerResultProps> = ({ name, playerID, hearts }) => {

    const { playerStatus, gameStatus, players } = useSelector((state:RootState)=>state)

    const [result, setResult] = useState<'plus'|'minus'>()

    useEffect(() => {
        console.log(gameStatus.value.lastRoundResults);
        
        if(gameStatus.value.lastRoundResults.losers.length && gameStatus.value.lastRoundResults.winners){
            // check winners
            const playerIsWin = gameStatus.value.lastRoundResults.winners.find(p => p == playerID)
            
            if(playerIsWin) setResult('plus')
            console.log(result);
            
            // check losers
            const playerIsLose = gameStatus.value.lastRoundResults.losers.find(p => p.playerID == playerID)
            if(playerIsLose) setResult('minus')
        }
    })

    const getUserRole = (playerID:string) => {
        const targetUser = players.value.find(u => u.playerID == playerID)
        if(targetUser) return targetUser.role
    }

    return(
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Avatar size='sm' name={name} />
                <PlayerName name={name} isOwn={playerStatus.value.playerID == playerID} />
            </div>

            {
                result && getUserRole(playerID) != 'admin' && getUserRole(playerID) != 'observer' && (
                    <div className='flex gap-2'>
                        {
                            result == 'plus' && (
                                <Text color='green'>+1<span className='text-[var(--red-color)]'>❤</span></Text>
                            )
                            || result == 'minus' && (
                                <Text color='var(--red-color)'>-1<span className='text-[var(--red-color)]'>❤</span></Text> 
                            )
                        }
        
                        <Text color='#888'>({hearts}❤)</Text>
                    </div>
                )
            }
        </div>
    )
}

export default PlayerResult