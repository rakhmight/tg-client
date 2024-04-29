declare interface PlayerI {
    playerID: string,
    name: string,
    hearts: number,
    role: PlayerRole
}

declare type PlayerRole = 'player' | 'admin' | 'observer'