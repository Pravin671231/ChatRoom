import { ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <h5>Chats</h5>
      <ListGroup>
        <ListGroup.Item action>
          <FaUserCircle className="me-2" />
          Pravin
        </ListGroup.Item>
        <ListGroup.Item action>
          <FaUserCircle className="me-2" />
          Kumar
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Sidebar;
