import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, resetError } from '../lib/state/slices/auth';
import { fetchAppStatsAsync } from '../lib/state/slices/stats';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, isAuthenticated, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { usersCount, loading } = useSelector((state) => state.stats);

    useEffect(() => {
        dispatch(fetchAppStatsAsync());
    }, []);

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

        if (!email || !password) {
            return;
        }

        dispatch(
            loginAsync({
                email,
                password,
            })
        );
    };

    return (
        <div>
            <div className="mx-auto lg:w-1/2 bg-white rounded shadow">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">
                            Welcome to the Blog.
                        </h1>
                        <p>
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
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'email'}
                                        name="email"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor=""
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={'password'}
                                        name="password"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
