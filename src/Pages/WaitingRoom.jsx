/**
 * src/Pages/WaitingRoom.jsx
 */


import React from 'react'
import { MemberList } from '../Components/MemberList'
import { PackList } from '../Components/PackList'

export const WaitingRoom = () => {
  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <PackList />
    </>
  )
}