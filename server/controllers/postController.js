const Post = require("../models/Post");

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
};

export const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    try {
        const post = await Post.create({
            title,
            content,
            author: req.user.id
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post.' });
    }
};

export const updatePost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        // Ensure the logged-in user is the post's author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this post.' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json({ error: 'Failed to update post.' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        // Ensure the logged-in user is the post's author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this post.' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully.' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post.' });
    }
};