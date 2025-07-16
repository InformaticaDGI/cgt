import styled from "styled-components";

const Text = ({ children, variant = "normal", ...props }: { children: React.ReactNode, variant?: "title" | "normal"  } & React.ComponentPropsWithoutRef<'p'>) => {
    return <StyledText $variant={variant} {...props}>{children}</StyledText>
}

export default Text


const StyledText = styled.p<{ $variant?: "title" | "normal" }>`
    color: ${props => props.$variant === 'title' ? "#A0AEC0" : "#2D3748"};
    font-size: 20px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
`;