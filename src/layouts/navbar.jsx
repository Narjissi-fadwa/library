import React from 'react';

const Navbar = () => {
    return (
        <>

            <nav className="bg-gray text-black p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className=" text-3xl font-decorative mt-12 text-center text-[#e3d6b3]">Bibliotheca</div>
                    <div className="hidden md:flex gap-x-4">
                        <a href="/home" className="hover:text-blue-400 font-serif">Home</a>
                        <a href="/login" className="hover:text-blue-400 font-serif">Login</a>
                        <a href="/signup" className="hover:text-blue-400 font-serif">Sign Up</a>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
