import { toast } from "sonner";
const useSignup = () => {
  const signup = async (username, password) => {
    try {
      const success = handleInputErrors(username, password);
      if (!success) return;
      const response = await fetch("http://localhost:3000/api/blogs/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(error.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { signup };
};

export default useSignup;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
