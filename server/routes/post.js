const express = require('express');
const router = express.Router();

const { createPost, getAllPosts, updatePost, deletePost } = require("../controllers/postController");
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/posts', authMiddleware, getAllPosts);
router.post('/create', authMiddleware, createPost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);


module.exports = router;