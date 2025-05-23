import React from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ek15tlo', 'template_tdm7754', e.target, 'RVLtZ8b5ggP-q_rax')
            .then((result) => {
                console.log(result.text);
                alert("Message sent successfully!");
            }, (error) => {
                console.log(error.text);
                alert("Failed to send message.");
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6F6149] to-[#4c3e2d] px-4 sm:px-6 py-20 font-serif flex items-center justify-center">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg px-10 py-5 w-full max-w-lg">
                    <h1 className="text-3xl font-bold font-decorative text-black text-center mb-10 mt-6">
                        Get In Touch
                    </h1>
                    <form onSubmit={sendEmail} >
                        <input type="text" name='name' id='Fullname' placeholder="Enter your full name" className='block w-full mb-4 p-2 px-16 border rounded' />
                        <input type="email" name='email' id='email' placeholder="Enter your email address" className='block w-full mb-4 p-2 border rounded' />
                        <input type="tel" name='phone' id='phone' placeholder="Enter your phone number" className='block w-full mb-4 p-2 border rounded' />
                        <input type="text" name='subject' id='subject' placeholder="Subject" className='block w-full mb-4 p-2 border rounded' />
                        <textarea placeholder='Description' name="description" className="mt-1 block w-full border rounded-md px-3 py-2 mb-4" rows={3} />
                        <button type="submit" className="w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900">
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Contact;
