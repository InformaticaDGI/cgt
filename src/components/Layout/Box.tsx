import styled from "styled-components";

interface $BoxProps {
    $display?: 'flex' | 'block' | 'inline-block' | 'inline' | 'grid' | 'none';
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $backgroundColor?: string;
}

export const Box = styled.div<$BoxProps>`
    display: ${({ $display }) => $display || 'block'};
    width: ${({ $width }) => $width || '100%'};
    height: ${({ $height }) => $height || '100%'};
    padding: ${({ $padding }) => $padding || '0'};
    margin: ${({ $margin }) => $margin || '0'};
    background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
`;