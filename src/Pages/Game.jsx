/**
 * src/Pages/Game.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../Contexts'

import { Board } from '../Components/Board'



export const Game = () => {
  const { gameData, showScore } = useContext(GameContext)
  const {
    index,
    randomIndices,
    cardData,
    images
  } = gameData

  const indices = randomIndices.slice(index, index + 2)  


  // Find the file name of the images that match
  const images1 = cardData[indices[0]]
                  .images
                  .map( image => image.imageIndex)
  const images2 = cardData[indices[1]]
                  .images
                  .map( image => image.imageIndex)
  const imageIndex = images1.find(
    index => images2.indexOf(index) + 1
  )
  const match = images[imageIndex].source


  return (
    <>
      <Board 
        indices={indices} 
        match={match}
        showScore={showScore}
      />
    </>
  )
}