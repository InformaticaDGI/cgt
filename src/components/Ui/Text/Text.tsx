import styled from "styled-components";

const Text = ({ children, variant = "normal", $fontSize, $fontWeight, $color, ...props }: { children: React.ReactNode, variant?: "title" | "normal", $fontSize?: string, $fontWeight?: string, $color?: string } & React.ComponentPropsWithoutRef<'p'>) => {
    return <StyledText $variant={variant} $fontSize={$fontSize} $fontWeight={$fontWeight} $color={$color} {...props}>{children}</StyledText>
}

export default Text


const StyledText = styled.p<{ $variant?: "title" | "normal", $fontSize?: string, $fontWeight?: string, $color?: string }>`
    color: ${props => props.$variant === 'title' ? "#A0AEC0" : props.$color || "#2D3748"};
    font-size: ${props => props.$fontSize || "20px"};
    font-weight: ${props => props.$fontWeight || "600"};
    font-family: 'Inter', sans-serif;
`;