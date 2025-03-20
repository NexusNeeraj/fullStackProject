import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostList from './PostList';
import CreatePost from './CreatePost';
import API from '../utils/api';

const Layout = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await API.get('/post/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    // Handle new post creation
    const handlePostCreated = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    // Handle post update
    const handlePostUpdated = (updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
            )
        );
    };

    // Handle post deletion
    const handlePostDeleted = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header Section */}
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
                <div className="text-2xl font-bold">🚀 MyApp</div>
                <nav className="space-x-4">
                <button onClick={handleLogout} className="hover:underline">Logout</button>
                </nav>
            </header>

            {/* Main Content Section */}
            <main className="flex-grow p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <CreatePost onPostCreated={handlePostCreated} />
                    <PostList
                        posts={posts}
                        onPostUpdated={handlePostUpdated}
                        onPostDeleted={handlePostDeleted}
                    />
                </div>
            </main>

            {/* Footer Section */}
            <footer className="bg-blue-500 text-white text-center py-3">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
