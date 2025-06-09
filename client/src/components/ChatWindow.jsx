import { Card } from "react-bootstrap";
import { useChat } from "../context/ChatContext";
import { useState } from "react";

const ChatWindow = () => {
  const { currentUser, selectedChat, messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  //Handle send
  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const chatHistory = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <>
      <Card className="h-100">
        <Card.Header>
          {selectedChat ? `Chat with {selectedChat}` : "Select a user"}
        </Card.Header>
        <Card.Body className="overflow-auto">
          {chatHistory.length === 0 && (
            <div className="text-muted text-center">No message yet</div>
          )}
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.sender === currentUser.email
                  ? "text-end text-primary"
                  : "text-start"
              }`}
            >
              <strong>
                {msg.sender === currentUser.email ? "You" : msg.sender}:{" "}
              </strong>{" "}
              {msg.text}
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
              disabled={!selectedChat}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedChat}
            >
              Send
            </button>
          </form>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ChatWindow;
