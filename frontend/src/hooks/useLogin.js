import { toast } from "sonner";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      const success = handleInputErrors(username, password);
      if (!success) return null;
      
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/blogs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }
      
      toast.success("Login successful!");
      return data; // Return user data on success
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
