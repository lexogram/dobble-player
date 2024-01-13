/**
 * src/Compenents/Board.jsx
 */


import React from 'react'
import { useResize } from '../Hooks/useResize'


export const Board = (props) => {
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

  const style = {
    position: "absolute",
    width: "var(--d)",
    height: "var(--d)",
    borderRadius: "100vmax",
    backgroundColor: "green"
  }

  return (
    <div
      style={{
        height: "100vh",
        "--d": d + "px",
        "--x": x + "px",
        "--y": y + "px"
      }}
    >
      <div
        style={{...style, left: "var(--x)", top: "var(--y)"}}
      />
      <div
        style={{...style, right: "var(--x)", bottom: "var(--y)"}}
      />
    </div>
  )
}