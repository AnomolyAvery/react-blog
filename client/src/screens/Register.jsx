import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAsync, resetError, setError } from '../lib/state/slices/auth';
import { fetchAppStatsAsync } from '../lib/state/slices/stats';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const dispatch = useDispatch();

    const { usersCount, loading } = useSelector((state) => state.stats);

    useEffect(() => {
        dispatch(fetchAppStatsAsync());
    }, []);

    const { error, isAuthenticated } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        return () => {
            dispatch(resetError());
        };
    }, [isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !name || !password || !passwordConfirm) {
            dispatch(setError('Please fill out all fields.'));
            return;
        }

        if (password !== passwordConfirm) {
            dispatch(setError('Passwords do not match'));
            return;
        }

        dispatch(
            registerAsync({
                email,
                name,
                password,
            })
        );
    };

    return (
        <div>
            <div className="mx-auto lg:w-1/2 bg-white dark:bg-neutral-900 rounded shadow">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl dark:text-white font-semibold">
                            Welcome to the Blog.
                        </h1>
                        <p className="dark:text-gray-300">
                            The Blog is a community of {usersCount} amazing
                            users.
                        </p>
                    </div>
                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Error!</strong>
                            <span className="ml-2 block sm:inline">
                                {error}
                            </span>
                        </div>
                    )}
                    <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'email'}
                                        name="email"
                                        className="dark:bg-neutral-800 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'text'}
                                        name="name"
                                        className="dark:bg-neutral-800 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor=""
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'password'}
                                        name="password"
                                        className="dark:bg-neutral-800 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    htmlFor=""
                                >
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'password'}
                                        name="password"
                                        className="dark:bg-neutral-800 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={passwordConfirm}
                                        onChange={(e) =>
                                            setPasswordConfirm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
