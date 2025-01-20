import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUpdateBlog from "../hooks/useUpdateBlog";
import useBlogDetail from "../hooks/useBlogDetail";

const BlogUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { updateBlog } = useUpdateBlog();
  const { blogDetail } = useBlogDetail();
  useEffect(() => {
    const getBlog = async () => {
      const blogData = await blogDetail();
      setContent(blogData.content);
      setTitle(blogData.title);
    };
    getBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateBlog(title, content);
    navigate("/");
  };
  return (
    <div className="blog">
      <form onSubmit={handleUpdate}>
        <h2>Add a New Blog</h2>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default BlogUpdatePage;
