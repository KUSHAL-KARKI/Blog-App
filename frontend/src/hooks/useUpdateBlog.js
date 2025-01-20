import { useParams } from "react-router-dom";
import { toast } from "sonner";

const useUpdateBlog = () => {
  const { id } = useParams();
  const updateBlog = async (title, content) => {

    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    updateBlog,
  };
};

export default useUpdateBlog;
