import styled from "styled-components";

interface $BoxProps {
    $display?: 'flex' | 'block' | 'inline-block' | 'inline' | 'grid' | 'none';
    $align?: 'center' | 'start' | 'end' | 'stretch';
    $justify?: 'center' | 'start' | 'end' | 'stretch' | 'space-between';
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $backgroundColor?: string;
    $position?: 'absolute' | 'relative' | 'fixed';
    $top?: string;
    $left?: string;
    $right?: string;
    $bottom?: string;
    $zIndex?: number;
}

export const Box = styled.div<$BoxProps>`
    display: ${({ $display }) => $display || 'block'};
    align-items: ${({ $align }) => $align || 'center'};
    justify-content: ${({ $justify }) => $justify || 'center'};
    width: ${({ $width }) => $width || '100%'};
    height: ${({ $height }) => $height || '100%'};
    padding: ${({ $padding }) => $padding || '0'};
    margin: ${({ $margin }) => $margin || '0'};
    background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
    position: ${({ $position }) => $position || 'relative'};
    top: ${({ $top }) => $top || '0'};
    left: ${({ $left }) => $left || '0'};
    right: ${({ $right }) => $right || '0'};
    bottom: ${({ $bottom }) => $bottom || '0'};
    z-index: ${({ $zIndex }) => $zIndex || '0'};
`;