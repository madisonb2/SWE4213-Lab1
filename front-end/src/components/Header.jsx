import React, { useState } from 'react';

const Header = ({ onLogout, setMyListings, search, setSearch }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="w-full bg-slate-900 text-gray-300 border-b border-slate-800 sticky top-0 z-50">
            <div className="w-full px-[20px] sm:px-[50px] py-4 flex items-center justify-between">

                <div className="flex-1 flex items-center">
                    <nav className="hidden lg:flex space-x-8 text-sm font-medium">
                        <button className="hover:text-white transition-colors" onClick={() => setMyListings(false)}>Browse</button>
                        <button className="hover:text-white transition-colors" onClick={() => setMyListings(true)}>My Listings</button>
                    </nav>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            value = {search}
                            onChange = {(e) => setSearch(e.target.value)}
                            placeholder="Search items..."
                            className="w-full bg-slate-800 border border-slate-700 focus:border-red-700 rounded-lg py-2 px-4 pl-10 text-sm text-white focus:outline-none transition-all"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center focus:outline-none group"
                        >
                            <div className="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-red-700 transition-all">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="User Avatar"
                                />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-150">
                                <div className="lg:hidden border-b border-slate-700 mb-2 pb-2">
                                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700">Browse</button>
                                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700">My Listings</button>
                                </div>

                                <button
                                    onClick={onLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-400 font-medium hover:bg-slate-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;