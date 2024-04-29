import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { reducer as playersReducer } from './players/players.slice'
import { reducer as roundsReducer } from './rounds/rounds.slice'
import { reducer as playerStatusReducer } from './player-status/playerStatus.slice'
import { reducer as gameStatusReducer } from './game-status/gameStatus.slice'

const reducers = combineReducers({
    players: playersReducer,
    rounds: roundsReducer,
    playerStatus: playerStatusReducer,
    gameStatus: gameStatusReducer
})

export const store = configureStore({
    reducer: reducers
})
  
export type RootState = ReturnType<typeof store.getState>