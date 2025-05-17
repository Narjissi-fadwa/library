import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-3xl font-decorative text-[#e3d6b3] ">
                    Bibliotheca
                </div>
                <div className="hidden md:flex gap-x-6">
                    <Link to="/" className="text-white hover:text-[#e3d6b3] font-serif transition-colors duration-300">
                        Home
                    </Link>
                    <Link to="/about" className="text-white hover:text-[#e3d6b3] font-serif transition-colors duration-300">
                        About
                    </Link>
                    <Link to="/login" className="text-white hover:text-[#e3d6b3] font-serif transition-colors duration-300">
                        Login
                    </Link>
                    <Link to="/login" className="text-white hover:text-[#e3d6b3] font-serif transition-colors duration-300">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;