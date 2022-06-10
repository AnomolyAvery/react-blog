import React from 'react';
import { useDispatch } from 'react-redux';
import AuthRequired from '../components/AuthRequired';
import { resetAuth } from '../lib/state/slices/auth';

const Signout = () => {
    const dispatch = useDispatch();

    const onSignout = () => {
        localStorage.removeItem('user');
        dispatch(resetAuth());
    };

    return (
        <AuthRequired>
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Sign out of your account
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                            Are you sure you want to sign out of your account?
                        </p>
                    </div>
                    <div className="mt-5">
                        <button
                            onClick={onSignout}
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </AuthRequired>
    );
};

export default Signout;
