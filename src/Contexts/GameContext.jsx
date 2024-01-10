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
  const { BASE_URL } = useContext(WSContext)
  const [ packData, setPackData ] = useState([])

  const [ sessionStarted, setSessionStarted ] = useState(false)
  const [ gameOver, setGameOver ] = useState(true)


  const fetchPackData = () => {
    ;(async (URL) => {
      URL = BASE_URL + URL
      const response = await fetch(URL)
      const data = await response.json()

      setPackData(data)
    })(PACK_SOURCE)
  }

  useEffect(fetchPackData, [])


  return (
    <GameContext.Provider
      value ={{
        packData,
        gameOver,
        setGameOver
      }}
    >
      {children}
    </GameContext.Provider>
  )
}