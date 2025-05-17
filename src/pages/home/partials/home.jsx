import React from 'react';
import Images from '../../../constant/images';

const Home = () => {
    return (
        <div className="relative min-h-screen w-full">
            <div 
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10" 
                style={{ backgroundImage: `url(${Images.libraryBackground})` }}
            ></div>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10"></div>
            
            
            <div className="relative pt-24 pb-16 px-4 min-h-screen">
                <div className="container mx-auto">
                    <div className="text-center mb-16 mt-12">
                        <h1 className="text-5xl font-bold font-decorative text-white mb-6">
                            Welcome to Bibliotheca
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto font-serif">
                            Discover a world of knowledge through our extensive collection of books, 
                            journals, and digital resources.
                        </p>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Home;