import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import ProductService from '../../services/productService';
import Card from '../Card/card';
import { CardWrapper, CardContainer } from '../Card/cardStyles';
import { ContentBox, Box, ProductsWrapper } from './styles';
import FilterCategory from '../FilterCategory/filterCategory';
import SortProducts from '../SortProducts/sortProducts';
import SearchProducts from '../SearchProducts/search';
import DeleteProductButton from '../DeleteProduct/deleteproduct';

export default function Products(props) {
    const [error, setError] = useState(null);
    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
    }, []);

    if (isLoading) {
        return <div>Loading..</div>;
    }
    return (
        <ProductsWrapper>
            <ContentBox>
                <Box>
                    <SortProducts setItems={setItems} items={items} />
                </Box>
                <Box>
                    <SearchProducts setItems={setItems} />
                </Box>
                <Box>
                    <FilterCategory setItems={setItems} />
                </Box>
            </ContentBox>

            {error && <div>{error}</div>}
            {items ? (
                <CardContainer>
                    {items.map((item, index) => (
                        <Fragment key={item.id}>
                            <CardWrapper>
                                <Card products={item} />
                                <DeleteProductButton setItems={setItems} itemId={item.id} items={items} />
                            </CardWrapper>
                        </Fragment>
                    ))}
                </CardContainer>
            ) : (
                <p>No products found</p>
            )}
        </ProductsWrapper>
    );
}
