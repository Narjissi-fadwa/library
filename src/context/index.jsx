import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in when the app loads
    useEffect(() => {
        const checkLoggedIn = () => {
            const storedUser = localStorage.getItem('bibliotheca_user');

            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }

            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Login function
    const login = (userData) => {
        localStorage.setItem('bibliotheca_user', JSON.stringify(userData));
        setCurrentUser(userData);

        // Redirect based on role
        if (userData.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('bibliotheca_user');
        setCurrentUser(null);
        navigate('/login');
    };

    // Check if user has admin role
    const isAdmin = () => {
        return currentUser?.role === 'admin';
    };

    // Value to be provided by the context
    const value = {
        currentUser,
        login,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;