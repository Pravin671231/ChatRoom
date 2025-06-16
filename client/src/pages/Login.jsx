import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Card, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: 400 }}>
      <h4 className="mb-3">Login</h4>
      <Form onSubmit={handleLogin}>
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
            Login
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Login;
