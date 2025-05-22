import React from 'react';
import images from '../../../constant/images';


const About = () => {
    return (
        <div className="min-h-screen bg-[#6F6149]  px-6 py-16 font-serif ">
            <div className="max-w-6xl mx-auto ">
                <h1 className="text-5xl font-bold font-decorative text-white text-center mb-12 mt-28">
                    About Bibliotheca
                </h1>

                <div className="flex flex-col md:flex-row items-center gap-10">
                    
                    <div className="flex-1">
                        <p className="text-xl text-gray-200 mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla vel tincidunt 
                            consequat, felis justo sollicitudin lorem, non posuere libero nulla et sapien. Vivamus eget 
                            elit et lacus vehicula sodales vel in est.
                        </p>
                        <p className="text-xl text-gray-200">
                            Nullam auctor magna et mauris fringilla, at dapibus ligula malesuada. Phasellus vitae turpis 
                            in felis tempor suscipit. Suspendisse porta, nisi ac sollicitudin placerat, justo velit 
                            ultricies nunc, nec laoreet risus mi non ligula.
                        </p>
                    </div>

                    
                    <div className="flex-1">
                        <img 
                            src={images.about} 
                            alt="Library shelves with books" 
                            className="w-full h-auto rounded-xl shadow-lg border border-white/20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
