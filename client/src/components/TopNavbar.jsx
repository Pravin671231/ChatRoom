import { Button, Container, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useChat } from "../context/ChatContext";

const TopNavbar = () => {
  const { currentUser } = useChat();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand>Chat Room</Navbar.Brand>
        {currentUser && (
          <div className="d-flex align-items-center gap-3 text-white">
            <small>{currentUser.email}</small>
            <Button size="sm" variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
