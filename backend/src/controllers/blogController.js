import { NotFoundError } from "../middleware/errorHandler.js";
import { Blog } from "../models/blogmodel.js";

// get all blog
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};

// get blog detail
export const getDetail = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new NotFoundError("Blog not found");
  }
  res.status(200).json(blog);
};

// create blog
export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new Blog(blog);
  await newBlog.save();
  res.status(201).json(newBlog);
};

// update blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  if (!updatedBlog) {
    throw new NotFoundError("Blog not found");
  }
  res.status(200).json(updatedBlog);
};

// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  res.json(deletedBlog);
};
