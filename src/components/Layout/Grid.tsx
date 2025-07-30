import styled from "styled-components";

interface $GridProps {
    $columns?: string;
    $rows?: string;
    $gap?: string;
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $backgroundColor?: string;
    $paddingX?: string;
    $paddingY?: string;
    $paddingTop?: string;
    $paddingBottom?: string;
    $paddingLeft?: string;
    $paddingRight?: string;
    children: React.ReactNode;
}

export const Grid = styled.div<$GridProps>`
    display: grid;
    grid-template-columns: ${({ $columns }) => $columns || 'repeat(3, 1fr)'};
    grid-template-rows: ${({ $rows }) => $rows || 'auto'};
    gap: ${({ $gap }) => $gap || '12px'};
    width: ${({ $width }) => $width || '100%'};
    height: ${({ $height }) => $height || '100%'};
    padding: ${({ $padding }) => $padding || '0'};
    margin: ${({ $margin }) => $margin || '0'};
    background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
    ${({ $paddingX }) => $paddingX && `padding-left: ${$paddingX}; padding-right: ${$paddingX};`}
    ${({ $paddingY }) => $paddingY && `padding-top: ${$paddingY}; padding-bottom: ${$paddingY};`}
    ${({ $paddingTop }) => $paddingTop && `padding-top: ${$paddingTop};`}
    ${({ $paddingBottom }) => $paddingBottom && `padding-bottom: ${$paddingBottom};`}
    ${({ $paddingLeft }) => $paddingLeft && `padding-left: ${$paddingLeft};`}
    ${({ $paddingRight }) => $paddingRight && `padding-right: ${$paddingRight};`}
`;

type $GridItemProps = {
    $column?: string;
    $row?: string;
    $colSpan?: number;
    $rowSpan?: number;
};

export const GridItem = styled.div<$GridItemProps>`
    grid-column: ${({ $column, $colSpan }) => $column ? $column : `span ${$colSpan || 1}`};
    grid-row: ${({ $row, $rowSpan }) => $row ? $row : `span ${$rowSpan || 1}`};
`;