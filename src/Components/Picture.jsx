/**
 * src/Components/Picture.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../Contexts'

export const Picture = ({
  index,
  path,
  href,
  cx,
  cy,
  r,
  crop,
  rotation,
  match
}) => {
  const { clickImage } = useContext(GameContext)

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  const x = cx - r
  const y = cy - r
  const width = r * 2
  const square = { x, y, width, height: width }

  const defId = `card_${index}${href}`

  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}
  const opacity = match ? "0.1" : "0"


  const clickPicture = () => {
    clickImage( index, href )
  }


  return (
    <g
      onClick={clickPicture}
    >
      <defs>
        <clipPath
          id={defId}
        >
          <circle
            {...circle}
          />
        </clipPath>
      </defs>
      <image
        href={path + href}
        {...square}
        {...cropPath}
        transform={`rotate(${rotation})`}
        transform-origin={origin}
      />
      <circle
        {...circle}
        fill="#f00"
        opacity={opacity}
      />
    </g>
  )
}