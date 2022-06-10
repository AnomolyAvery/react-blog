import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const AuthRequired = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    if (loading === 'pending') {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={'/login'} />;
    }

    return <>{children}</>;
};

export default AuthRequired;
