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