import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';
import { DeleteButton } from './deleteStyles';

const DeleteProductButton = ({ setItems, items, itemId }) => {
    const [isLoading, setIsLoading] = useState(false);

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
