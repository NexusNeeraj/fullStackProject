import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await API.get('/posts');
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
                All Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <div
                        key={post._id}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                    >
                        <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.content}</p>
                        <p className="text-sm text-gray-500 mt-4">By: {post.author.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
