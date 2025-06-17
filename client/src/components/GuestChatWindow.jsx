import { Card } from "react-bootstrap";
import { useChat } from "../context/ChatContext";
import { useEffect, useRef, useState } from "react";

const GuestChatWindow = () => {
  const { selectedChat, guestMessages, sendMessage } = useChat();

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  //Filter guest messages - current selected user
  const filterMessages = guestMessages.filter(
    (msg) =>
      (msg.sender === "guest" && msg.receiver === selectedChat) ||
      (msg.sender === selectedChat && msg.receiver === "guest")
  );

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };
  // time format
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filterMessages]);
  return (
    <>
      <Card className="h-100">
        <Card.Header>
          {selectedChat ? `Chat with ${selectedChat}` : "Guest User"}
        </Card.Header>
        <Card.Body className="flex-grow-1 overflow-auto d-flex flex-column gap-2">
          {!selectedChat ? (
            <div className="text-muted text-center mt-4">
              Select a user to start chatting
            </div>
          ) : filterMessages.length === 0 ? (
            <div className="text-muted text-center mt-4">No messages yet</div>
          ) : (
            filterMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded w-50 ${
                  msg.sender === "guest"
                    ? "align-self-end bg-primary text-white"
                    : "align-self-start bg-light text-dark"
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-end text-muted small mt-1">
                  {msg.createdAt ? formatTime(msg.createdAt) : ""}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </Card.Body>
        <Card.Footer>
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message....."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              disabled={!selectedChat}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedChat || !input.trim()}
            >
              Send
            </button>
          </form>
        </Card.Footer>
      </Card>
    </>
  );
};

export default GuestChatWindow;
