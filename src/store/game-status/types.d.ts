declare interface GameStatusI {
    round: number,
    isStart: boolean,
    lastRoundResults: {
        winners: Array<string>,
        losers: Array<{ playerID: string, role: PlayerRole }>
    }
}