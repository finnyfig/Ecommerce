import React from 'react';
import PropTypes from 'prop-types';
import { CardTextWrapper, CardCategory, CardTextTitle, CardTextBody, CardSPrice, CardStock } from './cardStyles';

const Card = ({ products }) => {
    //destructing of props passed to function
    const { title, category, description, price, stock } = products;
    return (
        <>
            <CardTextWrapper>
                <CardTextTitle>{title}</CardTextTitle>
                <CardCategory>Category : {category}</CardCategory>
                <CardTextBody>{description}</CardTextBody>
                <CardSPrice>Price :{price}</CardSPrice>
                <CardStock>Stock : {stock}</CardStock>
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
