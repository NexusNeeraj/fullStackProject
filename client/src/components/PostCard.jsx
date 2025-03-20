import React, { useState } from 'react';
import API from '../utils/api';

const PostCard = ({ post, onPostUpdated, onPostDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(post.content);

    // Update Post
    const handleUpdate = async () => {
        try {
            const response = await API.put(`/post/posts/${post._id}`, {
                ...post,
                content: updatedContent,
            });
            onPostUpdated(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    // Delete Post
    const handleDelete = async () => {
        try {
            await API.delete(`/post/posts/${post._id}`);
            onPostDeleted(post._id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">By {post.author}</p>

            {isEditing ? (
                <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            ) : (
                <p className="mt-2">{post.content}</p>
            )}

            <div className="flex gap-2 mt-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PostCard;
