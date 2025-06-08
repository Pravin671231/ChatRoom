import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Card, Form } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: 400 }}>
      <h4 className="mb-3">Register</h4>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password (minimum 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" className="w-100">
            Regiter
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Register;
