import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import styled from 'styled-components';

const DeleteProductButton = ({ setItems, items, itemId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const DeleteButton = styled.button`
        cursor: pointer;
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
        align-items: center;
        justify-content: center;
        -webkit-box-pack: justify;
        width: 100%;
        width: 200px;
        margin: auto;
        background: #d30000;
        color: white;
        margin-bottom: 1rem;
        &:hover {
            background-color: #a90000;
        }
    `;

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
    return <DeleteButton onClick={() => handleDelete(itemId)}>Delete product</DeleteButton>;
};

export default DeleteProductButton;
