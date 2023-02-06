import styled from 'styled-components';

export const DeleteButton = styled.button`
    cursor: pointer;
    min-height: 38px;
    outline: 0 !important;
    position: relative;
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    -webkit-box-pack: justify;
    width: 100%;
    width: 200px;
    margin: auto;
    background: #d30000;
    color: white;
    margin-bottom: 1rem;
    &:hover {
        background-color: #a90000;
    }
`;
