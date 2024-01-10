/**
 * src/Components/PackCard.jsx
 */


import React from 'react'


export const PackCard = ({ url, pack, isOwner }) => {
  const { name, count, thumbnail, index } = pack


  const selectPack = () => {
    if (isOwner) {
      // This selection will start the game
    } else {
      // This selection will add a vote for this pack
    }
  }


  return (
    <li
      className="pack"
    >
      <h1>{name}</h1>
      <p>Total images: {count}</p>
      <img src={url + thumbnail} alt={name} />

      <button
        onClick={selectPack}
      >
        {isOwner ? "Select Pack" : "Vote"}
      </button>
    </li>
  )
}