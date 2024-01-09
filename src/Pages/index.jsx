/**
 * src/Pages/Login.jsx
 */


import React, { useContext } from 'react'
import { WSContext } from '../Contexts'
import { GameContext } from '../Contexts'

import { Connecting } from './Connecting'
import { Disconnected } from './Disconnected'
import { JoinGroup } from './JoinGroup'
import { WaitingRoom } from './WaitingRoom'
import { Game } from './Game'



export const Login = () => {
  const {
    socketIsOpen,
    socketError,
    // lastMessage, // not required here
    // user_id, // not required here
    user_name,
    group_name,
    // sendMessage, // not used yet
    // closeSocket, // not required here
    // openSocket // not required here
  } = useContext(WSContext)
  const {
    gameData
  } = useContext(GameContext)



  if (!socketIsOpen) {
    if (!socketError) {
      return <Connecting />
    } else {
      return <Disconnected error={socketError} />
    }

  } else if (!user_name || !group_name) {
      return <JoinGroup />

  } else if (!gameData) {
    return <WaitingRoom />

  } else {
    return <Game />
  }
}
