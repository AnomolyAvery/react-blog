import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { getGravatarUrl } from '../lib/utils/avatar';
import ThemeToggle from './ThemeToggle';

const classNames = (...classNames) => {
    return classNames.filter(Boolean).join(' ');
};

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const [isDark, setIsDark] = useState(false);

    return (
        <nav className="bg-white dark:bg-neutral-900 shadow py-4 px-2">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to={'/'}>
                            <img
                                src={
                                    'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/84_Dev-512.png'
                                }
                                className="w-12 h-12"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div>
                        <ul className="flex gap-4 justify-between items-center list-reset">
                            <li>
                                <ThemeToggle />
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <Menu as="div" className="relative">
                                            <div>
                                                <Menu.Button className="bg-white dark:bg-neutral-900 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={getGravatarUrl(
                                                            user?.email ??
                                                                'test@test.com'
                                                        )}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={`/users/${user.id}`}
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 dark:bg-neutral-700'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                                                                )}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={'/signout'}
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 dark:bg-neutral-700'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                                                                )}
                                                            >
                                                                Sign out
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </li>
                                    <li>
                                        <Link
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            to={'/posts/new'}
                                        >
                                            New Post
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            to={'/login'}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            to={'/register'}
                                        >
                                            Create account
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
