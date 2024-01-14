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
  const { clickImage, foundBy } = useContext(GameContext)

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  const x = cx - r
  const y = cy - r
  const width = r * 2
  const square = { x, y, width, height: width }

  const defId = `card_${index}${href}`

  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}
  const showStamp = match && foundBy
  const colour = "#0909"


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
      { showStamp && <g>
          <text
            x={cx}
            y={cy}
            fill={colour}
            stroke="#fff"
            strokeWidth="0.1"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={r / 2.5}
            transform={`rotate(${rotation})`}
            transform-origin={origin}
          >
            {foundBy}
          </text>
          <circle
            {...circle}
            fill="#0000"
            stroke={colour}
            strokeWidth="1"
          />
        </g>
      }
    </g>
  )
}