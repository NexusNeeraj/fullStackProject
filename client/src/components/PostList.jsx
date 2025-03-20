import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onPostUpdated, onPostDeleted }) => {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    onPostUpdated={onPostUpdated}
                    onPostDeleted={onPostDeleted}
                />
            ))}
        </div>
    );
};

export default PostList;
