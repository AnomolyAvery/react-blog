import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="py-4">
                <div className="container mx-auto max-w-5xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
