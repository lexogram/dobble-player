/**
 * src/Components/Picture.jsx
 */


import React from 'react'


export const Picture = ({
  index,
  path,
  href,
  cx,
  cy,
  r,
  crop,
  rotation,
}) => {

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  const x = cx - r
  const y = cy - r
  const width = r * 2
  const square = { x, y, width, height: width }

  const defId = `card_${index}${href}`

  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}
  const opacity = "0.05"

  return (
    <g>
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