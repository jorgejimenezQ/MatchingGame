import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import StartScreen from './components/Start/StartScreen'

import { useAppDispatch, useAppSelector } from './app/hooks'
import NavbarComponent from './components/Navbar/NavbarComponent'

const App = () => {
  const gameStarted = useAppSelector((state) => state.gameSession.gameStarted)
  const currPlayerOneScore = useAppSelector((state) => state.gameSession.playerScore)
  const currPlayerTwoScore = useAppSelector((state) => state.gameSession.playerTwoScore)
  const mobile = useAppSelector((state) => state.gameSession.isMobile)
  const usernameInput = useAppSelector((state) => state.username.username)
  const player2 = useAppSelector((state) => state.gameSession.otherPlayer.username)

  return (
    <>
      <NavbarComponent
        usernameInput={usernameInput}
        player2={player2}
        gameStarted={gameStarted}
        currPlayerOneScore={currPlayerOneScore}
        currPlayerTwoScore={currPlayerTwoScore}
        mobile={mobile}
      />

      <Outlet />
    </>
  )
}

export default App
