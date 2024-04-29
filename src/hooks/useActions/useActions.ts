import { actions as playersActions } from "@/store/players/players.slice"
import { actions as playerStatusActions } from "@/store/player-status/playerStatus.slice"
import { actions as gameStatusActions } from "@/store/game-status/gameStatus.slice"
import { actions as roundsActions } from "@/store/rounds/rounds.slice"
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

const rootActions = {
    ...playersActions,
    ...playerStatusActions,
    ...roundsActions,
    ...gameStatusActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => 
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}