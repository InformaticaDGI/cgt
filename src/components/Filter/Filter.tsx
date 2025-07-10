import styled from "styled-components";

export const Filter = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #ffffff;
    padding: 12px;
    border: 1px solid #98F4E3;
    border-radius: 12px;
    

    &:hover {
        border-color: #66CDAA;
        box-shadow: 0px 2px 16px rgba(102, 205, 170, 0.25);
    }
`;