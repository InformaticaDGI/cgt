import styled, { css } from "styled-components";

export const Button = styled.button<ButtonProps>`
    background: ${({ $variant }) =>
        $variant === "primary"
            ? "var(--gradient-primary)"
            : $variant === "secondary"
            ? "var(--gradient-secondary)"
            : $variant === "tertiary"
            ? "var(--gradient-tertiary)"
            : "var(--gradient-primary)"};
    ${({ $backgroundColor }) => $backgroundColor && css`
        background: ${$backgroundColor};
    `}
    color: ${({ $variant }) =>
        $variant === "primary" || $variant === "secondary" || $variant === "tertiary"
            ? "var(--text_foreground)"
            : "var(--text_foreground)"};
    padding: ${({ $size }) =>
        $size === "small"
            ? "8px 16px"
            : $size === "medium"
            ? "12px 24px"
            : $size === "large"
            ? "16px 32px"
            : $size === "xsmall"
            ? "10px 12px"
            : "12px 24px"};
    height: ${({ $size }) =>
        $size === "small"
            ? "32px"
            : $size === "medium"
            ? "40px"
            : $size === "large"
            ? "48px"
            : $size === "xsmall"
            ? "24px"
            : "40px"};
    border-radius: var(--border-radius);
    border: none;
    cursor: pointer;
    font-size: ${({ $size }) =>
        $size === "small"
            ? "var(--input-font-size-xsmall)"
            : $size === "medium"
            ? "var(--input-font-size-small)"
            : $size === "large"
            ? "var(--input-font-size-large)"
            : $size === "xsmall"
            ? "var(--input-font-size-xsmall)"
            : "var(--input-font-size-small)"};
    font-weight: 600;
    transition: all 0.3s ease;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 8px;
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
    ${({ $disabled }) =>
        $disabled &&
        css`
            filter: brightness(0.5);
            cursor: not-allowed;
        `}
`

type ButtonProps = {
    $htmlType?: "button" | "submit" | "reset"
    $variant?: "primary" | "secondary" | "tertiary"
    $disabled?: boolean
    $size?: "small" | "medium" | "large" | "xsmall"
    $backgroundColor?: string
}