/**
 * GameContext.jsx
 * description
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import { WSContext } from './WSContext'
import { PACK_SOURCE } from '../constants'



export const GameContext = createContext()



export const GameProvider = ({ children }) => {
  const {
    BASE_URL,    // for getting files from Express server
    sendMessage,
    addMessageListener,
    removeMessageListener,
    group_name
  } = useContext(WSContext)
  const [ packData, setPackData ] = useState([])
  const [ listeners, setListeners ] = useState([])
  const [ votes, setVotes ] = useState({})
  const [ usersVote, setUsersVote ] = useState("")
  const [ gameData, setGameData ] = useState()


  // SELECTING A PACK // SELECTING A PACK // SELECTING A PACK //

  const fetchPackData = () => {
    ;(async (URL) => {
      URL = BASE_URL + URL
      const response = await fetch(URL)
      const data = await response.json()
      setPackData(data)

    })(PACK_SOURCE)
  }


  const vote = pack_name => {
    setUsersVote(pack_name)

    const message = {
      recipient_id: "game",
      subject: "vote",
      content: { pack_name, group_name }
    }

    sendMessage(message)
  }


  const updateVotes = ({ content }) => {
    setVotes({ ...votes, ...content })
  }


  const select = pack_name => {
    const message = {
      recipient_id: "game",
      subject: "select_pack",
      content: { pack_name, group_name }
    }

    sendMessage(message)
  }

  const loadGameData = ({ content }) => {
    setGameData(content)
  }


  // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES //

  const addMessageListeners = () => {
    const listeners = [
      { subject: "votes", callback: updateVotes },
      { subject: "gameData", callback: loadGameData }
    ]
    setListeners(listeners)
    addMessageListener(listeners)
  }

  const removeMessageListeners = () => {
    removeMessageListener(listeners)
  }


  // INITIALIZATION // INITIALIZATION // INITIALIZATION //

  const initialize = () => {
    fetchPackData()
    addMessageListeners()

    return removeMessageListeners
  }

  useEffect(initialize, [])



  return (
    <GameContext.Provider
      value ={{
        BASE_URL,
        packData,
        usersVote,
        votes,
        vote,
        select,
        gameData
      }}
    >
      {children}
    </GameContext.Provider>
  )
}