const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPost,
  deletePosts,
  getEditPosts,
  putEditPosts,
  postAddPost,
  getAddPosts,
} = require('../controllers/post-controller');

router.get('/posts', getPosts);

router.get('/posts/:id', getPost);

router.delete('/posts/:id', deletePosts);

router.get('/edit/:id', getEditPosts);

router.put('/edit/:id', putEditPosts);

router.post('/add-post', postAddPost);

router.get('/add-post', getAddPosts);

module.exports = router;
