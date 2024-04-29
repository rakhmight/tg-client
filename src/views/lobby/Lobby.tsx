import { FC, useState, useEffect } from 'react'
import LobbyLayout from '@/components/layouts/LobbyLayout'
import { Input, Button, Spinner, Icon, Divider  } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react'
import Player from '@/components/ui/list-item/player/Player'
import { MdFormatListBulleted, MdOutlineCheckCircleOutline } from "react-icons/md"
import { socket } from '@/socket'
import { genPseudoRandomID } from '@/utils/genPseudoRandomID'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions/useActions';
import { useNavigate } from "react-router-dom"

interface ErrorI {
    status: boolean;
    msg: string
}

const Lobby : FC = () => {

    const navigate = useNavigate()

    const { players, playerStatus } = useSelector((state:RootState)=>state)
    const { setPlayers, setPlayerStatus, setRounds, setPlayerHearts, setPlayersHearts } = useActions()
    const [startGame, setStartGame] = useState(false)

    const [name, setName] = useState<string>('')
    const [id, setID] = useState<string>('')
    const [step, setStep] = useState<string>('auth')
    const [blockJoinBtn, setBlockJoinBtn] = useState<boolean>(false)

    const [error, setError] = useState<ErrorI>({ status: false, msg: '' })
    const [success, setSuccess] = useState<boolean>(false)

    const joinToGame = () => {
        setError({ status: false, msg: '' })
        const playerID = genPseudoRandomID()
        
        setID(playerID)        
        socket.emit('join-to-game', { name, id: playerID })
        setBlockJoinBtn(true)
    }

    useEffect(()=>{
        socket.on(`join-to-game-${id}`, (data) => {

            if(data.connectingIsPossible){
                setSuccess(true)
                const playersList:Array<PlayerI> = data.players.map((player:PlayerI) => {
                    return {
                        name: player.name,
                        hearts: player.hearts,
                        role: player.role,
                        playerID: player.playerID
                    }
                })
                setPlayers(playersList)
                setPlayerStatus({ name, playerID: id, role: data.role, hearts: 0, inGame: true })

                if(data.role == 'admin') {
                    setTimeout(() => navigate('/control'), 2000)
                } else {
                    setTimeout(()=>{
                        setSuccess(false)
                        setStep('wait')
                    }, 2000)
                }
            } else {
                setBlockJoinBtn(false)
                
                if(data.reason == 'full') setError({ status: true, msg: 'Присоединилось максимальное количество игроков (30)' })
                if(data.reason == 'began') setError({ status: true, msg: 'Игра уже началась' })
                if(data.reason == 'already') setError({ status: true, msg: 'Игрок уже присоединился с этого устройства' })
            }
        })

        socket.on('clients-start-game', (data) => {
            if(playerStatus.value.inGame){
                setRounds(data.rounds)
                setPlayerHearts(data.hearts)
                setPlayersHearts(data.hearts)
                setStartGame(true)

                setTimeout(() =>{
                    navigate('/results')
                }, 2000)
            }
        })
    })

    return(
        <LobbyLayout>
            <div className='w-full flex flex-col items-center gap-7'>
                <div className='absolute w-full top-[200px] flex justify-center'>
                    <p className='text-[3rem] font-[ModernWarfare] text-[var(--main-color)]'>TRUST GAME</p>
                </div>

                {
                    step=='auth' && (
                        <div className='w-[500px] min-h-[180px] bg-[var(--main-color)] rounded px-5 py-7 flex justify-center flex-col gap-5'>
                            <Input
                            placeholder='Напишите своё имя'
                            _placeholder={{ opacity: 0.6, color: 'white' }}
                            size='md'
                            value={name}
                            onChange={ (event) => setName(event.target.value) }
                            color='white'
                            />
                            
                            <Button
                            colorScheme='whiteAlpha'
                            variant='outline'
                            onClick={() => joinToGame()}
                            isDisabled={name ? false : true || blockJoinBtn}
                            >Присоединиться к игре</Button>
                        </div>
                    ) ||
                    step == 'wait' && (
                        <div className='w-[500px] min-h-[380px] max-h-[380px] bg-[var(--main-color)] rounded px-5 py-7 flex flex-col gap-3 text-[white]'>
                            <div className='flex gap-2 items-center'>
                                <Icon as={MdFormatListBulleted}></Icon>
                                <p>Список игроков:</p>
                            </div>

                            <Divider />

                            <div className='flex flex-col gap-2 max-h-[310px] overflow-y-auto pr-2'>
                                {
                                    players.value.map(player => (
                                        <Player {...player} key={player.playerID} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                <div className='w-[500px] absolute top-[600px]'>
                    {
                        error.status && (
                            
                        <Alert status='error' backgroundColor='var(--red-color)'>
                            <AlertIcon color='white' />
                            <AlertTitle color='white'>{error.msg}</AlertTitle>
                        </Alert>
                        )
                    }

                    {
                        success && (
                            <Alert status='success'>
                                <AlertIcon />
                                <AlertTitle>Подключение к игре..</AlertTitle>
                            </Alert>  
                        )
                    }
                </div>

                {
                        step == 'wait' && !startGame && (
                            <div className='absolute top-[700px] flex flex-col items-center gap-3'>
                                <Spinner
                                thickness='4px'
                                speed='0.65s'
                                color='var(--main-color)'
                                size='xl'
                                />

                                <p className='text-[var(--main-color)] opacity-[0.7]'>Ожидание начала игры</p>
                            </div>
                        ) || step == 'wait' && startGame && (
                            <div className='absolute top-[700px] flex flex-col items-center gap-2'>
                                <Icon color='green' as={MdOutlineCheckCircleOutline}></Icon>
                                <p className='text-[var(--main-color)] opacity-[0.7]'>Игра начинается!</p>
                            </div>
                        )
                    }
            </div>
        </LobbyLayout>
    )
}

export default Lobby