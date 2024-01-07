/**
 * src/components/Login.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../state-logic/Context.jsx'



export const Login = () => {
  const {
    socketIsOpen,
    socketError,
    lastMessage,
    user_id,
    sendMessage, // not used yet
    closeSocket,
    openSocket
  } = useContext(Context)


  const toggleConnection = () => {
    if (socketIsOpen) {
      closeSocket()
    } else {
      openSocket()
    }
  }


  const buttonText = socketIsOpen ? "Disconnect" : "Connect"


  return (
    <>
      <p>{socketIsOpen ? "Connected" : "No connection"}</p>
      { socketError && <p>{socketError}</p> }
      <p>User ID: {user_id}</p>
      <p>Last Message: {lastMessage}</p>
      <button
        onClick={toggleConnection}
      >
        {buttonText}
      </button>
    </>)
}
