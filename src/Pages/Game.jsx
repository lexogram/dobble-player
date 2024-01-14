/**
 * src/Pages/Game.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../Contexts'

import { Board } from '../Components/Board'



export const Game = () => {
  const { gameData } = useContext(GameContext)
  const { index, randomIndices } = gameData

  const indices = randomIndices.slice(index, index + 2)

  return (
    <>
      <Board indices={indices}/>
    </>
  )
}