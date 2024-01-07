/**
 * src/components/Login.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../state-logic/Context.jsx'



export const Login = () => {
  const {
    socketIsReady,
    socketError,
    lastMessage,
    user_id,
    sendMessage, // not used yet
    closeSocket
  } = useContext(Context)


  return (
    <>
      <p>Connected: {socketIsReady ? "true" : "false"}</p>
      { !socketIsReady && <p>Error: {socketError}</p> }
      <p>User ID: {user_id}</p>
      <p>Last Message: {lastMessage}</p>
      <button
        onClick={closeSocket}
      >
        Close Socket
      </button>
    </>)
}
