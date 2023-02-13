import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import { SearchInput } from './searchStyles';
import Loader from '../../assets/spinning-circles.svg';
import { LoaderWrapper } from '../products/styles';

const SearchProducts = ({ setItems, items, setIsLoading }) => {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedValue, setDebouncedValue] = useState(searchInput);

    useEffect(() => {
        //the clearTimeout will clear the timer at the end of delay if the searchInput keeps changing
        // setDebouncedValue value will be set when  there is no change
        const timer = setTimeout(() => setDebouncedValue(searchInput), 300);
        console.log('search debounce');
        return () => clearTimeout(timer);
    }, [searchInput, 300]);

    useEffect(() => {
        console.log('search searchInput');
        if (debouncedValue) {
            setIsLoading(true);
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
        }
    }, [debouncedValue]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    // if (isLoading) {
    //     return (
    //         <LoaderWrapper>
    //             <Loader />
    //         </LoaderWrapper>
    //     );
    // }
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
                    //onBlur={() => setSearchInput('')}
                />
            </div>
        </>
    );
};

export default SearchProducts;
