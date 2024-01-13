/**
 * src/Components/PackCard.jsx
 */


import React from 'react'
import { Star } from './Star'


export const PackCard = ({
  url,
  pack,
  votes,
  isUsersChoice,
  canVote,
  vote,
  select
}) => {
  const { name, count, thumbnail, index } = pack


  return (
    <li
      className="pack"
    >
      <h1>{name}</h1>
      <p>Total images: {count}</p>
      <img src={url + thumbnail} alt={name} />
      <Star
        votes={votes || ""}
        isUsersChoice={isUsersChoice}
        canVote={canVote}
        action={canVote ? vote : () => {}}
      />
      {select &&
        <button onClick={select} >
          Select
        </button>
      }
    </li>
  )
}