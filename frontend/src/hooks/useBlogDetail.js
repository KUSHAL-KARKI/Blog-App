import { useParams } from "react-router-dom";
import { toast } from "sonner";
const useBlogDetail = () => {
  const { id } = useParams();
  const blogDetail = async (title, content) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { blogDetail };
};

export default useBlogDetail;
