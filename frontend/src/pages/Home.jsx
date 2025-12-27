import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setBlogs(json);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, [navigate]);

  return (
    <div className="blogs">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h1>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </h1>
            <p>{blog.content.substring(0, 50)}...</p>
            <p>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Home;
