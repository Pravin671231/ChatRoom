import { createContext, useContext, useState } from "react";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("you");
  const [selectedChat, setSelectedChat] = useState("Pravin");

  const [messages, setMessages] = useState([
    { sender: "Pravin", message: "Hello!" },
    { sender: "You", message: "Hi Pravin!" },
  ]);

  const sendMessage = (text) => {
    if (text.trim()) {
      setMessages((prev) => [...prev, { sender: currentUser, text }]);
    }
  };
  return (
    <ChatContext.Provider
      value={{ currentUser, selectedChat, setSelectedChat, sendMessage,messages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat =()=> useContext(ChatContext);
