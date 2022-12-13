const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => handleError(res, err));
};

const postAddPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => handleError(res, err));
};

const deletePosts = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((err) => handleError(res, err));
};

// { new: true }  чтобы после внесения изменений показывались новые значения
const putEditPosts = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getPosts,
  getPost,
  deletePosts,
  putEditPosts,
  postAddPost,
};
