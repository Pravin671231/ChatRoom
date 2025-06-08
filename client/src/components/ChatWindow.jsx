import { Card } from "react-bootstrap";

const ChatWindow = () => {
  return (
    <>
      <Card className="h-100">
        <Card.Header>Chat with Pravin</Card.Header>
        <Card.Body>
          <div className="text-start mb-2">Pravin: Hello!</div>
          <div className="text-end mb-2">You: Hi Pravin!</div>
        </Card.Body>
        <Card.Footer>
          <input
            type="text"
            className="form-control"
            placeholder="Type your message....."
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default ChatWindow;
