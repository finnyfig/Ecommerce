import React from 'react';
import PropTypes from 'prop-types';
import {
    CardTextWrapper,
    CardCategory,
    CardTextTitle,
    CardTextBody,
    CardSPrice,
    CardStock,
    CardProductImage,
} from './cardStyles';
import { ContentBox, Box, ProductsWrapper } from '../products/styles';
import LazyLoad from 'react-lazy-load';

const Card = ({ products }) => {
    //destructing of props passed to function
    const { title, category, description, price, stock, images } = products;
    return (
        <>
            <CardTextWrapper>
                <LazyLoad>
                    <CardProductImage src={images[0]}></CardProductImage>
                </LazyLoad>
                <CardTextTitle>{title}</CardTextTitle>
                <CardCategory>Category : {category}</CardCategory>
                <CardTextBody>{description}</CardTextBody>
                <ContentBox>
                    <Box>
                        {' '}
                        <CardSPrice>Price : {price}</CardSPrice>
                    </Box>
                    <Box>
                        {' '}
                        <CardStock>Stock : {stock}</CardStock>
                    </Box>
                </ContentBox>
            </CardTextWrapper>
        </>
    );
};
Card.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
};
export default Card;
