import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductService from '../../services/productService';
import Select from 'react-select';

export default function Products(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [q, setQ] = useState('');
    const [searchParam] = useState(['capital', 'name', 'numericCode']);
    const [filterParam, setFilterParam] = useState(['All']);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('');
    const [type, setSelectedType] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [category, setCategory] = useState(null);

    const productTypeData = [
        { value: 'title', label: 'Title' },
        { value: 'description', label: 'Description' },
        { value: 'price', label: 'Price' },
        { value: 'stock', label: 'Stock' },
    ];

    useEffect(() => {
        setIsLoading(true);
        ProductService.getallProducts()
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setItems(result.products);
                    console.log('api items', items);
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
        ProductService.getAllProductCategories()
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    let categoryArr = [];
                    result.map((category) => {
                        categoryArr.push({
                            value: category,
                            label: category,
                        });
                    });

                    console.log('categoryArr', categoryArr);
                    setCategoryOptions(categoryArr);
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
    }, []);

    const sortArray = (e) => {
        setSelectedType(e);
        //sorting
        const sortProperty = e.value;
        let sorted;
        if (sortProperty === 'title' || sortProperty == 'description') {
            sorted = [...items].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]));
            setItems(sorted);
        } else if (sortProperty === 'price' || sortProperty === 'stock') {
            sorted = [...items].sort((a, b) => a[sortProperty] - b[sortProperty]);
            setItems(sorted);
        } else {
            sorted = [...items].sort((a, b) => a - b);
            setItems(items);
        }
    };

    const filterByCategory = (e) => {
        console.log('CATEGORY', e, 'items', items);
        setCategory(e);
        ProductService.getProductsCategory(e.value)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setItems(result.products);
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
    };

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

    const handleDelete = (id) => {
        setIsLoading(true);
        console.log('id', id);
        ProductService.deleteProductById(id)
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    setIsLoading(false);
                    setItems(items.filter((items) => items.id !== data.id && data.isDeleted == true));
                } else {
                    setIsLoading(false);
                    setError('Product not found');
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    if (isLoading) {
        return <div>Loading..</div>;
    }
    //   if (error) {
    //     return <div>{error}</div>
    //   }

    return (
        <div className="wrapper">
            <div className="search-wrapper">
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
                    {console.log('category items', categoryOptions)}
                    {/* <select
                        value={category}
                        onChange={(e) => filterByCategory(e.target.value)}
                        placeholder="Select category"
                    >
                        {categoryOptions.map((option, i) => {
                            return (
                                <option value={option} key={i}>
                                    {option}
                                </option>
                            );
                        })}
                    </select> */}
                </label>
                <Select
                    placeholder="Filter by category"
                    value={category}
                    options={categoryOptions} // set list of the data
                    onChange={filterByCategory} // assign onChange function
                    isOptionDisabled={(option) => option.isdisabled} // disable an option
                />
                <Select
                    placeholder="Sort by"
                    value={type}
                    options={productTypeData} // set list of the data
                    onChange={sortArray} // assign onChange function
                    isOptionDisabled={(option) => option.isdisabled} // disable an option
                />
            </div>
            {error && <div>{error}</div>}
            {console.log('items', items)}
            {items ? (
                <ul className="card-grid">
                    {items.map((item, index) => (
                        <li key={index}>
                            <article className="card">
                                <div className="card-image">
                                    {/* <img
                                        src={item.flag.large}
                                        alt={item.name}
                                    /> */}
                                </div>
                                <div className="card-content">
                                    <h2 className="card-name"></h2>
                                    <ul className="card-list">
                                        <li>
                                            Title: <span>{item.title}</span>
                                        </li>
                                        <li>
                                            Description: <span>{item.description}</span>
                                        </li>
                                        <li>
                                            Category: <span>{item.category}</span>
                                        </li>
                                        <li>
                                            Price: <span>{item.price}</span>
                                        </li>
                                        <li>
                                            Stock: <span>{item.stock}</span>
                                        </li>
                                    </ul>
                                    <button onClick={() => handleDelete(item.id)}>Delete product</button>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
}
