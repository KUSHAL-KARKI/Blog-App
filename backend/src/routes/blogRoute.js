import { Router } from "express";
import { authenticate , authorizeAdmin} from "../middleware/usermiddleware.js";
import { createBlog, updateBlog, deleteBlog,getBlogs, getDetail } from "../controllers/blogController.js";
import { signup, login, logout } from "../controllers/userController.js";

const router = Router();
router.get("/", authenticate,getBlogs);
router.get("/:id",authenticate,getDetail)
router.post("/", authenticate,authorizeAdmin,createBlog);
router.put("/:id",authenticate ,authorizeAdmin,updateBlog);
router.delete("/:id", authenticate,authorizeAdmin,deleteBlog);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout)
export default router;
