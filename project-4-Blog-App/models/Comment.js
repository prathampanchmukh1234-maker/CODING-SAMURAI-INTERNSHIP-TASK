
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  postId: mongoose.Schema.Types.ObjectId,
  user: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
