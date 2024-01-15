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
    group_name,
    members
  } = useContext(WSContext)
  const [ packData, setPackData ] = useState([])
  const [ votes, setVotes ] = useState({})
  const [ usersVote, setUsersVote ] = useState("")
  const [ gameData, setGameData ] = useState()
  const [ lastClick, setLastClick ] = useState({})
  const [ score, setScore ] = useState({})
  const [ foundBy, setFoundBy ] = useState()



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


  // GAME PLAY / GAME PLAY / GAME PLAY / GAME PLAY / GAME PLAY //

  const clickImage = ( cardIndex, href ) => {
    if ( lastClick.href === href
      && lastClick.cardIndex !== cardIndex
       ) {
      sendMessage({
        recipient_id: "game",
        subject: "match",
        content: { href, group_name }
      })
    } else {
      setLastClick({ cardIndex, href })
    }
  }


  const matchFound = ({ content }) => {
    const {
      user_name,
      score,
    } = content

    setFoundBy(user_name)
    // Forget any clicks applied to the previous cards
    setLastClick({})

    // Ensure that every member has the correct score attached to
    // their name even if their name is not unique
    const names = Object.values(members)
    const unique = names.filter(name => {
      return (names.indexOf(name) === names.lastIndexOf(name))
    })

    const entries = Object.entries(members)

    let tally = entries.reduce((tally, [uuid, name]) => {
      if (unique.indexOf(name) < 0) {
        name = name + "-" + uuid.slice(0,3)
      }
      tally[name] = score[uuid] || 0
      return tally
    }, {})
    setScore(tally)
  }


  const showNextCard = ({ content }) => {
    setGameData({ ...gameData, index: content })

    if (content !== "game_over") {
      setFoundBy()
    }
  }


  // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES //


  /**
   * addMessageListeners() is called on every single render,
   * because any incoming messages must have access to the scope
   * of the current render.
   * removeMessageListener() is therefore also called just before
   * the next render, to clear out listener callbacks that are no
   * longer valid.
   */
  const addMessageListeners = () => {
    const listeners = [
      { subject: "votes", callback: updateVotes },
      { subject: "gameData", callback: loadGameData },
      { subject: "match_found", callback: matchFound },
      { subject: "show_next_card", callback: showNextCard }
    ]
    addMessageListener(listeners)

    return () => removeMessageListener(listeners)
  }


  // INITIALIZATION // INITIALIZATION // INITIALIZATION //

  useEffect(fetchPackData, [])   // called only on first render
  useEffect(addMessageListeners) // called on every render

  return (
    <GameContext.Provider
      value ={{
        BASE_URL,
        packData,
        usersVote,
        votes,
        vote,
        select,
        gameData,
        clickImage,
        foundBy,
        score,
        setGameData
      }}
    >
      {children}
    </GameContext.Provider>
  )
}