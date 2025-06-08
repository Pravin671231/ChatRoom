import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <>
      <Container fluid>
        <Row className="vh-100">
          <Col md={4} className="bg-light p-3">
            <Sidebar />
          </Col>
          <Col md={8} className="p-3">
            <ChatWindow />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
