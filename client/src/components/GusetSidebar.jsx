import { Form, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useChat } from "../context/ChatContext";
import { useState } from "react";

const GuestSidebar = () => {
  const { guestUsers, selectedChat, setSelectedChat } = useChat();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter guestUsers based on the search term
  const filterUsers = guestUsers.filter((user) =>
    user.email.toLowerCase().includes(searchTerm)
  );
  return (
    <>
      <h5>Chats</h5>
      <Form.Control
        type="text"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ListGroup>
        {filterUsers.map((user) => (
          <ListGroup.Item
            className="mt-2"
            key={user._id}
            action
            active={selectedChat === user.email}
            onClick={() => setSelectedChat(user.email)}
          >
            <FaUserCircle className="me-2" />
            {user.email} <span className="ms-2 text-success">●</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default GuestSidebar;
