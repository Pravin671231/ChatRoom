import { Card } from "react-bootstrap";
import { useChat } from "../context/ChatContext";
import { useEffect, useRef, useState } from "react";

const ChatWindow = () => {
  const { currentUser, selectedChat, messages, guestMessages, sendMessage } =
    useChat();

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const isGuest = !currentUser;

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && selectedChat) {
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, guestMessages]);

  useEffect(() => {
    if (isGuest) {
      // console.log("GuestMessages updated:", guestMessages);
    }
  }, [guestMessages, isGuest]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const senderEmail = currentUser?.email || "guest";

  const chatMessages =
    selectedChat && (currentUser ? messages : guestMessages)
      ? (currentUser ? messages : guestMessages).filter(
          (msg) =>
            (msg.sender === senderEmail && msg.receiver === selectedChat) ||
            (msg.sender === selectedChat && msg.receiver === senderEmail)
        )
      : [];

  const chatHeader = selectedChat
    ? `Chat with ${selectedChat}`
    : "Select a user";

  return (
    <Card className="h-100">
      <Card.Header>{chatHeader}</Card.Header>
      <Card.Body className="overflow-auto d-flex flex-column gap-2">
        {selectedChat ? (
          chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded w-50 ${
                msg.sender === (currentUser?.email || "guest")
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
  );
};

export default ChatWindow;
