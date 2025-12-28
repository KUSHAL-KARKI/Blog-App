import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser, clearAuthUser } from "../redux/authSlice";

const useVerifyAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/blogs/auth/verify",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
          dispatch(setAuthUser(data.user));
      } catch (error) {
        dispatch(clearAuthUser());
      }
    };

    verifyAuth();
  }, [dispatch]);
};

export default useVerifyAuth;
