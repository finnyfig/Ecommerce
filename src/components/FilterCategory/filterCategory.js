import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import Select from 'react-select';

const FilterCategory = ({ setItems }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        ProductService.getAllProductCategories()
            .then((res) => res.json())
            .then(
                (filter) => {
                    let categoryArr = [];
                    console.log('filter', filter);
                    filter?.map((category, index) => {
                        categoryArr.push({
                            value: category,
                            label: category,
                        });
                    });
                    setIsLoading(false);
                    console.log('categoryArr', categoryArr);
                    setCategoryOptions(categoryArr);
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );
    }, []);

    const filterByCategory = (e) => {
        console.log('CATEGORY', e);
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
    return (
        <>
            <form data-testid="filter-id">
                <label htmlFor="filterCategory">Filter category</label>
                <Select
                    inputId="filterCategory"
                    name="filterCategory"
                    value={category}
                    options={categoryOptions} // set list of the data
                    onChange={filterByCategory} // assign onChange function
                    isOptionDisabled={(option) => option.isdisabled} // disable an option
                />
            </form>
        </>
    );
};

export default FilterCategory;
