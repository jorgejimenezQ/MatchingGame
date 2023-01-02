import React from 'react'
import NameInput from '../NameInput/NameInput'

const GameMenu = ({
  usernameSet,
  fromInvite,
  handleChange,
  handleRandomGame,
  handleCreateInvite,
  handleJoinInvite,
}) => {
  return (
    <>
      <main className='main-container'>
        <div>
          {!usernameSet && <NameInput handleChange={(e) => handleChange(e.target.value)} />}
          {fromInvite && (
            <>
              <button className='btn-start' onClick={handleJoinInvite}>
                Join Game
              </button>
            </>
          )}
          {!fromInvite && (
            <>
              <button className='btn-start' onClick={handleRandomGame}>
                Random Game
              </button>
              <button className='btn-start' onClick={handleCreateInvite}>
                Invite A Friend
              </button>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default GameMenu
