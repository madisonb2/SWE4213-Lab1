import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import CreateListingModal from './CreateListingModal'; // Import your component
import { Select, MenuItem } from '@mui/material';

const Listings = ({ onSelectItem, myListings, search }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const endpoint = myListings
                ? 'http://localhost:3000/products/mylistings'
                : 'http://localhost:3000/products';

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();
            const finalData = myListings ? data : data.sort(() => Math.random() - 0.5);
            setProducts(finalData);
        } catch (err) {
            // Do nothing 
        } finally {
            setLoading(false);
        }
    };

    //Resolved issue 3 by adding a drop down to sort based on conditions
    const sortListings = (sortCondition) => {
        switch (sortCondition) {
            case "priceAscending":
                sortedProducts = products.sort((a, b) => a.price - b.price);
                setProducts(sortedProducts);
                break;
            case "priceDescending":
                sortedProducts = products.sort((a, b) => b.price - a.price);
                setProducts(sortedProducts);
                break;
            case "dateAscending":
                sortedProducts = products.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setProducts(sortedProducts);
                break;
            case "dateDescending":
                sortedProducts = products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setProducts(sortedProducts);
                break;
            default:
                break;
        }
    };

    //Resolved issue 4 by filtering products based on what is typed in the search bar.
    const searchItems = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    )

    //Resolved issue 2 by adding button in My Listings page that allows you to delete your listings.
    const deleteItem = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const endpoint = `http://localhost:3000/products/${id}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            await fetchProducts();
        }
        catch (err) {

        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [myListings]);

    if (loading) return <div className="text-slate-400 text-center py-20 italic">Loading...</div>;

    return (
        <>
            <div className="flex-1 flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">
                    {myListings ? "My Listings" : "Browse Listings"}
                </h1>
            </div>

            <div className = "flex-1 flex justify-end" >
                <Select 
                    value = {sortBy}
                    displayEmpty
                    className = "w-50 bg-slate-800"
                    sx = {{color: 'white', '& .MuiSelect-icon': {color: 'white' }}}
                >
                    <MenuItem value = "" disabled>Sort By...</MenuItem>
                    <MenuItem 
                        value = {'priceAscending'}
                        onClick = {() => {
                            setSortBy('priceAscending');
                            sortListings('priceAscending');
                        }}> 
                        Price (Ascending) 
                    </MenuItem>
                    <MenuItem 
                        value = {'priceDescending'}
                        onClick = {() => {
                            setSortBy('priceDescending');
                            sortListings('priceDescending');
                        }}> 
                        Price (Descending) 
                    </MenuItem>
                    <MenuItem 
                        value = {'dateAscending'}
                        onClick = {() => {
                            setSortBy('dateAscending');
                            sortListings('dateAscending');
                        }}> 
                        Date (Ascending) 
                    </MenuItem>
                    <MenuItem 
                        value = {'dateDescending'}
                        onClick = {() => {
                        setSortBy('dateDescending');
                        sortListings('dateDescending');
                        }}> 
                        Date (Descending) 
                    </MenuItem>
                </Select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                {searchItems.map((product) => (
                    <ItemCard
                        key={product.id}
                        image={product.image_url || `https://picsum.photos/seed/${product.id}/400/400`}
                        title={product.title}
                        price={product.price}
                        created_at = {product.created_at}
                        onView={() => onSelectItem(product)}
                        myListings = {myListings}
                        deleteItem = {() => deleteItem(product.id)}
                    />
                ))}

                {myListings && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-4 hover:border-blue-500 hover:bg-slate-800/50 transition-all group min-h-[250px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                            <span className="text-2xl text-slate-400 group-hover:text-white">+</span>
                        </div>
                        <span className="text-slate-400 font-medium group-hover:text-white">Create Listing</span>
                    </button>
                )}
            </div>

            <CreateListingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchProducts} // Re-fetches the list after a successful post
            />
        </>
    );
};

export default Listings;