import { Card } from "react-bootstrap";

const GuestChatWindow = () => {
  return (
    <>
      <Card className="h-100">
        <Card.Header>Guest User</Card.Header>
        <Card.Body>
          <div
            className={"p-2 rounded w-50 align-self-start bg-light text-dark"}
          >
            <div className="small">Text message</div>
            <div className="text-end text-muted small"></div>
          </div>
          <div className="text-muted text-center mt-4">
            Select a user to start chatting
          </div>
          <div></div>
        </Card.Body>
        <Card.Footer>
          <form className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message....."
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </Card.Footer>
      </Card>
    </>
  );
};

export default GuestChatWindow;
