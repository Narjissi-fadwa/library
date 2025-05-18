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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
                            <h2 className="text-2xl font-serif mb-4">Featured Books</h2>
                            <p className="text-gray-700">Discover our collection of best-selling and award-winning titles.</p>
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300">
                                Browse Collection
                            </button>
                        </div>
                        
                        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
                            <h2 className="text-2xl font-serif mb-4">New Arrivals</h2>
                            <p className="text-gray-700">Check out the latest additions to our ever-growing library.</p>
                            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300">
                                See New Books
                            </button>
                        </div>
                        
                        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
                            <h2 className="text-2xl font-serif mb-4">Member Services</h2>
                            <p className="text-gray-700">Access exclusive content and services with your library membership.</p>
                            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-decorative text-white mb-6">Explore Our Library</h3>
                        <button className="bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;