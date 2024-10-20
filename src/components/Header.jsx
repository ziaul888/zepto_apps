import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useDebounce from "../hook/useDebounce";
import { MdFilterList } from "react-icons/md";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const navigate = useNavigate();
    const location = useLocation();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const genres = ["All", "Fiction", "Non-Fiction", "Science", "Fantasy", "Biography"];

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (debouncedSearchTerm) {
            queryParams.set("search", debouncedSearchTerm);
        }
        if (selectedGenre !== "All") {
            queryParams.set("genre", selectedGenre);
        }
        navigate({ search: queryParams.toString() }, { replace: true });
    }, [debouncedSearchTerm, selectedGenre, navigate]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedGenre(option);
        setDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 bg-gray-100 z-50 ">
            <nav className=" w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6">
                    <Link to="/" className="text-gray-900 hover:text-gray-700 text-xl sm:text-2xl font-bold">
                        Gutendex
                    </Link>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link to="/wishlist" className="text-gray-800 hover:text-gray-800">
                            Wishlist
                        </Link>

                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-gray-800 hover:text-gray-800 focus:outline-none"
                            >
                                <MdFilterList className="text-[20px] mr-2" />
                                Filter
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10 w-[200px] sm:w-[250px]">
                                    <ul className="py-2">
                                        {genres.map((genre) => (
                                            <li 
                                                key={genre}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleOptionClick(genre)}
                                            >
                                                {genre}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {location.pathname === "/" && (
                    <div className="w-full sm:w-auto mt-3 sm:mt-0">
                        <input
                            type="text"
                            placeholder="Search book here..."
                            className="border border-gray-300 rounded-lg p-2 w-full sm:w-[400px] text-gray-950 placeholder-gray-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
