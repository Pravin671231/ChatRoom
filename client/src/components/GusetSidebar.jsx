import { Form, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const GuestSidebar = () => {
  return (
    <>
      <h5>Chats</h5>
      <Form.Control type="text" placeholder="Search chats..." />
      <ListGroup>
        <ListGroup.Item>
          <FaUserCircle className="me-2" />
          user1@gmail.com <span className="ms-2 text-success">●</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <FaUserCircle className="me-2" />
          user2@gmail.com <span className="ms-2 text-success">●</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <FaUserCircle className="me-2" />
          user3@gmail.com <span className="ms-2 text-success">●</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default GuestSidebar;
