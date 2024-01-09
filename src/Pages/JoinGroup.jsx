/**
 * src/Pages/JoinGroup.jsx
 */


import React, { useContext, useState, useRef, useEffect } from 'react'
import { WSContext } from '../Contexts/WSContext.jsx'
import { GameContext } from '../Contexts/GameContext.jsx'



export const JoinGroup = () => {
  const {
    joinGroup,
    status
  } = useContext(WSContext)

  const [ user_name, setUserName ] = useState("")
  const [ group_name, setGroupName ] = useState("")
  const [ create_group, setCreateGroup ] = useState(false)
  
  const focusRef = useRef()


  const updateName = ({ target }) => {
    const { name, value } = target
    if (name === "user_name") {
      setUserName(value)
    } else {
      setGroupName(value)
    }
  }


  const toggleCreateGroup = () => {
    setCreateGroup(!create_group)
  }


  const createGroup = event => {
    event.preventDefault()
    const data = {
      user_name,
      group_name,
      create_group
    }

    joinGroup(data);
  }


  const focusOn = () => {
    focusRef.current.focus()
  }


  useEffect(focusOn, [])


  return (
    <form
      id="join-group"
      onSubmit={createGroup}
    >
      <label htmlFor="user-name">
        <span>Choose a player name:</span>
        <input
          type="text"
          id="user-name"
          name="user_name"
          value={user_name}
          onChange={updateName}
          ref={focusRef}
        />
      </label>
      <label htmlFor="group-name">
        <span>Choose a group:</span>
        <input
          type="text"
          id="group-name"
          name="group_name"
          value={group_name}
          onChange={updateName}
        />
      </label>
      <label htmlFor="create-group">
        <input
          type="checkbox"
          id="create-group"
          name="create_group"
          checked={create_group} 
          onChange={toggleCreateGroup}
        />
        <span>Create a new group</span>
      </label>
      <p>{ status ? status : "" }</p>
      <button
        type="submit"
      >
        Join the Group
      </button>
    </form>
  )
}