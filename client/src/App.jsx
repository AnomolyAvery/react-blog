import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Home';
import Login from './screens/Login';
import NewPost from './screens/posts/NewPost';
import PostDetails from './screens/posts/PostDetails';
import Register from './screens/Register';
import Settings from './screens/Settings';
import Signout from './screens/Signout';
import UserDetails from './screens/users/UserDetails';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/users/:id" element={<UserDetails />} />

                <Route path="/posts/new" element={<NewPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
            </Route>
        </Routes>
    );
};

export default App;
