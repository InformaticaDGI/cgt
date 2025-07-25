import styled from "styled-components";

interface $FlexProps {
    $direction?: 'row' | 'column';
    $gap?: string;
    $align?: 'center' | 'start' | 'end' | 'stretch';
    $justify?: 'center' | 'start' | 'end' | 'stretch' | 'space-between';
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $backgroundColor?: string;
    $position?: 'absolute' | 'relative' | 'fixed';
    $top?: number | string;
    $left?: number | string;
    $right?: number | string;
    $bottom?: number | string;
    $zIndex?: number;
    $flex?: number;
}

export const Flex = styled.div<$FlexProps>`
    display: flex;
    flex-direction: ${({ $direction }) => $direction || 'column'};
    gap: ${({ $gap }) => $gap || '12px'};
    align-items: ${({ $align }) => $align || 'center'};
    justify-content: ${({ $justify }) => $justify || 'center'};
    width: ${({ $width }) => $width || '100%'};
    height: ${({ $height }) => $height || '100%'};
    padding: ${({ $padding }) => $padding || '0'};
    margin: ${({ $margin }) => $margin || '0'};
    background: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
    ${({ $position }) => $position && `position: ${$position};`}
    ${({ $top }) => $top && `top: ${$top};`}
    ${({ $left }) => $left && `left: ${$left};`}
    ${({ $right }) => $right && `right: ${$right};`}
    ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
    ${({ $zIndex }) => $zIndex !== undefined && `z-index: ${$zIndex};`}
    ${({ $flex }) => $flex !== undefined && `flex: ${$flex};`}
`;