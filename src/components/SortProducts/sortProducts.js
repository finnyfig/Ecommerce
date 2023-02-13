import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const FilterCategory = ({ setItems, items }) => {
    const [type, setSelectedType] = useState(null);

    const productTypeData = [
        { value: 'title', label: 'Title' },
        { value: 'description', label: 'Description' },
        { value: 'price', label: 'Price' },
        { value: 'stock', label: 'Stock' },
    ];

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

    return (
        <>
            <label htmlFor="sortBy">Sort By</label>
            <Select
                inputId="sortBy"
                value={type}
                options={productTypeData} // set list of the data
                onChange={sortArray} // assign onChange function
                isOptionDisabled={(option) => option.isdisabled} // disable an option
                //onBlur={() => setSelectedType(null)}
            />
        </>
    );
};

export default FilterCategory;
