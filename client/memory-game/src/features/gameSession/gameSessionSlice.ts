import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  sessionId: string
  otherPlayer: { username: string }
  playerScore: number
  playerTwoScore: number
  cardIndexes: number[]
  firstPlayer: string
  firstPlayerCurrentTurn: boolean
  gameStarted: boolean
  gameExists: boolean
  isMobile: boolean
  inviteUrl: string
}

const initialState: InitialState = {
  sessionId: '',
  otherPlayer: { username: '' },
  playerScore: 0,
  playerTwoScore: 0,
  cardIndexes: [],
  firstPlayer: '',
  firstPlayerCurrentTurn: false,
  gameStarted: false,
  gameExists: false,
  isMobile: false,
  inviteUrl: '',
}

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
    setOtherPlayer: (state, action: PayloadAction<string>) => {
      state.otherPlayer.username = action.payload
    },
    playerOneScore(state) {
      state.playerScore++
    },
    playerTwoScore(state) {
      state.playerTwoScore++
    },
    setCardIndexes(state, action: PayloadAction<number[]>) {
      state.cardIndexes = action.payload
    },
    setFirstPlayer(state, action: PayloadAction<string>) {
      state.firstPlayer = action.payload
    },
    setFirstPlayerCurrentTurn(state, action: PayloadAction<boolean>) {
      state.firstPlayerCurrentTurn = action.payload
    },
    setGameStarted(state, action: PayloadAction<boolean>) {
      state.gameStarted = action.payload
    },
    gameExists(state) {
      state.gameExists = true
    },
    resetAll(state) {
      state.playerScore = 0
      state.playerTwoScore = 0
      state.cardIndexes = []
      state.firstPlayer = ''
      state.firstPlayerCurrentTurn = false
      state.otherPlayer.username = ''
      state.sessionId = ''
      state.gameStarted = false
    },
    setInviteUrl(state, action: PayloadAction<string>) {
      state.inviteUrl = action.payload
    },
  },
})

export const {
  setSessionId,
  setOtherPlayer,
  playerOneScore,
  playerTwoScore,
  setCardIndexes,
  setFirstPlayer,
  setFirstPlayerCurrentTurn,
  gameExists,
  setGameStarted,
  resetAll,
  setIsMobile,
  setInviteUrl,
} = gameSessionSlice.actions
export default gameSessionSlice.reducer
