const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  device: { type: String },
  userID: { type: String },
},{versionKey:false});

const PostModel = mongoose.model("posts", postSchema);

module.exports = { PostModel };
