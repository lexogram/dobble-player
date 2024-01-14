/**
 * src/Compenents/Board.jsx
 */


import React from 'react'
import { useResize } from '../Hooks/useResize'

import { Card } from '../Components/Card'



export const Board = ({ indices }) => {
  const [ width, height ] = useResize()

  let d
  let x = 0
  let y = 0

  if (width < height / 2) {
    d = width
    y = height / 2 - width
  } else if (height < width / 2) {
    d = height
    x = width / 2 - height
  } else {
    d = (width + height - Math.sqrt(2 * width * height))
  }

  return (
    <div id="board">
      <Card
        index={indices[0]}
        top={true}
        d={d}
        x={x}
        y={y}
      />
      <Card
        index={indices[1]}
        d={d}
        x={x}
        y={y}
      />
    </div>
  )
}