import { Card } from "react-bootstrap";

import BlogComment from "./BlogComment";

function BlogTile({ blog }) {
  return (
    <Card
      className="m-2 bg-dark text-light"
      style={{
        width: "15rem",
        display: "inline-block",
      }}
    >
      <Card.Body>
        <Card.Link
          href={`/${blog._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>{blog.body}</Card.Text>
          <Card.Text>{blog.createdAt}</Card.Text>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
export default BlogTile;
