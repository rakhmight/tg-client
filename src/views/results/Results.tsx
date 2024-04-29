import { FC, useEffect, useState } from 'react'
import ResultsLayout from '@/components/layouts/ResultsLayout'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Divider, Alert, AlertIcon, IconButton } from '@chakra-ui/react'
import PlayerResult from '@/components/ui/list-item/player-result/PlayerResult';
import { MdPlayArrow } from "react-icons/md";
import { socket } from '@/socket';
import { useActions } from '@/hooks/useActions/useActions';

const Results : FC = () => {

    const navigate = useNavigate()
    const { playerStatus, rounds, players } = useSelector((state:RootState)=>state)

    const { setRoundStartTime, setRound, setGameStatus } = useActions()

    const [currentRound, setCurrentRound] = useState<undefined | number>(undefined)
    const [admin, setAdmin] = useState<PlayerI>()

    useEffect(() => {
        if(!playerStatus.value.inGame) navigate('/')

        const admin = players.value.find(player => player.role == 'admin')
        if(admin) setAdmin(admin as PlayerI)

        const hasCompletedRound = rounds.value.find(round => round.isCompleted)
        if(hasCompletedRound){
            const roundData = rounds.value.find(round => !round.isCompleted)
            if(roundData) setCurrentRound(rounds.value.indexOf(roundData)+1)            
        }

        socket.on('clients-to-round', (data) => {
            setRoundStartTime(data)
            setRound(data.round)
            setGameStatus(true)
            navigate('/arena')
        })

        socket.on('admin-to-round', (data) => {            
            setRoundStartTime(data)
            setRound(data.round)
            setGameStatus(true)
            navigate('/arena')
        })
    })

    const startNextRound = () => {
        socket.emit('game-next-round', { round: currentRound || 0 })
    }

    return(
        <ResultsLayout>
            <div className='w-[60%] bg-[var(--main-color)] rounded px-5 py-7 min-h-[650px] max-h-[650px] overflow-y-auto text-white flex flex-col gap-3'>
                <div className='flex justify-between items-center relative'>
                    {
                        !currentRound && (
                            <>
                                <Text color='var(--special-color)' fontWeight='700' className='uppercase'>Начало игры</Text>
                                <Text fontSize='sm' color='#888'>Следующий раунд: 1</Text>
                            </>
                        ) || (
                            <>
                                <Text color='var(--special-color)' fontWeight='700' className='uppercase'>Раунд { currentRound }: результаты</Text>
                                <Text fontSize='sm' color='#888'>Следующий раунд: { currentRound! + 1 }</Text>
                            </>
                        )
                    }

                    {
                        playerStatus.value.role == 'admin' && (
                            <IconButton
                            className='absolute'
                            colorScheme='whiteAlpha'
                            size='small'
                            isRound={true}
                            variant='outline'
                            aria-label='start'
                            icon={<MdPlayArrow/>}
                            onClick={startNextRound}
                            />
                        )
                    }
                </div>

                <Divider />

                <div className='mt-5 flex flex-col gap-10'>
                    <div className='flex flex-col gap-2.5'>
                        <Text className='py-1.5 px-2 bg-[#4a5160] text-[#ccc] rounded'>Администратор</Text>
                        <PlayerResult {...admin!} />
                    </div>

                    {
                        currentRound && rounds.value[currentRound].zeroBlocks && (
                            <Alert status='info' bgColor='var(--main-color)' className='border-[1px] border-[#777]'>
                                <AlertIcon />
                                Следующий раунд будет иметь нулевые блоки (блоки с 0 будут считаться наименьшими)
                            </Alert>
                        )
                        || currentRound && rounds.value[currentRound].pseudoZeroBlocks && (
                            <Alert status='info' bgColor='var(--main-color)' className='border-[1px] border-[#777]'>
                                <AlertIcon />
                                Следующий раунд будет иметь нулевые блоки (блоки с 0 будут считаться наименьшими)
                            </Alert>
                        )
                    }
                    
                    <div className='flex flex-col gap-2.5'>
                        <Text className='py-1.5 px-2 bg-[#4a5160] text-[#ccc] rounded'>Игроки</Text>
                        {
                            players.value.map((player) => player.role == 'player' && (
                                <PlayerResult {...player} key={player.playerID} />
                            ))
                        }
                    </div>
                    
                    <div className='flex flex-col gap-2.5'>
                        <Text className='py-1.5 px-2 bg-[#4a5160] text-[#ccc] rounded'>Наблюдатели</Text>
                        {
                            players.value.map((player) => player.role == 'observer' && (
                                <PlayerResult {...player} key={player.playerID} />
                            ))
                        }
                    </div>
                </div>
                
            </div>
        </ResultsLayout>
    )
}

export default Results