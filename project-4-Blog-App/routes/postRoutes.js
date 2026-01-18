
const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.path : "",
    author: req.user.id
  });

  await post.save();
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "name avatar");
  res.json(posts);
});

router.delete("/:id", auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
