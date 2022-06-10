import React, { useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addLikeAsync, removeLikeAsync } from '../../lib/state/slices/posts';

const classNames = (...args) => args.filter(Boolean).join(' ');

const HeartButton = ({ post }) => {
    const { likedPosts } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    const onClick = () => {
        if (likedPosts && post.id) {
            if (likedPosts.includes(post.id)) {
                dispatch(removeLikeAsync(post.id));
            } else {
                dispatch(addLikeAsync(post.id));
            }
        }
    };

    const isLiked = (postId) => likedPosts?.includes(postId) ?? false;

    return (
        <button onClick={onClick}>
            {isLiked(post?.id ?? '') ? (
                <FaHeart className="h-6 w-6 text-red-500" />
            ) : (
                <FaHeartBroken className="h-6 w-6 text-gray-500" />
            )}
        </button>
    );
};

export default HeartButton;
