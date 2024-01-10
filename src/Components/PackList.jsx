/**
 * src/Components/PackList.jsx
 */


import React, { useContext } from 'react'
import { GameContext, WSContext } from '../Contexts'
import { PackCard } from './PackCard'


export const PackList = () => {
  const { packData } = useContext(GameContext)
  const { user_id, owner_id, BASE_URL } = useContext(WSContext)

  const isOwner = user_id === owner_id

  const packList = packData.map( pack => (
    <PackCard
      key={pack.name}
      url={BASE_URL}
      pack={pack}
      isOwner={isOwner}
    />
  ))

  return (
    <ul>{packList}</ul>
  )
}