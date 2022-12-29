import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from '../features/username/usernameSlice'
import gameSessionReducer from '../features/gameSession/gameSessionSlice'

const store = configureStore({
  reducer: {
    username: usernameReducer,
    gameSession: gameSessionReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
