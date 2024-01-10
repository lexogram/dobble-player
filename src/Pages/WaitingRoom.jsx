/**
 * src/Pages/WaitingRoom.jsx
 */


import React from 'react'
import { MemberList } from '../Components/MemberList'
import { PackList } from '../Components/PackList'

export const WaitingRoom = (props) => {


  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <PackList />
    </>
  )
}