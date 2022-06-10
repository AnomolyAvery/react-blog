import React, { useEffect } from 'react';
import {
    FaIdBadge,
    FaLevelUpAlt,
    FaNewspaper,
    FaRegIdBadge,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/posts/PostCard';
import Spinner from '../../components/Spinner';
import {
    fetchUserAsync,
    fetchUserPostsAsync,
} from '../../lib/state/slices/users';
import { getGravatarUrl } from '../../lib/utils/avatar';

const UserDetails = () => {
    const params = useParams();

    const { user, loading, error, posts } = useSelector((state) => state.users);

    const id = params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        if (id && !user && loading !== 'pending') {
            dispatch(fetchUserAsync(id));
        }
    }, [id]);

    useEffect(() => {
        if (user && loading !== 'pending') {
            dispatch(fetchUserPostsAsync(user.id));
        }
    }, [user]);

    /**
     *
     * @param {Number} postCount
     * @returns {Number}
     */
    const getUserLevel = (postCount) => {
        return Math.floor(postCount / 10) + 1;
    };

    return (
        <div>
            <div>
                <div>
                    <div
                        className="h-32 w-full rounded-lg bg-emerald-400 object-cover lg:h-48"
                        alt=""
                    />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                            <img
                                className="h-24 w-24 rounded-full ring-4 bg-white ring-white sm:h-32 sm:w-32"
                                src={getGravatarUrl(
                                    user?.email ?? 'test@test.com'
                                )}
                                alt=""
                            />
                        </div>
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 truncate">
                                    {user?.name}
                                </h1>
                                <p className="text-gray-500">Bio...</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {user?.name}
                        </h1>
                        <p className="mt-1 text-sm font-medium text-gray-600 truncate">
                            Bio...
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <div className="bg-white rounded-lg py-4 px-6">
                    <div className="flex gap-4 flex-wrap items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Posts
                        </h2>

                        <div className="flex flex-wrap items-center">
                            <div className="inline-flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                <span>{user?.postCount ?? 0} posts</span>{' '}
                                <FaNewspaper className="h-6 w-6 text-gray-900" />
                            </div>
                            <div className="inline-flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                <span>
                                    Level {getUserLevel(user?.postCount ?? 0)}
                                </span>{' '}
                                <FaLevelUpAlt className="h-6 w-6 text-gray-900" />
                            </div>
                        </div>
                    </div>
                </div>

                {loading === 'pending' ? (
                    <div className="mt-6 flex items-center justify-center">
                        <Spinner size={'lg'} />
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col gap-2">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
