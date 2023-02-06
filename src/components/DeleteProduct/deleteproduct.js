import React, { useEffect, useState } from 'react';
import ProductService from '../../services/productService';

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
    return <button onClick={() => handleDelete(itemId)}>Delete product</button>;
};

export default DeleteProductButton;