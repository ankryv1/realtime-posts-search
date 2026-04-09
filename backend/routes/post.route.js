import express from "express";
import {
  fetchAndSavePosts,
  getAllPosts,
  getSinglePost
} from "../controllers/postController.js";

const router = express.Router();

router.get("/fetch-posts", fetchAndSavePosts);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

export default router;