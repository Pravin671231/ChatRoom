import { Form, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useChat } from "../context/ChatContext";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { currentUser, selectedChat, setSelectedChat, activeUsers } = useChat();
  const [search, setSearch] = useState("");

  const isGuest = currentUser?.isAnonymous;

  // const activeUsers = isGuest ? guestUsers : users;

  const filteredUsers = activeUsers.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!selectedChat && filteredUsers.length > 0) {
      setSelectedChat(filteredUsers[0].email);
    }
  }, [filteredUsers, selectedChat, setSelectedChat]);
  // console.log(currentUser);

  return (
    <>
      <h5>Chats</h5>
      <Form.Control
        type="text"
        placeholder="Search users..."
        className="mb-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ListGroup>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ListGroup.Item
              action
              key={user._id || user.email}
              active={selectedChat === user.email}
              onClick={() => {
                if (!isGuest) setSelectedChat(user.email);
              }}
            >
              <FaUserCircle className="me-2" />
              {user.email}
              {selectedChat === user.email && (
                <span className="ms-2 text-success">●</span>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item disabled>No users found</ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default Sidebar;
