import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useBlogDetail from "../hooks/useBlogDetail";
import {  useSelector } from "react-redux";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");
  const { blogDetail } = useBlogDetail();
  const authUser = useSelector((state) => state.auth.authUser);
  useEffect(() => {
    const fetchData = async () => {
      const blogData = await blogDetail();
      setBlog(blogData);
    };
    fetchData();
  }, [blogDetail]);
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      console.log("Blog deleted successfully!");
      navigate("/");
    } else {
      const data = await response.json();
      alert(data.error || "An error occurred during deletion.");
    }
  };
  return (
    <>
      <div className="details">
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
        <p>
          <i>Created at: {new Date(blog.createdAt).toLocaleString()}</i>
        </p>
      </div>

      {authUser.role ==="admin" &&
        <div className="buttons">
          <Link to={`/blogs/${blog._id}/edit`}>
            <button className="update">Edit Blog</button>
          </Link>
          <button className="delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      }
    </>
  );
};

export default BlogDetailPage;
