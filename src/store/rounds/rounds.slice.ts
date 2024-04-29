import { createSlice } from "@reduxjs/toolkit";

const initialState: StoreSliceBase<Array<RoundI>> = {
    value: []
}

export const roundsSlice = createSlice({
    name: 'rounds',
    initialState,
    reducers: {
        setRounds: (state, {payload}) => {
            state.value = payload
        },

        setRoundStartTime: (state, {payload}) => {            
            state.value[payload.round].startTime = payload.startTime
        },

        updateBlockPlayersData: (state, {payload}) => {

            state.value[payload.round].blocksData.map(blockData => {
                const target = blockData.players.find(p => p == payload.playerID)
                if(target) blockData.players.splice(blockData.players.indexOf(target), 1)
            })

            state.value[payload.round].blocksData[payload.id].players.push(payload.playerID)
        },

        updateBlockData: (state, {payload}) => {
            state.value[payload.round].blocksData = [...payload.blockData]
        },

        updateRoundStatus: (state, {payload}) => {
            state.value[payload.round].isCompleted = payload.status
        }
    }
})

export const { actions, reducer } = roundsSlice