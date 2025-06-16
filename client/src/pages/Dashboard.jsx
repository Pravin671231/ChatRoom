import { Button, Col, Container, Row } from "react-bootstrap";
import { auth } from "../firebase";
import { useChat } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
const Dashboard = () => {
  const { currentUser } = useChat();

  const handleLogout = () => {
    auth.signOut();
  };
  return currentUser ? (
    <Container fluid>
      <Row className="vh-100">
        <Col md={4} className="bg-light p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>{currentUser.email}</h5>
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Sidebar />
        </Col>
        <Col md={8} className="p-3">
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  ) : (
    <div className="text-center mt-5">
      <h4>Please login to access Chat</h4>
    </div>
  );
};

export default Dashboard;
