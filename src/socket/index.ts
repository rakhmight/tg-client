import { io } from "socket.io-client"

const URL = "http://172.16.18.223:6565"

export const socket = io(URL, {
    autoConnect: false
})