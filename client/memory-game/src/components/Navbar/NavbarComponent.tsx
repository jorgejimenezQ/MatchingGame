import React from 'react'

const NavbarComponent = ({
  usernameInput,
  player2,
  gameStarted,
  currPlayerOneScore,
  currPlayerTwoScore,
  mobile,
}) => {
  return (
    <nav>
      <div id='user-1' className='playerNames'>
        {usernameInput + (mobile && gameStarted ? ': ' + currPlayerOneScore : '')}
      </div>
      <h1 className='title'>Fantasy Match</h1>
      <div id='user-2' className='playerNames'>
        {player2 + (mobile && gameStarted ? ': ' + currPlayerTwoScore : '')}
      </div>
    </nav>
  )
}

export default NavbarComponent
