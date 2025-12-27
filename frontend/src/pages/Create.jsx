import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateBlog from "../hooks/useCreateBlog";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { createBlog } = useCreateBlog();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(title, content);
    navigate("/");
  };

  return (
    <div className="blog">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default Create;
