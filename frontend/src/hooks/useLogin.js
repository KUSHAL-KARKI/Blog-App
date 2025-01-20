import { toast } from "sonner";
const useLogin = () => {
  const login = async (username, password) => {
    try {
      const success = handleInputErrors(username, password);
      if (!success) return;
      const response = await fetch("http://localhost:3000/api/blogs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(error.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
