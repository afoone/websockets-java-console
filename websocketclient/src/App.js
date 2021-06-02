import "./App.css";
import useWebSocket from "react-use-websocket";
import { useState } from "react";
const socketUrl = "ws://localhost:8887";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onMessage: (e) => {
      console.log(e)
      setMessages([...messages, `received message from ${e.origin}: ${e.data} `]);
    },
    onOpen: () =>
      setMessages([...messages, "opened websocket to " + socketUrl]),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  return (
    <div className="App">
      <h2>WebSocket TEST for Java Console application</h2>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></input>
      <button onClick={() => sendMessage(newMessage)}>Send</button>
      <h2>Mensajes</h2>
      <ul>
        {messages.map((m) => (
          <li>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
