import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import styled from 'styled-components';

const SearchProducts = ({ setItems, items }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const SearchInput = styled.input`
        justify-content: space-between;
        min-height: 38px;
        outline: 0 !important;
        position: relative;
        border-color: hsl(0, 0%, 80%);
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        width: 100%;
    `;

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
