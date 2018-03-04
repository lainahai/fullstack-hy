import React from 'react'

const Notification = ({ message, errorMessage }) => {

  const note = () => message ? <div className="notification">{message}</div> : null
  const error = () => errorMessage ? <div className="error">{errorMessage}</div>: null
  
  if (message === null && errorMessage === null) {
    return null
  }
  return (
    <div>
      {note()}
      {error()}
    </div>
  )
}

export default Notification
