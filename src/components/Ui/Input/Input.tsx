import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    height: 40px;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary);
    padding: 0 12px;
    font-size: var(--input-font-size);
    font-weight: 400;
    color: var(--text-secondary);
    background-color: var(--input-background);
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: var(--primary);
        background-color: var(--input-background-focus);
    }
`