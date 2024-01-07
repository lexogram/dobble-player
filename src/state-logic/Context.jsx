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
  const [ socketIsReady, setSocketIsReady ] = useState(false)
  const [ socketError, setSocketError ] = useState("")
  const [ lastMessage, setLastMessage ] = useState()
  const [ user_id, setUser_id ] = useState()

  const socketRef = useRef(null)
  const socket = socketRef.current


  const messageNotSent = (message) => {
    // Fail quietly?

    const reason = !socketIsReady
      ? `WebSocket is closed${
          !user_id ? "; no user_id" : ""
        }`
      : "No user_id"

    console.log("Message could not be sent:", message, reason)
  }


  const sendMessage = message => {
    const sender_id = message.sender_id || user_id

    if (!socketIsReady || !sender_id) {
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
    setSocketIsReady(true)
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
    setSocketIsReady(false)

    const timeNow = new Date().toTimeString().split(" ")[0]
    console.log(`Connected closed at ${timeNow} ${error}`)
  }


  const setUpSocket = () => {
    const socket = new WebSocket(SOCKET_URL);
    socket.onopen = socketOpened
    socket.onclose = socketClosed
    socket.onmessage = treatMessage

    socketRef.current = socket

    // NOTE: React.StrictMode will force the Context to render
    // twice, and so setUpSocket will be called twice. The first
    // time, React.StrictMode will dismount the Context, causing
    // the cleanup handler below to run. DURING DEVELOPMENT ONLY,
    // you will see an extra connection attempt, which fails,
    // followed by a successful connection attempt.
    //
    // In the browser, console, the "failed" attempt might appear
    // like this:
    //
    //   <Browser> can’t establish a connection to the server at
    //   <URL>
    //
    //   The connection to URL was interrupted while the page was
    //   loading.
    //   Connected closed at <time> ERROR: broken connection
    //
    // On the server, you will also see one New Connection
    // followed immediately by this connection being closed:
    //
    //    New connection from: <strict's test uuid>
    //    Socket closed for <strict's test uuid> (undefined)
    //    New connection from: <actual user_id>
    //
    // This is normal, and it will only occur during development.

    return () => { socket.close() }
  }


  const closeSocket = () => {
    socket.close()
  }


  useEffect(setUpSocket, [])
  useEffect(sendConnectionConfirmation, [user_id])


  return (
    <Context.Provider
      value ={{
        socketIsReady,
        socketError,
        lastMessage,
        user_id,
        sendMessage,
        closeSocket
      }}
    >
      {children}
    </Context.Provider>
  )
}