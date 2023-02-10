import styled from 'styled-components';

export const ContentBox = styled.div`
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    align-items: center;
    grid-area: content;
    justify-content: center;
`;
export const Box = styled.div`
    padding: 0.25rem;
    width: 100%;
    height: 100%;
`;

export const ProductsWrapper = styled.div`
    margin: 2rem 5rem 2rem;
`;

export const LoaderWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform: -webkit-translate(-50%, -50%);
    transform: -moz-translate(-50%, -50%);
    transform: -ms-translate(-50%, -50%);
`;
