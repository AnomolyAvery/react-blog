import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeAsync } from '../lib/state/slices/auth';

const SettingsForm = () => {
    const { user } = useSelector((state) => state.auth);

    const [name, setName] = useState(user.name);
    const [biography, setBiography] = useState(user.biography);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateMeAsync({
                name,
                biography,
            })
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200 dark:divide-neutral-700"
        >
            <div className="space-y-8 divide-y divide-gray-200 dark:divide-neutral-700 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            Profile
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                            This information will be displayed publicly so be
                            careful what you share.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                            >
                                Id
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 dark:bg-neutral-700 dark:text-gray-300 text-gray-500 sm:text-sm">
                                        theblog.gg/users/
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="dark:bg-neutral-800 dark:text-white flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        disabled
                                        value={user.id}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-neutral-700 sm:pt-5">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                            >
                                Name
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="dark:bg-neutral-800 dark:text-white max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-neutral-700 sm:pt-5">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                            >
                                Biography
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="dark:bg-neutral-800 dark:text-white max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                                    value={biography}
                                    onChange={(e) =>
                                        setBiography(e.target.value)
                                    }
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Write a few sentences about yourself.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SettingsForm;
