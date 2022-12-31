import { useState, useEffect, useCallback } from 'react'
import { setUsername } from '../features/username/usernameSlice'
import {
  setSessionId,
  setOtherPlayer,
  setCardIndexes,
  setFirstPlayer,
  setGameStarted,
  gameExists,
  resetAll,
  setIsMobile,
} from '../features/gameSession/gameSessionSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Phaser from 'phaser'
import gameConfig from '../game/game.config'
import connection from '../connection/connection'
import NameInput from '../components/NameInput'
import GameComponent from '../components/GameComponent'

export default function StartScreen() {
  const [usernameInput, setUsernameInput] = useState('')
  const [player2, setPlayer2] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [game, setGame] = useState<Phaser.Game | null>(null)

  const gameStarted = useAppSelector((state) => state.gameSession.gameStarted)
  const currPlayerOneScore = useAppSelector((state) => state.gameSession.playerScore)
  const currPlayerTwoScore = useAppSelector((state) => state.gameSession.playerTwoScore)
  const usernameSet = useAppSelector((state) => state.username.username !== '')
  const currentTurn = useAppSelector((state) => state.gameSession.firstPlayerCurrentTurn)
  const isGameCreated = useAppSelector((state) => state.gameSession.gameExists)

  const dispatch = useAppDispatch()

  // Check if mobile device or not
  useEffect(() => {
    if (window.innerWidth < 600) {
      dispatch(setIsMobile(true))
      gameConfig.height = 450
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

  const handleSubmit = () => {
    if (usernameInput === '') return

    connection.socket.emit('join', usernameInput, (response) => {
      console.log('response', response)
      dispatch(setSessionId(response.sessionId))
      dispatch(setCardIndexes(response.cardIndexes))
    })

    dispatch(setUsername(usernameInput))
    setWaiting(true)
    // new Phaser.Game(gameConfig)

    if (!game) startGameEvent(game, isGameCreated)
    if (game) game.destroy(true)
  }

  return (
    <div className='main-wrapper'>
      {waiting ? (
        <div className='waiting'>
          <h2>Finding an available game...</h2>
        </div>
      ) : (
        <>
          {!gameStarted && (
            <main className='main-container'>
              <div>
                {!usernameSet && (
                  <>
                    <NameInput
                      handleChange={(e) => {
                        setUsernameInput(e.target.value)
                      }}
                    />
                  </>
                )}
                <button className='btn-start' onClick={handleSubmit}>
                  Find New Game
                </button>
              </div>
            </main>
          )}
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
