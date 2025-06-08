import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    if (text.trim() && selectedChat) {
      setMessages((prev) => [...prev, { sender: currentUser.email, text }]);
    }
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
        sendMessage,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
