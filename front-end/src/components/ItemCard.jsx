import React from 'react';

const ItemCard = ({ image, title, price, created_at, onView }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col h-full">

            {/* --- Product Image Section --- */}
            <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                <img
                    src={image || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* --- Product Details Section --- */}
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-medium text-base truncate mb-1">
                    {title}
                </h3>
                {/*Resolved issue 5 by updating the database to include creation date and display creation data in item card.*/}
                <h4 className="text-white font-medium text-base truncate mb-1">
                    Created at {new Date(created_at).toLocaleDateString()}
                </h4>

                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-lg font-bold text-white">
                        ${price}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(); // Triggers the modal in App.jsx
                        }}
                        className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors border border-slate-600 active:scale-95"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;