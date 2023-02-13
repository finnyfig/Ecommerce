import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import { SearchInput } from './searchStyles';

const SearchProducts = ({ setItems, items }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState(searchInput);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(searchInput), 300);
        return () => clearTimeout(timer);
    }, [searchInput, 300]);

    useEffect(() => {
        ProductService.searchProduct(searchInput)
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoading(false);
                    if (searchInput !== '') {
                        const filteredData = data?.products.filter((item) => {
                            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
                        });
                        setItems(filteredData);
                    } else {
                        setItems(data.products);
                    }
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
    }, [debouncedValue]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    return (
        <>
            <label htmlFor="search-form">Search Products</label>
            <div>
                <SearchInput
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for products..."
                    value={searchInput}
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
        </>
    );
};

export default SearchProducts;
