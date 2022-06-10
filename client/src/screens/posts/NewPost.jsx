import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAsync, resetCreate } from '../../lib/state/slices/posts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRequired from '../../components/AuthRequired';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    const { error, createdPostId } = useSelector((state) => state.posts);

    const navigate = useNavigate();

    useEffect(() => {
        if (createdPostId) {
            dispatch(resetCreate());
            navigate(`/posts/${createdPostId}`);
        }
    }, [createdPostId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            createPostAsync({
                title,
                content,
            })
        );
    };

    const mdParser = new MarkdownIt();

    return (
        <AuthRequired>
            <div className="bg-white dark:bg-neutral-900 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                        New Post
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Title
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="dark:bg-neutral-800 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="My first post"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Content
                            </label>
                            <MdEditor
                                style={{ height: '500px', width: '100%' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={(e) => setContent(e.text)}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthRequired>
    );
};

export default NewPost;
