import { ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useChat } from "../context/ChatContext";

const Sidebar = () => {
  const { users, selectedChat, setSelectedChat } = useChat();

  return (
    <>
      <h5>Chats</h5>
      <ListGroup>
        {users.map((user) => (
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
