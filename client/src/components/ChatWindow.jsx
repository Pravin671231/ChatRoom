import { Card } from "react-bootstrap";
import { useChat } from "./context/ChatContext";
import { useState } from "react";

const ChatWindow = () => {
  const { selectedChat, messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  //Handle send
  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  return (
    <>
      <Card className="h-100">
        <Card.Header>Chat with {selectedChat}</Card.Header>
        <Card.Body className="overflow-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.sender === "You" ? "text-end text-primary" : "text-start"
              }`}
            >
              <strong>{msg.sender}: </strong>
              {msg.text}
            </div>
          ))}
        </Card.Body>
        <Card.Footer>
          <form onSubmit={handleSend} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message....."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ChatWindow;
