import { ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useChat } from "./context/ChatContext";

const Sidebar = () => {
  const { selectedChat, setSelectedChat } = useChat();
  const users = ["Ravi", "Kumar", "Prem"];

  return (
    <>
      <h5>Chats</h5>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item
            action
            key={user}
            active={selectedChat === user}
            onClick={() => setSelectedChat(user)}
          >
            <FaUserCircle className="me-2" />
            {user}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;
