/**
 * GameContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'



export const GameContext = createContext()



export const GameProvider = ({ children }) => {
  const [ sessionStarted, setSessionStarted ] = useState(false)
  const [ gameOver, setGameOver ] = useState(true)


  return (
    <GameContext.Provider
      value ={{
        gameOver,
        setGameOver
      }}
    >
      {children}
    </GameContext.Provider>
  )
}