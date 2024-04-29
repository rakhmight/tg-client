import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from '@/routes'
import '@/assets/css/global.css'
import { socket } from './socket'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/useActions/useActions';

const App : FC = () => {
    const { playerStatus } = useSelector((state:RootState)=>state)
    const { addPlayer, deletePlayer } = useActions()

    useEffect(()=>{
        socket.connect()        

        socket.on('player-join-to-game', (data:{player: PlayerI}) => {            
            if(playerStatus.value.inGame) addPlayer(data.player)            
        })

        socket.on('player-left-from-game', (data) => {
            if(playerStatus.value.inGame) deletePlayer(data.player)
        })
    })

    return(
        <ChakraProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App