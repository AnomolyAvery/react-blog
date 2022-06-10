import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../lib/state/slices/auth';

const ThemeToggle = () => {
    const { darkMode } = useSelector((state) => state.auth);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setDarkMode(!darkMode));
    };

    return (
        <div className="flex items-center justify-center">
            <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                onClick={handleClick}
            >
                {darkMode ? (
                    <FaSun className="h-6 w-6" />
                ) : (
                    <FaMoon className="h-6 w-6" />
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;
