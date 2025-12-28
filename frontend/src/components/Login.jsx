import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useLogin();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(username, password);

    if (data) {
      dispatch(setAuthUser({ username: username, role: data.role }));
      navigate("/");
    }
  };

  return (
    <div className="blog">
      <form onSubmit={handleLogin}>
        <h1>LOGIN</h1>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
