import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeartButton from './HeartButton';
import { getGravatarUrl } from '../../lib/utils/avatar';

const PostCard = ({ post }) => {
    return (
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <Link
                    to={`/posts/${post.id}`}
                    className="text-lg leading-6 font-medium text-gray-900 hover:text-gray-600"
                >
                    {post?.title}
                </Link>
                <p className="mt-1 text-base leading-6 text-gray-500">
                    {post?.content?.substring(0, 100) + '...'}
                </p>

                <div className="mt-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={getGravatarUrl(
                                        post?.user?.email ?? 'test@test.com'
                                    )}
                                    alt=""
                                />
                            </div>
                            <Link
                                to={`/users/${post?.user?._id}`}
                                className="ml-3"
                            >
                                <p className="text-base leading-6 font-medium text-gray-900">
                                    {post?.user?.name}
                                </p>
                                <div className="flex text-sm leading-5 text-gray-500">
                                    <time dateTime={post?.createdAt}>
                                        {new Date(
                                            post?.createdAt
                                        ).toDateString()}
                                    </time>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
