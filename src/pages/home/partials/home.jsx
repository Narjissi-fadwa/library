import React, { useState, useEffect } from 'react';
import Images from '../../../constant/images';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [searchResults, setSearchResults] = useState(null);
    const [allBooks, setAllBooks] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    const formatBooks = (docs) => {
        return docs.map(book => ({
            key: book.key,
            title: book.title || 'Unknown Title',
            author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
            publishYear: book.first_publish_year || 'Unknown',
            isbn: book.isbn ? book.isbn[0] : null,
            coverUrl: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null,
            subjects: book.subject ? book.subject.slice(0, 3) : []
        }));
    };

    const mapBooks = async () => {
        setError('');
        const res = await fetch('https://openlibrary.org/search.json?q=books&limit=100');
        if (!res.ok) {
            setError('Failed to fetch books.');
            return;
        }
        const data = await res.json();
        setAllBooks(formatBooks(data.docs));
    };

    const searchBooks = async (query, type = searchType) => {
        if (!query.trim()) return;
        setHasSearched(true);
        setError('');
        setSearchResults(null);

        const param = type === 'author' ? 'author' : 'title';
        const res = await fetch(`https://openlibrary.org/search.json?${param}=${encodeURIComponent(query)}&limit=12`);

        if (!res.ok) {
            setError('Failed to fetch books.');
            setSearchResults([]);
            return;
        }

        const data = await res.json();
        setSearchResults(formatBooks(data.docs));
    };

    useEffect(() => {
        mapBooks();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        searchBooks(searchQuery);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    

    const renderBooks = (books) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <div
                    key={book.key}
                    className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex flex-col h-full">
                        {book.coverUrl && (
                            <div className="mb-4 flex justify-center">
                                <img
                                    src={book.coverUrl}
                                    alt={`Cover of ${book.title}`}
                                    className="w-24 h-32 object-cover rounded shadow-md"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-gray-700 mb-2 font-serif">
                                <span className="font-semibold">Author:</span> {book.author}
                            </p>
                            <p className="text-gray-600 mb-3 text-sm">
                                <span className="font-semibold">Published:</span> {book.publishYear}
                            </p>
                            {book.subjects.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 mb-1">Categories:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {book.subjects.map((subject, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-[#e3d6b3] text-gray-800 text-xs rounded-full"
                                            >
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition duration-300">
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative min-h-screen w-full">
            <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: `url(${Images.libraryBackground})` }}></div>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10"></div>

            <div className="relative pt-24 pb-16 px-4 min-h-screen">
                <div className="container mx-auto">
                    <div className="text-center mb-16 mt-12">
                        <h1 className="text-5xl font-bold font-decorative text-white mb-6">
                            Welcome to Bibliotheca
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto font-serif mb-8">
                            Discover a world of knowledge through our extensive collection of books,
                            journals, and digital resources.
                        </p>

                        <div className="max-w-2xl mx-auto mb-8">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="flex">
                                    <select
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="px-4 py-4 rounded-l-lg bg-white bg-opacity-90 backdrop-blur-sm border-none focus:outline-none focus:ring-2 focus:ring-[#e3d6b3] text-gray-800"
                                    >
                                        <option value="title">By Title</option>
                                        <option value="author">By Author</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                        placeholder={`Search for books by ${searchType}...`}
                                        className="flex-1 px-6 py-4 text-lg bg-white bg-opacity-90 backdrop-blur-sm border-none focus:outline-none focus:ring-2 focus:ring-[#e3d6b3] placeholder-gray-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!searchQuery.trim()}
                                        className="px-8 py-4 bg-[#e3d6b3] hover:bg-[#d6c9a6] disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold rounded-r-lg transition duration-300"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {hasSearched ? (
                        <div className="mb-12">
                            <h2 className="text-3xl font-decorative text-white text-center mb-8">
                                {searchResults === null
                                    ? 'Searching...'
                                    : `Search Results (${searchResults.length} books found)`}
                            </h2>
                            {error && (
                                <p className="text-center text-red-300 text-lg font-serif mb-4">{error}</p>
                            )}
                            {searchResults !== null && renderBooks(searchResults)}
                        </div>
                    ) : (
                        <div className="mb-12">
                            <h2 className="text-3xl font-decorative text-white text-center mb-8">
                                All Books
                            </h2>
                            {error && (
                                <p className="text-center text-red-300 text-lg font-serif mb-4">{error}</p>
                            )}
                            {renderBooks(allBooks)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
