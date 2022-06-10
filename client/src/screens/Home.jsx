import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/posts/PostCard';
import Spinner from '../components/Spinner';
import { fetchPostsAsync } from '../lib/state/slices/posts';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Documents', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Home = () => {
    const { posts, loading } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, []);

    return (
        <div>
            {loading === 'pending' && (
                <div className="mt-4 flex gap-4 items-center flex-col justify-center">
                    <Spinner size={'lg'} />
                    <p className="text-gray-500 text-lg text-center">
                        Loading posts...
                    </p>
                </div>
            )}
            {posts && (
                <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
