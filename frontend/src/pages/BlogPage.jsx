import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import BlogComment from "../components/BlogComment";
import { toast } from "react-toastify";

function BlogPage() {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/blogs/${blogId}`)
      .then(async (res) => {
        setBlog(res.data);
        setComments(res.data.comments);
      })
      .catch((error) =>
        toast.error(
          `Error ${error.response.status}: ${error.response.data.error}`
        )
      );
  }, []);

  return (
    <Container>
      <Card className="m-2">
        <Card.Header>
          <Card.Title>{blog.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{blog.body}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Card.Text>Author: {blog.authorName}</Card.Text>
          <Card.Text>Published on: {blog.createdAt}</Card.Text>
        </Card.Footer>
      </Card>
      <div className="px-2">
        {comments.map((comment) => (
          <BlogComment key={comment._id} comment={comment} />
        ))}
      </div>
    </Container>
  );
}
export default BlogPage;
