import React from 'react'
import classes from './inviteMenu.module.css'

// This component will display a link to share with a friend
// The link should be clickable and copy the link to the clipboard
// There should be a button to start the game
const InviteMenu = ({ inviteKey, inviteUrl, handleSubmit, fromInvite }) => {
  const [copied, setCopied] = React.useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
  }
  return (
    <div className={classes['invite-menu']}>
      <h2>Invite a friend</h2>
      <p>Share this link with a friend to play a game together</p>
      <div className={classes['invite-link']}>
        <input type='text' value={inviteKey} readOnly />
        {/* <textarea value={inviteKey} readOnly /> */}
        <button onClick={handleClick} className={classes['copy-button']}>
          <img src='/src/assets/copy.svg' alt='copy' />
        </button>
      </div>
      <button className='btn-start' onClick={handleSubmit}>
        Start Game
      </button>
      {copied && <p className={classes['copied']}>Invite key copied to clipboard</p>}
    </div>
  )
}

export default InviteMenu
