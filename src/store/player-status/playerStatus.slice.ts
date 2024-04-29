import { createSlice } from "@reduxjs/toolkit";

const initialState: StoreSliceBase<PlayerStatusI> = {
    value: {
        inGame: false
    }
}

export const playerStatusSlice = createSlice({
    name: 'playerStatus',
    initialState,
    reducers: {
        setPlayerStatus: (state, {payload}) => {
            state.value = payload
        },
        setPlayerHearts: (state, {payload}) => {
            state.value.hearts = payload
        }
    }
})

export const { actions, reducer } = playerStatusSlice