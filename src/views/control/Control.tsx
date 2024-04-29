import { RootState } from '@/store'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Icon, Divider, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import ControlLayout from '@/components/layouts/ControlLayout'
import { useNavigate } from 'react-router-dom'
import { IoMdSettings, IoMdHeart, IoMdSquare } from "react-icons/io";
import ControlledInput from '@/components/ui/inputs/controlled-input/ControlledInput'
import ControlledParamsInput from '@/components/ui/inputs/controlled-params-input/ControlledParamsInput'
import ControlledParamsRadio from '@/components/ui/radio/controlled-params-radio/ControlledParamsRadio'
import { socket } from '@/socket'
import { MdOutlineCheckCircleOutline } from "react-icons/md"
import { useActions } from '@/hooks/useActions/useActions'

const Control : FC = () => {

    const navigate = useNavigate()
    const { players, playerStatus } = useSelector((state:RootState)=>state)

    const { setRounds, setPlayersHearts } = useActions()

    const [heartsCount, setHeartsCount] = useState(1)
    const [roundsCount, setRoundsCount] = useState(5)

    const [startingGame, setStartingGame] = useState(false)

    const [rounds, setRoundsData] = useState<Array<LightRoundI>>([])

    useEffect(() => {
        setRoundsData([])
        const roundsData = []

        for (let i = 0; i != roundsCount; i++) {
            roundsData.push({
                timer: 5,
                blocksCount: 2,
                disabledBlocks: 0,
                zeroBlocks: false,
                pseudoZeroBlocks: false
            })
        }

        setRoundsData(roundsData)
        
    }, [roundsCount])


    useEffect(() => {
        if(!playerStatus.value.inGame) navigate('/')
        
        socket.on('admin-start-game', (data) => {
            if(playerStatus.value.inGame){
                setRounds(data.rounds)
                setPlayersHearts(data.hearts)
                setStartingGame(true)
                
                setTimeout(() =>{
                    navigate('/results')
                }, 2000)
            }
        })
    })

    const startGame = () => {
        socket.emit('start-game', {
            heartsCount,
            rounds,
            playerID: playerStatus.value.playerID
        })
    }

    return(
        <ControlLayout>
        
            <div className='w-[45%] p-5 bg-[var(--main-color)] rounded mt-[70px] text-white flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <Icon as={IoMdSettings} />
                        <Text>Настройка игры</Text>
                    </div>
                    <Text color='#888' fontSize='sm'>Игроков: {players.value.length}</Text>
                </div>

                <Divider />

                <div className='flex flex-col gap-4 mt-5'>
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex items-center gap-1'>
                            <Icon color='var(--red-color)' as={IoMdHeart} />
                            <Text color='#eee'>Количество жизней:</Text>
                        </div>

                        <Slider
                        width='60%'
                        focusThumbOnChange={false}
                        value={heartsCount}
                        onChange={(value) => setHeartsCount(value)}
                        max={10}
                        min={1}
                        >
                            <SliderTrack>
                            <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='26px' color='var(--main-color)' children={heartsCount} />
                        </Slider>
                    </div>

                    <div className='flex w-full justify-between items-center'>
                        <div className='flex items-center gap-1'>
                            <Icon color='var(--special-color)' as={IoMdSquare} />
                            <Text color='#eee'>Количество раундов:</Text>
                        </div>

                        <ControlledInput value={roundsCount} changeHandler={setRoundsCount} input={{min: 5, max: 30}} />
                    </div>

                    <div className='flex justify-center mt-5'>
                        <Button colorScheme='whiteAlpha' size='sm' variant='outline' onClick={startGame}>Начать игру</Button>
                    </div>
                </div>
            </div>
            

            <div className='w-[45%] bg-[var(--main-color)] text-white max-h-[540px] overflow-y-auto'>
                <Table size='md'>
                    <Thead>
                    <Tr>
                        <Th>№</Th>
                        <Th>Кол-во блоков</Th>
                        <Th>Время раунда (сек.)</Th>
                        <Th>Кол-во заблок. блоков</Th>
                        <Th>Условия</Th>
                    </Tr>
                    </Thead>
                    <Tbody>

                        {
                            rounds.map((round, i) => (
                                <Tr key={ i }>
                                    <Td>{ i+1 }</Td>
                                    <Td>
                                        <ControlledParamsInput value={round.blocksCount} changeHandler={setRoundsData} input={{min: 2, max: 10}} data={rounds} index={i} mode='blocks' />
                                    </Td>
                                    <Td>
                                        <ControlledParamsInput value={round.timer} changeHandler={setRoundsData} input={{min: 5, max: 20}} data={rounds} index={i} mode='timer' />
                                    </Td>
                                    <Td>
                                        <ControlledParamsInput value={round.disabledBlocks} changeHandler={setRoundsData} input={{min: 0, max: round.blocksCount-1}} data={rounds} index={i} mode='disabled-blocks' />
                                    </Td>
                                    <Td>
                                        <ControlledParamsRadio changeHandler={setRoundsData} data={rounds} index={i} />
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </div>

            <div>
                {
                    startingGame && (
                        <div className='absolute bottom-[50px] flex flex-col items-center gap-2'>
                            <Icon color='green' as={MdOutlineCheckCircleOutline}></Icon>
                            <p className='text-[var(--main-color)] opacity-[0.7]'>Игра начинается!</p>
                        </div>
                    )
                }
            </div>

        </ControlLayout>
    )
}

export default Control