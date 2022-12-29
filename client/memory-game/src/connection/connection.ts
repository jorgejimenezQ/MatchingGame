import { io, Socket } from 'socket.io-client'
import { v4 } from 'uuid'

interface ServerToClientEvents {
  // test: (a: string) => void
  // noArg: () => void
  // basicEmit: (a: number, b: string, c: Buffer) => void
  // withAck: (d: string, callback: (e: number) => void) => void
  // join: (d: string, callback: (e: string) => void) => void
  startGame: (e: { players: any; firstPlayer: any }) => void
  playerTurn: (streak: number) => void
  flipCard: (index: number) => void
  addScore: () => void
  gameOver: (winner: any) => void
  mainScene: () => void
}

interface ClientToServerEvents {
  join: (d: string, callback: (d: any) => void) => void
  turnOver: (score: number) => void
  cardClick: (cardIndex) => void
  match: () => void
  restartGame: () => void
}

type Connection = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  connectionId: string
}

class SocketConnection {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  connectionId: string
  public connection: Connection

  // regex expression for a word
  // const wordRegex = new RegExp('^[a-zA-Z]+$')
  constructor() {
    this.socket = io('http://10.0.0.35:8000', { autoConnect: false })
    this.connectionId = v4()

    this.socket.auth = { connectionId: this.connectionId }
    // this.socket.connectionId = this.connectionId
    this.connection = { socket: this.socket, connectionId: this.connectionId }
    console.log('connectionId: ' + this.connectionId)
  }

  getSocket() {
    return this.socket
  }

  connect() {
    this.socket.connect()

    // this.socket.on('connect', (data) => {
    //   this.socket.emit('getPlayer')
    // })

    // this.socket.on('updatePlayer', (data) => {
    //   const playerData = JSON.parse(data)
    //   //   console.log('player: ' + playerData.id + ' updated')
    // })
  }
}

const socketConnection = new SocketConnection()
socketConnection.connect()
// const socket = socketConnection.getSocket()
// socket.connectionId = socketConnection.connectionId
const connection = socketConnection.connection
console.log('connection: ' + connection)
export default connection
