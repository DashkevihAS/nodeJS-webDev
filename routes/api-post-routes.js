const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPost,
  deletePosts,
  putEditPosts,
  postAddPost,
} = require('../controllers/api-post-controller');

// GET all posts
router.get('/api/posts', getPosts);

// Add new post
router.post('/api/post', postAddPost);

//Get post by id
router.get('/api/post/:id', getPost);

//DELETE post by id
router.delete('/api/post/:id', deletePosts);

// Update post by id
router.put('/api/post/:id', putEditPosts);

module.exports = router;
