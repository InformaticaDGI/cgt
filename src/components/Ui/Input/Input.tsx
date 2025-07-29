import styled, { css } from "styled-components";

export const Input = styled.input<InputProps>`
    width: 100%;
    height: ${({ $size }) => $size === "small" ? "32px" : $size === "medium" ? "40px" : "48px"};
    border-radius: var(--border-radius);
    border: 1px solid var(--primary);
    padding: ${({ $size }) => $size === "small" ? "0 8px" : $size === "medium" ? "0 12px" : "0 16px"};
    font-size: ${({ $size }) => $size === "small" ? "var(--input-font-size-xsmall)" : $size === "medium" ? "var(--input-font-size-small)" : "var(--input-font-size-medium)"};
    font-weight: 400;
    color: var(--text-secondary);
    background-color: var(--input-background);
    outline: none;
    transition: border-color 0.2s;

    

    &:focus {
        border-color: var(--primary);
        background-color: var(--input-background-focus);
    }

    &[type="date"] {
        color: var(--text-secondary);
    }

    &[type="checkbox"] {
        width: ${({ $size }) => $size === "small" ? "16px" : $size === "medium" ? "20px" : "24px"};
        height: ${({ $size }) => $size === "small" ? "16px" : $size === "medium" ? "20px" : "24px"};
        border-radius: 4px;
        border: 1px solid var(--primary);
        background-color: var(--input-background);
        cursor: pointer;
        &:checked {
            accent-color: var(--primary);
            background-color: var(--primary);
            border-color: var(--primary);
        }
        &:focus {
            accent-color: var(--primary);
            border-color: var(--primary);
            background-color: var(--input-background-focus);
        }
        &:disabled {
            accent-color: var(--primary);
            background-color: var(--input-background-disabled);
            cursor: not-allowed;
        }
    }



    ${({ disabled }) => disabled && css`
        background-color: var(--input-background-disabled);
        cursor: not-allowed;
        opacity: 0.6;
        border: 1px solid black;
    `}
`

type InputProps = {
    $size?: "small" | "medium" | "large"
    $disabled?: boolean
}