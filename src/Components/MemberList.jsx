/**
 * src/Components/MemberList.jsx
 */


import React, { useContext } from 'react'
import { WSContext } from '../Contexts'

export const MemberList = () => {
  const { members, user_id, owner_id } = useContext(WSContext)


  const alphabetically = (a, b) => {
    // [ <name>, <user_id> ]
    if (a[1] === user_id) {
      return -1
    } else if (b[1] === user_id) {
      return 1
    } else {
      return a[0] > b[0]
    }
  }


  const memberList = Object.entries(members)
    .sort(alphabetically)
    .map(( entry ) => {
      const [ name, user_id ] = entry
      const className = user_id === owner_id ? "owner" : ""
      return (
        <li
          key={user_id}
          className={className}
        >
          {name}
        </li>
      )
    })

  return (
    <ul
      id="memberList"
      
    >
      {memberList}
    </ul>
  )
}