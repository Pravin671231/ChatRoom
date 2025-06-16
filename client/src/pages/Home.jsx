import { Button, Col, Container, Row } from "react-bootstrap";
import Register from "../components/Register";
import GuestChatWindow from "../components/GuestChatWindow";
import GusetSidebar from "../components/GusetSidebar";

const Home = () => {
  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={5}>
          <Register />
        </Col>
        <Col md={7} className="p-3">
          <Container fluid>
            <Row className="vh-100">
              <Col md={4} className="bg-light p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Pravin@gmail.com</h5>
                  <Button size="sm">Logout</Button>
                </div>
                <GusetSidebar />
              </Col>
              <Col md={8}>
                <GuestChatWindow />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
