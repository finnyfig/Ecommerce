import React from 'react';
import {
    CardWrapper,
    CardTextWrapper,
    CardTextDate,
    CardTextTitle,
    CardTextBody,
    CardStatWrapper,
    CardStats,
    LinkText,
} from './cardStyles';

const Card = ({ products }) => {
    return (
        <>
            {console.log('products', products)}
            <CardTextWrapper>
                <CardTextTitle>{products.title}</CardTextTitle>
                <CardTextBody>{products.description}</CardTextBody>
            </CardTextWrapper>
            {/* <CardStatWrapper>
                <CardStats>
                    <LinkText href="#">website</LinkText>
                </CardStats>
                <CardStats>
                    <LinkText href="#">github</LinkText>
                </CardStats>
            </CardStatWrapper> */}
        </>
    );
};

export default Card;
