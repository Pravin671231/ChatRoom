import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getAllUsers, getMessagesBetweenUsers, sendMessageToAPI } from "../api";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [guestMessages, setGuestMessages] = useState([]);

  // 🧪 Static guest users
  const guestUsers = [
    { _id: "1", email: "pravin@example.com" },
    { _id: "2", email: "kumar@example.com" },
    { _id: "3", email: "ravi@example.com" },
  ];

  // Return active users depending on auth status
  const activeUsers = currentUser ? users : guestUsers;

  // 📨 Send message handler
  const sendMessage = async (text) => {
    const message = {
      text,
      sender: currentUser?.email || "guest",
      receiver: selectedChat,
      createdAt: Date.now(),
    };

    if (currentUser) {
      try {
        const res = await sendMessageToAPI(message);
        setMessages((prev) => [...prev, res.data]);
      } catch (error) {
        console.error("Failed to send message to backend");
      }
    } else {
      setGuestMessages((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    const unsubscripe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscripe();
  }, []);

  //users fetching
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        const allUsers = res.data.users;
        const filtered = allUsers.filter((u) => u.email !== currentUser.email);
        console.log(allUsers);

        setUsers(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  //user message fetching
  useEffect(() => {
    if (currentUser && selectedChat) {
      getMessagesBetweenUsers(currentUser.email, selectedChat)
        .then((res) => setMessages(res.data))
        .catch(console.error);
    }
  }, [currentUser, selectedChat]);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        guestUsers,
        activeUsers,
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
        guestMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
