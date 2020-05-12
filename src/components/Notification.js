import React from 'react'

const Notification = ({ message, type }) => {
  const notificationStyle = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message) {
    return null
  }

  return (
    <div id="alert" style={notificationStyle} className={type}>
      {message}
    </div>
  )
}

export default Notification
