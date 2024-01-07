/**
 * Context.jsx
 * description
 */

import React, {
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react'
import { PORT } from '../constants'

// Determine the URL to use for WebSocket
const SOCKET_URL = (function (){
  let URL = location.hostname

  const isLocal = URL.startsWith("localhost")
              || URL.startsWith("192.168")
              || URL.startsWith("127.0.0")
  const protocol = isLocal ? "ws" : "wss"

  URL = `${protocol}://${URL}:${PORT}`

  return URL
})()



export const Context = createContext()



export const Provider = ({ children }) => {
  const [ socketIsOpen, setSocketIsOpen ] = useState(false)
  const [ socketError, setSocketError ] = useState("")
  const [ lastMessage, setLastMessage ] = useState()
  const [ user_id, setUser_id ] = useState()

  const socketRef = useRef(null)
  const socket = socketRef.current



  const messageNotSent = (message) => {
    // Fail quietly?

    const reason = !socketIsOpen
      ? `WebSocket is closed${
          !user_id ? "; no user_id" : ""
        }`
      : "No user_id"

    console.log("Message could not be sent:", message, reason)
  }


  const sendMessage = message => {
    const sender_id = message.sender_id || user_id

    if (!socketIsOpen || !sender_id) {
      return messageNotSent(message)
    }

    if (typeof message !== "object") {
      message = { message }
    }

    message.sender_id = sender_id

    message = JSON.stringify(message)
    socket.send(message)
  }


  const socketOpened = () => {
    setSocketIsOpen(true)
    setSocketError("")
  }


  const treatSystemMessage = data => {
    const { subject, recipient_id } = data
    if (subject === "connection" ) {
      // When it accepts a new connection request, WebSocket
      // server should send a message with the format:
      // { sender_id:    "system",
      //   subject:      "connection",
      //   recipient_id: <uuid>
      // }
      // This <uuid> should be used as the sender_id for all
      // future messages.

      setUser_id(recipient_id)
    }
  }


  const sendConnectionConfirmation = () => {
    if (user_id) {
      const timeNow = new Date().toTimeString().split(" ")[0]
      console.log(`Connected to ${SOCKET_URL} at ${timeNow}`)

      sendMessage({
        recipient_id: "system",
        sender_id: user_id,
        subject: "confirmation",
        content: `connected at ${timeNow}`
      })
    }
  }


  const treatMessage = ({data}) => {
    try {
      const json = JSON.parse(data)
      data = json
    } catch (error) {
      // Leave data as it is?
    }

    if (data.sender_id === "system") {
      return treatSystemMessage(data)
    }

    setLastMessage(data)
  }


  const socketClosed = ({ wasClean }) => {
    const error = wasClean ? "" : "ERROR: broken connection"
    setSocketError(error)
    setSocketIsOpen(false)
    socketRef.current = null

    const timeNow = new Date().toTimeString().split(" ")[0]
    console.log(`Connection closed at ${timeNow} ${error}`)
  }


  const openSocket = () => {
    const socket = new WebSocket(SOCKET_URL);
    socket.onopen = socketOpened
    socket.onclose = socketClosed
    socket.onmessage = treatMessage

    socketRef.current = socket

    return () => { socket.close() }
  }


  const closeSocket = () => {
    socket.close()
  }


  const prepareToOpenSocket = () => {
    // Don't create a WebSocket instance immediately, just in case
    // React.StrictMode is active during development. Instead,
    // create a timeout callback which will be triggered:
    // * After React has rendered this Context a second
    //   time in the same time frame, if StrictMode is active
    // * Before the next real render.
    //
    // If StrictMode _is_ active, React will unmount the Context
    // immediately, which will trigger a call the clean-up
    // function below. This will happen after the first
    // double-render, and so openSocket() will not be triggered
    // as a result of the "strict" (unmounted) render.
    //
    // If StrictMode is _not_ active, or when the second (real)
    // render is called by StrictMode, the Context will _not_ be
    // unmounted, so the timeout will trigger the openSocket()
    // callback

    const timeOut = setTimeout(openSocket, 0)

    return () => {
      clearTimeout(timeOut)
    }
  }


  useEffect(prepareToOpenSocket, [])
  useEffect(sendConnectionConfirmation, [user_id])


  return (
    <Context.Provider
      value ={{
        socketIsOpen,
        socketError,
        lastMessage,
        user_id,
        sendMessage,
        closeSocket,
        openSocket
      }}
    >
      {children}
    </Context.Provider>
  )
}