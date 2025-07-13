import styled, { css } from "styled-components";

export const $Button = styled.button<$ButtonProps>`
    background: ${({ $variant }) => $variant === "primary" ? "var(--gradient-primary)" : $variant === "secondary" ? "var(--gradient-secondary)" : "var(--gradient-tertiary)"};
    color: ${({ $variant }) => $variant === "primary" ? "var(--text_foreground)" : $variant === "secondary" ? "var(--text_foreground)" : "var(--text_foreground)"};
    padding: 12px 24px;
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
    font-size: var(--input-font-size);
    font-weight: 600;
    transition: all 0.3s ease;
    &:hover {
        filter: brightness(0.8);
        scale: 1.01;
    }
    &:disabled {
        filter: brightness(0.5);
        cursor: not-allowed;
    }
    &:active {
        filter: brightness(1);
        scale: 0.99;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        filter: brightness(0.9);
    }
    ${({ $disabled }) => $disabled && css`
        filter: brightness(0.5);
        cursor: not-allowed;
    `}
`

type $ButtonProps = {
    htmlType?: "button" | "submit" | "reset"
    $variant?: "primary" | "secondary" | "tertiary"
    $disabled?: boolean
}