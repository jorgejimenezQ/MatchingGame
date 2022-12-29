import React from 'react'

const GameComponent = ({
  gameStarted,
  currentTurn,
  username,
  currPlayerOneScore,
  currPlayerTwoScore,
  player2,
}) => {
  return (
    <div id='game' className='game-container'>
      <div>
        {gameStarted && (
          <div className='score-container'>
            <div className={currentTurn ? 'player-score active' : 'player-score'}>
              <h2>{username}</h2>
              <div className='score-value'>{currPlayerOneScore}</div>
            </div>
            <div className={!currentTurn ? 'player-score active' : 'player-score'}>
              <h2>{player2}</h2>
              <div className='score-value'>{currPlayerTwoScore}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameComponent
