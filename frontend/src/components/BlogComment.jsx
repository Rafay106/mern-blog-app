import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function BlogComment({ comment }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`/api/users/profile/${comment.commenterId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => toast.error(error));
  }, []);
  return (
    <Card className="m-2 d-inline-block">
      <Card.Body>
        <Card.Title>{comment.body}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Card.Text>By: {user.first_name + " " + user.last_name}</Card.Text>
        <Card.Text>On: {comment.date}</Card.Text>
      </Card.Footer>
    </Card>
  );
}
export default BlogComment;
