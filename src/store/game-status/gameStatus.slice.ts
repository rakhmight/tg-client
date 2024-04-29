import { createSlice } from "@reduxjs/toolkit";

const initialState: StoreSliceBase<GameStatusI> = {
    value: {
        round: 0,
        isStart: false,
        lastRoundResults: {
            winners: [],
            losers: []
        }
    }
}

export const gameStatusSlice = createSlice({
    name: 'gameStatus',
    initialState,
    reducers: {
        setRound: (state, {payload}) => {
            state.value.round = payload
        },
        setGameStatus: (state, {payload}) => {
            state.value.isStart = payload
        },
        updateLastRoundResults: (state, {payload}) => {
            state.value.lastRoundResults.winners = payload.winnersUsers
            state.value.lastRoundResults.losers = payload.losersUsers
        }
    }
})

export const { actions, reducer } = gameStatusSlice