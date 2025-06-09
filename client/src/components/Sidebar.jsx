import { Form, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useChat } from "../context/ChatContext";
import { useState } from "react";

const Sidebar = () => {
  const { users, selectedChat, setSelectedChat } = useChat();
  const [search,setSearch]=useState("")

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>

      <h5>Chats</h5>
      <Form.Control
        type="text"
        placeholder="Search users..."
        className="mb-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ListGroup>
        {filteredUsers.map((user) => (
          <ListGroup.Item
            action
            key={user._id}
            active={selectedChat === user.email}
            onClick={() => setSelectedChat(user.email)}
          >
            <FaUserCircle className="me-2" />
            {user.email}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
