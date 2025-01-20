import { toast } from "sonner";
const useCreateBlog = () => {
  const createBlog = async (title, content) => {
    try {
      const res = await fetch("http://localhost:3000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { createBlog };
};

export default useCreateBlog;
