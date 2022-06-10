import React from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getGravatarUrl } from '../../lib/utils/avatar';
import { FaQuestionCircle } from 'react-icons/fa';
import { createCommentAsync } from '../../lib/state/slices/comments';

const CreateComment = ({ postId }) => {
    const { user } = useSelector((state) => state.auth);

    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!comment) {
            return;
        }

        dispatch(
            createCommentAsync({
                content: comment,
                postId,
            })
        );
        setComment('');
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="comment" className="sr-only">
                    About
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="dark:bg-neutral-900 dark:text-white shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add a note"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <div className="mt-3 flex items-center justify-between">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Comment
                </button>
            </div>
        </form>
    );
};

export default CreateComment;
