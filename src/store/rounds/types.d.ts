declare type LightRoundI = Pick<RoundI, 'blocksCount' | 'timer' | 'disabledBlocks' | 'pseudoZeroBlocks' | 'zeroBlocks'>

declare interface RoundI {
    timer: number,
    blocksCount: number,
    disabledBlocks: number,
    zeroBlocks: boolean,
    pseudoZeroBlocks: boolean,

    blocksData: Array<BlockDataI>,
    isCompleted: boolean,
    startTime: number
}

interface BlockDataI {
    id: number,
    players: Array<PlayerID>
}