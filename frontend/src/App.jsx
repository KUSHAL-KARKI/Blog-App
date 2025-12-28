import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogUpdatePage from "./pages/BlogUpdatePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useVerifyAuth from "./hooks/useVerifyAuth";

const App = () => {
  useVerifyAuth(); // Verify auth on app load

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/blogs/:id/edit" element={<BlogUpdatePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
