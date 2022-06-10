import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import HeartButton from '../../components/posts/HeartButton';
import { getGravatarUrl } from '../../lib/utils/avatar';
import {
    fetchPostByIdAsync,
    getLikedPostsAsync,
} from '../../lib/state/slices/posts';
import { FaDotCircle, FaHeart } from 'react-icons/fa';
import Comment from '../../components/posts/Comment';
import { fetchCommentsAsync } from '../../lib/state/slices/comments';
import CreateComment from '../../components/posts/CreateComment';
import { FaQuestionCircle } from 'react-icons/fa';

const PostDetails = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { loading, post, error, likedPosts } = useSelector(
        (state) => state.posts
    );

    const { comments, loading: commentsLoading } = useSelector(
        (state) => state.comments
    );

    const { user } = useSelector((state) => state.auth);

    const params = useParams();

    const postId = params.id;

    const dispatch = useDispatch();

    const markdownIt = new MarkdownIt();

    useEffect(() => {
        if (postId && !post && loading !== 'pending') {
            dispatch(fetchPostByIdAsync(postId));
        }
    }, [postId]);

    useEffect(() => {
        if (post && post.id && !commentsLoading) {
            dispatch(fetchCommentsAsync(post.id));
        }
    }, [post, comments]);

    useEffect(() => {
        if (likedPosts === null && isAuthenticated && loading !== 'pending') {
            dispatch(getLikedPostsAsync());
        }
    }, [likedPosts, isAuthenticated]);

    return (
        <div>
            <div className="max-w-4xl mx-auto flex justify-center flex-wrap gap-4">
                <div className="flex-grow">
                    <div className="w-full bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            {loading === 'pending' && !post && (
                                <div className="text-center">
                                    <div className="text-gray-500">
                                        Loading post...
                                    </div>
                                </div>
                            )}
                            {error && !post && (
                                <div className="text-center">
                                    <div className="text-gray-500">{error}</div>
                                </div>
                            )}
                            {post && (
                                <>
                                    <h1 className="text-2xl font-semibold text-center leading-tight">
                                        {post?.title}
                                    </h1>
                                    <div className="mt-3 text-center flex justify-center items-center gap-4">
                                        <div className="inline-flex items-center">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src={getGravatarUrl(
                                                    post.user?.email ??
                                                        'test@test.com'
                                                )}
                                            />

                                            <div className="ml-2">
                                                <div className="text-gray-900 font-bold">
                                                    {post.user?.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500">
                                                {new Date(
                                                    post.createdAt
                                                ).toDateString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center gap-2">
                                                <span className="text-lg">
                                                    {post?.likes}
                                                </span>
                                                <FaHeart className="h-6 w-6 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="prose lg:prose-xl">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: markdownIt.render(
                                                        post?.content ?? ''
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-4" aria-labelledby="notes-title">
                        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                <div className="px-4 py-5 sm:px-6">
                                    <h2
                                        id="notes-title"
                                        className="text-lg font-medium text-gray-900"
                                    >
                                        Comments
                                    </h2>
                                </div>
                                <div className="px-4 py-6 sm:px-6">
                                    <ul role="list" className="space-y-8">
                                        {comments?.map((comment) => (
                                            <li key={comment.id}>
                                                <div className="flex space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={getGravatarUrl(
                                                                comment.user
                                                                    .email
                                                            )}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm">
                                                            <a
                                                                href="#"
                                                                className="font-medium text-gray-900"
                                                            >
                                                                {
                                                                    comment
                                                                        ?.user
                                                                        .name
                                                                }
                                                            </a>
                                                        </div>
                                                        <div className="mt-1 text-sm text-gray-700">
                                                            <p>
                                                                {
                                                                    comment.content
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="mt-2 text-sm space-x-2">
                                                            <span className="text-gray-500 font-medium">
                                                                {new Date(
                                                                    comment.createdAt
                                                                ).toDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {isAuthenticated && (
                                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={getGravatarUrl(
                                                    user?.email ??
                                                        'test@test.com'
                                                )}
                                                alt=""
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            {post && (
                                                <CreateComment
                                                    postId={post.id}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isAuthenticated && (
                    <div className="flex-shrink-0">
                        <div className="mt-10 px-4 flex flex-col">
                            <HeartButton post={post} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
