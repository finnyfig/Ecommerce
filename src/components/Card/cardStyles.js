import styled from 'styled-components';

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 50px;
    margin-top: 3rem;
`;
export const CardWrapper = styled.div`
    border-radius: 18px;
    background: #fff;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
    text-align: center;
`;

export const CardTextWrapper = styled.div`
    grid-area: auto;
    margin: 25px;
`;

export const CardCategory = styled.h2`
    color: #000;
    font-size: 16px;
`;

export const CardTextTitle = styled.h2`
    margin-top: 0px;
    font-size: 1rem;
    box-sizing: border-box;
    min-width: 0px;
    line-height: 1.2;
    margin: 0px;
    background: #000;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;

export const CardTextBody = styled.p`
    color: grey;
    font-size: 15px;
    font-weight: 300;
    height: 11vh;
`;

export const CardSPrice = styled.h2`
    margin-top: 0px;
    font-size: 1rem;
`;

export const CardStock = styled.div`
    margin-top: 0px;
    font-size: 1rem;
`;
