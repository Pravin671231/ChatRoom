import { Card } from "react-bootstrap";
import { useChat } from "../context/ChatContext";
import { useEffect, useRef, useState } from "react";

const ChatWindow = () => {
  const { currentUser, selectedChat, messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  //Handle send
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Card className="h-100">
        <Card.Header>
          {selectedChat ? `Chat with ${selectedChat}` : "Select a user"}
        </Card.Header>
        <Card.Body className="overflow-auto d-flex flex-column gap-2">
          {selectedChat ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded w-75 ${
                  msg.sender === currentUser?.email
                    ? "align-self-end bg-primary text-white"
                    : "align-self-start bg-light text-dark"
                }`}
              >
                <div className="small">{msg.text}</div>
                <div className="text-end text-muted small">
                  {msg.createdAt ? formatTime(msg.createdAt) : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-center mt-4">
              Select a user to start chatting
            </div>
          )}
          <div ref={bottomRef}></div>
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
