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

const Sidebar = () => {
    return (
        <nav className="space-y-1" aria-label="Sidebar">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'flex items-center px-3 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    <span className="truncate">#{item.name.toLowerCase()}</span>
                </a>
            ))}
        </nav>
    );
};

const Home = () => {
    const { posts, loading } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (posts.length === 0 && loading !== 'pending') {
            dispatch(fetchPostsAsync());
        }
    }, [posts]);

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
