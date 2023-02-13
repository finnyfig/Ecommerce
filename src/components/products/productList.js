import React, { useState, useEffect, Fragment } from 'react';
import ProductService from '../../services/productService';
import Card from '../Card/card';
import { CardWrapper, CardContainer } from '../Card/cardStyles';
import { ContentBox, Box, ProductsWrapper, LoaderWrapper } from './styles';
import FilterCategory from '../FilterCategory/filterCategory';
import SortProducts from '../SortProducts/sortProducts';
import SearchProducts from '../SearchProducts/search';
import DeleteProductButton from '../DeleteProduct/deleteproduct';
import Loader from '../../assets/spinning-circles.svg';

export default function Products(props) {
    const [error, setError] = useState(null);
    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let isCancelled = false;

        //Load all the products from api and save in items
        ProductService.getallProducts()
            .then((res) => res.json())
            .then(
                (result) => {
                    if (!isCancelled) {
                        setItems(result.products);
                        setIsLoading(false);
                    }
                },
                (error) => {
                    setIsLoading(false);
                    setError('Something went wrong!');
                },
            );

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <ProductsWrapper>
            <ContentBox>
                <Box>
                    {/* Sorting products */}
                    <SortProducts setItems={setItems} items={items} />
                </Box>
                <Box>
                    {/* Searching  products with product description*/}
                    <SearchProducts setItems={setItems} setIsLoading={setIsLoading} />
                </Box>
                <Box>
                    {/* Filter based on category of products */}
                    <FilterCategory setItems={setItems} setIsLoading={setIsLoading} />
                </Box>
            </ContentBox>

            {isLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <>
                    {error && <div>{error}</div>}
                    {items ? (
                        <CardContainer>
                            {items.map((item, index) => (
                                <Fragment key={item.id}>
                                    <CardWrapper>
                                        {/* Display card layout for products  */}
                                        <Card products={item} />
                                        {/* Product is deleted from the list when this button is clicked */}
                                        <DeleteProductButton setItems={setItems} itemId={item.id} items={items} />
                                    </CardWrapper>
                                </Fragment>
                            ))}
                        </CardContainer>
                    ) : (
                        <p>No products found</p>
                    )}
                </>
            )}
        </ProductsWrapper>
    );
}
