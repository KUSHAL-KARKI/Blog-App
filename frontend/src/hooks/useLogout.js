import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "../redux/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Logout failed");
      }

      dispatch(clearAuthUser());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { logout };
};

export default useLogout;
