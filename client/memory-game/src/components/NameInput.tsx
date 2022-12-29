import React from 'react'

const NameInput = ({ handleChange }) => {
  return (
    <div className='input-form'>
      <label htmlFor='name'>Username</label>
      <input type='text' id='username' onChange={handleChange} />
    </div>
  )
}

export default NameInput
