import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const AdminRoute = ({ children }) => {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" />;
    }
    return children;
};


export const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export const AuthRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        if (currentUser.role === 'admin') {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return children;
};