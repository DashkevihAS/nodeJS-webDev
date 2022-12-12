const createPath = require('../helpers/create-path');

const Post = require('../models/post');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath('posts'), { posts, title }))
    .catch((err) => handleError(res, err));
};

const getPost = (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => res.render(createPath('post'), { title, post }))
    .catch((err) => handleError(res, err));
};

const deletePosts = (req, res) => {
  const title = 'Post';
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status = 200;
    })
    .catch((err) => handleError(res, err));
};

const getEditPosts = (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => res.render(createPath('edit-post'), { post, title }))
    .catch((err) => handleError(res, err));
};

const putEditPosts = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((err) => handleError(res, err));
};

const postAddPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => handleError(res, error));
};

const getAddPosts = (req, res) => {
  const title = 'Add post';
  res.render(createPath('add-post'), { title });
};

module.exports = {
  getPosts,
  getPost,
  deletePosts,
  getEditPosts,
  putEditPosts,
  postAddPost,
  getAddPosts,
};
