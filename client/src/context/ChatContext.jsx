import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createUser, getAllUser, getMessagesBetweenUsers } from "../api";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    if (!selectedChat || !text.trim()) return;

    const newMessage = {
      sender: currentUser.email,
      receiver: selectedChat,
      text,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));
  };
  // When user logs in, sync to backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await createUser(user.email);
        const res = await getAllUser();
        const filtered = res.data.filter((u) => u.email !== user.email);
        setUsers(filtered);
      } else {
        setUsers([]);
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // When selected user changes, load message history
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser && selectedChat) {
        const res = await getMessagesBetweenUsers(
          currentUser.email,
          selectedChat
        );
      }
    };
    fetchMessages();
  }, [currentUser, selectedChat]);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
        users,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
