import styled from "styled-components";

// Breakpoint definitions
const breakpoints = {
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1440px'
};

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
    $justify?: string;
    // Responsive properties
    $columnsXs?: string;
    $columnsSm?: string;
    $columnsMd?: string;
    $columnsLg?: string;
    $columnsXl?: string;
    $rowsXs?: string;
    $rowsSm?: string;
    $rowsMd?: string;
    $rowsLg?: string;
    $rowsXl?: string;
    $gapXs?: string;
    $gapSm?: string;
    $gapMd?: string;
    $gapLg?: string;
    $gapXl?: string;
    $justifyXs?: string;
    $justifySm?: string;
    $justifyMd?: string;
    $justifyLg?: string;
    $justifyXl?: string;
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
    ${({ $justify }) => $justify && `justify-content: ${$justify};`}

    /* Responsive breakpoints */
    @media (max-width: ${breakpoints.xs}) {
        ${({ $columnsXs }) => $columnsXs && `grid-template-columns: ${$columnsXs};`}
        ${({ $rowsXs }) => $rowsXs && `grid-template-rows: ${$rowsXs};`}
        ${({ $gapXs }) => $gapXs && `gap: ${$gapXs};`}
        ${({ $justifyXs }) => $justifyXs && `justify-content: ${$justifyXs};`}
    }

    @media (min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.sm}) {
        ${({ $columnsSm }) => $columnsSm && `grid-template-columns: ${$columnsSm};`}
        ${({ $rowsSm }) => $rowsSm && `grid-template-rows: ${$rowsSm};`}
        ${({ $gapSm }) => $gapSm && `gap: ${$gapSm};`}
        ${({ $justifySm }) => $justifySm && `justify-content: ${$justifySm};`}
    }

    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md}) {
        ${({ $columnsMd }) => $columnsMd && `grid-template-columns: ${$columnsMd};`}
        ${({ $rowsMd }) => $rowsMd && `grid-template-rows: ${$rowsMd};`}
        ${({ $gapMd }) => $gapMd && `gap: ${$gapMd};`}
        ${({ $justifyMd }) => $justifyMd && `justify-content: ${$justifyMd};`}
    }

    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
        ${({ $columnsLg }) => $columnsLg && `grid-template-columns: ${$columnsLg};`}
        ${({ $rowsLg }) => $rowsLg && `grid-template-rows: ${$rowsLg};`}
        ${({ $gapLg }) => $gapLg && `gap: ${$gapLg};`}
        ${({ $justifyLg }) => $justifyLg && `justify-content: ${$justifyLg};`}
    }

    @media (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
        ${({ $columnsXl }) => $columnsXl && `grid-template-columns: ${$columnsXl};`}
        ${({ $rowsXl }) => $rowsXl && `grid-template-rows: ${$rowsXl};`}
        ${({ $gapXl }) => $gapXl && `gap: ${$gapXl};`}
        ${({ $justifyXl }) => $justifyXl && `justify-content: ${$justifyXl};`}
    }

    @media (min-width: ${breakpoints.xl}) {
        ${({ $columnsXl }) => $columnsXl && `grid-template-columns: ${$columnsXl};`}
        ${({ $rowsXl }) => $rowsXl && `grid-template-rows: ${$rowsXl};`}
        ${({ $gapXl }) => $gapXl && `gap: ${$gapXl};`}
        ${({ $justifyXl }) => $justifyXl && `justify-content: ${$justifyXl};`}
    }
`;

type $GridItemProps = {
    $column?: string;
    $row?: string;
    $colSpan?: number;
    $rowSpan?: number;
    // Responsive properties for GridItem
    $colSpanXs?: number;
    $colSpanSm?: number;
    $colSpanMd?: number;
    $colSpanLg?: number;
    $colSpanXl?: number;
    $rowSpanXs?: number;
    $rowSpanSm?: number;
    $rowSpanMd?: number;
    $rowSpanLg?: number;
    $rowSpanXl?: number;
};

export const GridItem = styled.div<$GridItemProps>`
    grid-column: ${({ $column, $colSpan }) => $column ? $column : `span ${$colSpan || 1}`};
    grid-row: ${({ $row, $rowSpan }) => $row ? $row : `span ${$rowSpan || 1}`};

    /* Responsive breakpoints for GridItem */
    @media (max-width: ${breakpoints.xs}) {
        ${({ $colSpanXs }) => $colSpanXs && `grid-column: span ${$colSpanXs};`}
        ${({ $rowSpanXs }) => $rowSpanXs && `grid-row: span ${$rowSpanXs};`}
    }

    @media (min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.sm}) {
        ${({ $colSpanSm }) => $colSpanSm && `grid-column: span ${$colSpanSm};`}
        ${({ $rowSpanSm }) => $rowSpanSm && `grid-row: span ${$rowSpanSm};`}
    }

    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md}) {
        ${({ $colSpanMd }) => $colSpanMd && `grid-column: span ${$colSpanMd};`}
        ${({ $rowSpanMd }) => $rowSpanMd && `grid-row: span ${$rowSpanMd};`}
    }

    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
        ${({ $colSpanLg }) => $colSpanLg && `grid-column: span ${$colSpanLg};`}
        ${({ $rowSpanLg }) => $rowSpanLg && `grid-row: span ${$rowSpanLg};`}
    }

    @media (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
        ${({ $colSpanXl }) => $colSpanXl && `grid-column: span ${$colSpanXl};`}
        ${({ $rowSpanXl }) => $rowSpanXl && `grid-row: span ${$rowSpanXl};`}
    }

    @media (min-width: ${breakpoints.xl}) {
        ${({ $colSpanXl }) => $colSpanXl && `grid-column: span ${$colSpanXl};`}
        ${({ $rowSpanXl }) => $rowSpanXl && `grid-row: span ${$rowSpanXl};`}
    }
`;