import React from 'react'

const NameInput = ({ handleChange }) => {
  return (
    <div className='input-form'>
      <label htmlFor='name'>Choose a username:</label>
      <input type='text' id='username' onChange={handleChange} />
    </div>
  )
}

export default NameInput
