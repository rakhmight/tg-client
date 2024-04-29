import { createSlice } from "@reduxjs/toolkit";

const initialState: StoreSliceBase<Array<PlayerI>> = {
    value: []
}

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        deletePlayer: (state, {payload}) => {
            const target = state.value.find( item => item.playerID == payload.playerID)
            if(target) state.value.splice(state.value.indexOf(target), 1)
        },
        addPlayer: (state, {payload}) => {
            const target = state.value.find( item => item.playerID == payload.playerID)
            if(!target) state.value.push({ name: payload.name, playerID: payload.playerID, role: payload.role, hearts: payload.hearts })
        },
        setPlayers: (state, {payload}) => {
            state.value = payload
        },
        setPlayersHearts: (state, {payload}) => {
            state.value = state.value.map( player => {
                const playerData = player
                if(player.role == 'player') playerData.hearts = payload
                return playerData
            })
        }
    }
})

export const { actions, reducer } = playersSlice