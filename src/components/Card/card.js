import React from 'react';
import { CardTextWrapper, CardCategory, CardTextTitle, CardTextBody, CardSPrice, CardStock } from './cardStyles';

const Card = ({ products }) => {
    return (
        <>
            <CardTextWrapper>
                <CardTextTitle>{products.title}</CardTextTitle>
                <CardCategory>Category : {products.category}</CardCategory>
                <CardTextBody>{products.description}</CardTextBody>
                <CardSPrice>Price :{products.price}</CardSPrice>
                <CardStock>Stock : {products.stock}</CardStock>
            </CardTextWrapper>
        </>
    );
};

export default Card;
