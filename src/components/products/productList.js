import React, { useState, useEffect, Fragment } from 'react';
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
        //Load all the products from api and save in items
        ProductService.getallProducts()
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
    }, []);

    if (isLoading) {
        return <div>Loading..</div>;
    }
    return (
        <ProductsWrapper>
            <ContentBox>
                <Box>
                    {/* Sorting products */}
                    <SortProducts setItems={setItems} items={items} />
                </Box>
                <Box>
                    {/* Searching  products with product description*/}
                    <SearchProducts setItems={setItems} />
                </Box>
                <Box>
                    {/* Filter based on category of products */}
                    <FilterCategory setItems={setItems} />
                </Box>
            </ContentBox>

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
        </ProductsWrapper>
    );
}
