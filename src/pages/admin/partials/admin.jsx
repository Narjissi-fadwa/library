
import React, { useState } from 'react';

const Admin = ({ onAddBook }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        cover: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setBook({
            ...book,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (book.title && book.author && book.cover) {
            onAddBook(book);
            alert("Book added successfully!");
            setBook({
                title: '',
                author: '',
                description: '',
                category: '',
                cover: null,
            });
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center bg-[#6F6149] px-6 py-16 font-serif ">

            <div className='space-y-4  bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md '>
                <h2 className="text-3xl font-decorative text-center mb-6">Add a New Book</h2>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div>
                        <label className="block text-gray-700 font-serif mb-2">Title </label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif mb-2">Author </label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif mb-2">Description</label>
                        <textarea
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif mb-2">Category</label>
                        <select
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                        >
                            <option value="">Select a category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-fiction">Non-fiction</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Romance">Romance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-serif mb-2">Book Cover *</label>
                        <input
                            type="file"
                            name="cover"
                            onChange={handleChange}
                            accept="image/*"
                            className="mt-1 block w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
