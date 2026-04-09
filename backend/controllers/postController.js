import axios from "axios";
import Post from "../models/post.model.js";


export const fetchAndSavePosts = async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");


    const savedPosts = await Post.insertMany(response.data);

    res.json({
      success: true,
      count: savedPosts.length,
      savedPosts
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};