import { Blog } from "../models/blogmodel.js";
// get all blog
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};
// get blog detail
export const getDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id); 
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" }); 
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error.message); 
    res.status(500).json({ error: "Server error" }); 
  }
};


// create blog
export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new Blog(blog);

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
  }
};

// update blog
export const updateBlog = async (req, res) => {
  const {id}= req.params
  const {title, content}= req.body
  try {
    const updatedBlog= await Blog.findByIdAndUpdate(id,{title,content},{new:true})
    if(!updatedBlog){
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog); 
    
  } catch (error) {
    console.log(error)
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    console.log(error);
  }
};
