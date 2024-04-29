import { FC, useEffect, useState } from 'react'
import ArenaLayout from '@/components/layouts/ArenaLayout'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Text } from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions/useActions';
import { socket } from '@/socket';
import { GoDotFill } from "react-icons/go";

const Arena : FC = () => {
    const navigate = useNavigate()
    const { playerStatus, gameStatus, rounds } = useSelector((state:RootState)=>state)
    const { updateBlockPlayersData, updateBlockData, updateLastRoundResults, updateRoundStatus } = useActions()

    const [timer, setTimerInst] = useState(0)
    const [block, setBlock] = useState<number | undefined>(undefined)

    useEffect(() => {
        if(!playerStatus.value.inGame && !gameStatus.value.isStart || playerStatus.value.inGame && !gameStatus.value.isStart) navigate('/')

        socket.on('clients-update-block-data', (data) => {
            updateBlockData({ round: gameStatus.value.round, blockData: data.blockData })
        })

        socket.on('clients-show-results', (data) => {
            updateLastRoundResults(data)
            updateRoundStatus({ round: gameStatus.value.round, status: true })
            navigate('/results')
        })

        socket.on('clients-show-results', (data) => {
            updateLastRoundResults(data)
            updateRoundStatus({ round: gameStatus.value.round, status: true })
            navigate('/results')
        })
        socket.on('admin-show-results', (data) => {
            if(playerStatus.value.role=='admin') {
                updateLastRoundResults(data)
                updateRoundStatus({ round: gameStatus.value.round, status: true })
                navigate('/results')
            }
        })
    })

    useEffect(() => {
        if(playerStatus.value.inGame && gameStatus.value.isStart){
            if(rounds.value[gameStatus.value.round].timer) setTimerInst(rounds.value[gameStatus.value.round].timer)
        }
    }, [])

    useEffect(() => {
        const timerInst = setTimeout(() => {                          
            if(timer > 0) setTimerInst(timer - 1)

            if(timer==0) {                    
                if(playerStatus.value.role == 'admin'){                        
                    socket.emit('game-get-results', { round: gameStatus.value.round })
                }                    
                clearTimeout(timerInst)
            }
        }, 1000)
    
        return () => {
          clearTimeout(timerInst)
        }
    }, [timer])

    const choiceBlock = (id:number) => {
        if(playerStatus.value.role == 'player' && timer != 0){
            setBlock(id)
            updateBlockPlayersData({ round: gameStatus.value.round, id, playerID: playerStatus.value.playerID })
                
            if( block!=id ) socket.emit('user-choice-block', { block: id, playerID: playerStatus.value.playerID, round: gameStatus.value.round })
        }
    }

    return(
        <ArenaLayout>
            <div className='absolute w-full top-0 h-[60px] bg-[var(--main-color)] flex items-center justify-center gap-10 text-white'>
                <Text>Раунд { gameStatus.value.round+1 }</Text>
                <Text className={timer==0 ? 'text-[var(--red-color)]' : ''}>Время: { timer }</Text>
                {
                    playerStatus.value.role == 'player' && (
                        <Text>{ playerStatus.value.hearts } <span className='text-[var(--red-color)]'>❤</span></Text>
                    )
                }
            </div>

            <div className='flex w-full justify-center items-center'>
                <div className='w-[30%] flex gap-10 justify-around items-center flex-wrap'>
                    {
                        rounds.value.length && rounds.value[gameStatus.value.round].blocksData.map( blockData => (
                            <div
                            onClick={ () => choiceBlock(blockData.id) }
                            className='bg-[var(--main-color)] w-[100px] h-[100px] rounded flex items-center justify-center hover:cursor-pointer'
                            key={blockData.id}
                            >
                                {
                                    block == blockData.id && (
                                        <div className='relative'>
                                            <div className='absolute top-[-15px] flex w-full justify-center'>
                                                <Icon color='var(--special-color)' as={GoDotFill} />
                                            </div>
                                            
                                            <Text className='text-[var(--special-color)] font-semibold'>{ blockData.players.length }</Text>
                                        </div>
                                    ) || (
                                        <Text className='text-white font-semibold'>{ blockData.players.length }</Text>
                                    )
                                }
                            </div>
                        ) )
                    }
                </div>
            </div>
        </ArenaLayout>
    )
}

export default Arena