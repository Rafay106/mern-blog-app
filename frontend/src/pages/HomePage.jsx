import { useEffect, useState } from "react";
import axios from "axios";
// Bootstrap
import { Container, Card, Button } from "react-bootstrap";
// Componenets
import { toast } from "react-toastify";
import BlogTile from "../components/BlogTile";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogs/all")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <div className="">
      {blogs.map((blog) => {
        return <BlogTile key={blog._id} blog={blog} />;
      })}
    </div>
  );
}
export default HomePage;
