import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useSignup();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = await signup(username, password);
    if (data) {
      dispatch(setAuthUser(username));
      navigate("/");
    }
  };
  return (
    <div className="blog">
      <form onSubmit={handleSignup}>
        <h1>SIGN UP</h1>
        <label> Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
