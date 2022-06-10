import React from 'react';
import { FaNewspaper, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmptyPosts = ({ withButton = false, text = null }) => {
    return (
        <div className="text-center">
            <FaNewspaper className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-100" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No posts.
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                {text ? text : 'Get started by creating a new post.'}
            </p>
            {withButton && (
                <div className="mt-6">
                    <Link
                        to={'/posts/new'}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FaPlus
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        New Post
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EmptyPosts;
