import { useState, useEffect, useCallback } from 'react'
import { setUsername } from '../../features/username/usernameSlice'
import { useParams } from 'react-router-dom'

import {
  setSessionId,
  setOtherPlayer,
  setCardIndexes,
  setFirstPlayer,
  setGameStarted,
  gameExists,
  resetAll,
  setIsMobile,
  setInviteUrl,
} from '../../features/gameSession/gameSessionSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Phaser from 'phaser'
import gameConfig from '../../game/game.config'
import connection from '../../connection/connection'
import GameComponent from '../Game/GameComponent'
import GameMenu from '../GameMenu/GameMenu'
import InviteMenu from '../InviteMenu/InviteMenu'

export default function StartScreen() {
  const [usernameInput, setUsernameInput] = useState('')
  const [player2, setPlayer2] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [game, setGame] = useState<Phaser.Game | null>(null)
  const [waitingMsg, setWaitingMsg] = useState('Waiting for the other player to join...')
  const [inviteKey, setInviteKey] = useState('')
  const [invite, setInvite] = useState(false)
  const [fromInvite, setFromInvite] = useState(false)
  const { inviteKey: inviteKeyParam } = useParams<{ inviteKey: string }>()

  // Redux state
  const gameStarted = useAppSelector((state) => state.gameSession.gameStarted)
  const currPlayerOneScore = useAppSelector((state) => state.gameSession.playerScore)
  const currPlayerTwoScore = useAppSelector((state) => state.gameSession.playerTwoScore)
  const usernameSet = useAppSelector((state) => state.username.username !== '')
  const currentTurn = useAppSelector((state) => state.gameSession.firstPlayerCurrentTurn)
  const isGameCreated = useAppSelector((state) => state.gameSession.gameExists)
  const inviteUrl = useAppSelector((state) => state.gameSession.inviteUrl)

  const dispatch = useAppDispatch()

  // Check if mobile device or not
  useEffect(() => {
    if (window.innerWidth < 600) {
      dispatch(setIsMobile(true))
      gameConfig.height = 450
    }

    if (inviteKeyParam) {
      setInviteKey(inviteKeyParam)
      setFromInvite(true)
    }
  }, [])

  const startGameEvent = useCallback(
    (game, isGameCreated) => {
      // Listen for the game to start
      connection.socket.on('gameOver', (winner) => {
        dispatch(setGameStarted(false))
        if (winner == 'draw') {
          alert('Draw!')
        } else {
          const winnerString = winner == connection.connectionId ? 'You WIN' : 'You LOSE'
          alert(winnerString)
        }

        // Reset all the game state
        setPlayer2('')
        setGameStarted(false)
        setWaiting(false)

        dispatch(resetAll())

        // connection.socket.emit('restartGame')
      })

      // Wait for the other player to join
      connection.socket.on('startGame', ({ players, firstPlayer }) => {
        if (gameStarted) return

        console.log('players', players)
        console.log('firstPlayer', firstPlayer)
        const keys = Object.keys(players)
        const otherPlayerId = keys.find((key) => key !== connection.connectionId)
        setPlayer2(players[otherPlayerId].username)
        dispatch(setOtherPlayer(players[otherPlayerId].username))
        dispatch(setFirstPlayer(firstPlayer))

        // start the game
        setGame(new Phaser.Game(gameConfig))
        dispatch(gameExists())

        setWaiting(false)
        dispatch(setGameStarted(true))
      })
    },
    [gameStarted]
  )

  // Join a random game
  const handleRandom = () => {
    if (usernameInput === '') return

    connection.socket.emit('join', { username: usernameInput, isInvite: false }, (response) => {
      console.log('response', response)
      dispatch(setSessionId(response.sessionId))
      dispatch(setCardIndexes(response.cardIndexes))
    })

    dispatch(setUsername(usernameInput))

    startGame()
  }

  // Create an invite link for a friend to join
  const handleCreateInvite = () => {
    if (usernameInput === '') return

    connection.socket.emit('join', { username: usernameInput, createInvite: true }, (response) => {
      console.log('response', response)
      dispatch(setSessionId(response.sessionId))
      dispatch(setCardIndexes(response.cardIndexes))

      const inviteUrl = `${window.location.origin}/invite/${response.sessionId}`

      setInviteKey(response.sessionId)
      setInvite(true)
      dispatch(setInviteUrl(inviteUrl))
    })

    dispatch(setUsername(usernameInput))
  }

  // Join a game from an invite link
  const joinInvite = () => {
    if (usernameInput === '') return

    connection.socket.emit(
      'join',
      { username: usernameInput, isInvite: true, sessionId: inviteKey },
      (response) => {
        console.log('response', response)
        dispatch(setSessionId(response.sessionId))
        dispatch(setCardIndexes(response.cardIndexes))
      }
    )

    dispatch(setUsername(usernameInput))

    startGame()
  }

  const startGame = () => {
    setWaiting(true)
    // new Phaser.Game(gameConfig)
    connection.socket.emit('playerReady', () => {
      if (!game) startGameEvent(game, isGameCreated)
    })

    if (game) game.destroy(true)
  }
  return (
    <div className='main-wrapper'>
      {waiting ? (
        <div className='waiting'>
          <h2>{waitingMsg}</h2>
        </div>
      ) : (
        <>
          {!gameStarted &&
            (!invite ? (
              <GameMenu
                fromInvite={fromInvite}
                usernameSet={usernameSet}
                handleChange={setUsernameInput}
                handleRandomGame={handleRandom}
                handleCreateInvite={handleCreateInvite}
                handleJoinInvite={joinInvite}
              />
            ) : (
              <InviteMenu
                fromInvite={fromInvite}
                inviteKey={inviteKey}
                inviteUrl={inviteUrl}
                handleSubmit={startGame}
              />
            ))}
        </>
      )}
      <GameComponent
        gameStarted={gameStarted}
        currentTurn={currentTurn}
        currPlayerOneScore={currPlayerOneScore}
        currPlayerTwoScore={currPlayerTwoScore}
        player2={player2}
        username={usernameInput}
      />
    </div>
  )
}
