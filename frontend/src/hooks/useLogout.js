import { toast } from "sonner";
const useLogout = () => {
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return { logout };
};

export default useLogout;
