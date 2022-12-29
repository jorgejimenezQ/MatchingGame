import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  username: string
}

const initialState: InitialState = {
  username: '',
}

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
  },
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer
