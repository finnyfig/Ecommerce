import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';

const SearchProducts = ({ setItems, items }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchItems = (searchValue) => {
        console.log('searchValue', searchValue);
        setSearchInput(searchValue);

        ProductService.searchProduct(searchValue)
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoading(false);
                    if (searchInput !== '') {
                        const filteredData = data?.products.filter((item) => {
                            console.log('item', item);
                            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
                        });
                        setItems(filteredData);
                    } else {
                        console.log('all', data.products);
                        setItems(data.products);
                    }
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
    };

    return (
        <label htmlFor="search-form">
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
            />
        </label>
    );
};

export default SearchProducts;
