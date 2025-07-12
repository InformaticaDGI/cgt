import styled from "styled-components";

export const TextArea = styled.textarea<TextAreaProps>`
    width: 100%;
    height: ${({ rows }) => rows ? `${rows * 20}px` : '120px'};
    border-radius: var(--border-radius);
    border: 1px solid var(--primary);
    padding: 12px;
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

type TextAreaProps = {
    rows?: number
}