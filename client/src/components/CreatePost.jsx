import React, { useState } from 'react';
import API from '../utils/api';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const { data } = await API.post('/post/create', { title, author, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Post created successfully!');
            onPostCreated(data.post); // Trigger post refresh
            setTitle('');
            setAuthor('');
            setContent('');
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create a Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post Title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Post Content"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
