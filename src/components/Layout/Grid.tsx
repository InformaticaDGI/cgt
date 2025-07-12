import styled from "styled-components";

interface GridProps {
    columns?: string;
    rows?: string;
    gap?: string;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    children: React.ReactNode;
}

export const Grid = styled.div<GridProps>`
    display: grid;
    grid-template-columns: ${({ columns }) => columns || 'repeat(3, 1fr)'};
    grid-template-rows: ${({ rows }) => rows || 'auto'};
    gap: ${({ gap }) => gap || '12px'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    padding: ${({ padding }) => padding || '0'};
    margin: ${({ margin }) => margin || '0'};
    background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
`;

export const GridItem = styled.div<GridItemProps>`
    grid-column: ${({ column, colSpan }) => column ? column : `span ${colSpan || 1}`};
    grid-row: ${({ row, rowSpan }) => row ? row : `span ${rowSpan || 1}`};
`;

type GridItemProps = {
    column?: string;
    row?: string;
    colSpan?: number;
    rowSpan?: number;
};