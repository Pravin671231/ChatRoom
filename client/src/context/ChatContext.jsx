import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState({
    Pravin: [
      { sender: "Pravin", message: "Hi" },
      { sender: "me", message: "Hello Pravin" },
    ],
    Kumar: [{ sender: "Kumar", message: "Hello from Kumar" }],
  });

  const sendMessage = (text) => {
    if (!selectedChat || !text.trim()) return;

    const newMessage = {
      sender: currentUser.email,
      text,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
