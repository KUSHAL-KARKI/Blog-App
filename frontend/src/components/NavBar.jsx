import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { clearAuthUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuthUser());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <h1>BLOG APP</h1>
        <ul>
          {authUser ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              {authUser.role === "admin" && (
                <li>
                  <Link to="/create">Add Blog</Link>
                </li>
              )}

              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
