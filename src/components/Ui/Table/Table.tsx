import styled from "styled-components"

// Helper functions to safely access header properties
const getHeaderKey = (header: HeaderConfig, index: number): string => {
    if (typeof header === 'string') return header
    return header.key || header.label || index.toString()
}

const getHeaderLabel = (header: HeaderConfig): string => {
    if (typeof header === 'string') return header
    return header.label || header.key || ''
}

const getHeaderWidth = (header: HeaderConfig, index: number, columnWidths?: (string | number)[]): string | number | undefined => {
    if (typeof header === 'string') {
        return columnWidths?.[index]
    }
    return header.width || columnWidths?.[index]
}

const getHeaderColSpan = (header: HeaderConfig): number => {
    if (typeof header === 'string') return 1
    return header.colSpan || 1
}

export const Table = ({ 
    columns, 
    data, 
    columnWidths,
    rowKey,
    cellKey,
    onRowClick,
    size = "normal"
}: TableProps) => {
    return (
        <TableContainer>
            <TableHeader $size={size}>
                {columns.map((header, index) => {
                    const headerKey = getHeaderKey(header, index)
                    const headerWidth = getHeaderWidth(header, index, columnWidths)
                    const colSpan = getHeaderColSpan(header)
                    
                    return (
                        <TableHeaderCell 
                            key={headerKey} 
                            $size={size}
                            align={header.align}
                            $colSpan={colSpan}
                            style={{ 
                                flex: headerWidth ? 'none' : colSpan,
                                width: headerWidth || 'auto',
                                minWidth: headerWidth || 'auto'
                            }}
                        >
                            {getHeaderLabel(header)}
                        </TableHeaderCell>
                    )
                })}
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => {
                    const rowKeyValue = rowKey ? rowKey(row, rowIndex) : rowIndex
                    return (
                        <TableBodyRow 
                            key={rowKeyValue}
                            onClick={() => onRowClick?.(row, rowIndex)}
                            $clickable={!!onRowClick}
                            $size={size}
                        >
                            {columns.map((header, colIndex) => {
                                const headerKey = getHeaderKey(header, colIndex)
                                const cellKeyValue = cellKey ? cellKey(row, headerKey, rowIndex, colIndex) : `${rowKeyValue}-${headerKey}`
                                const headerWidth = getHeaderWidth(header, colIndex, columnWidths)
                                const colSpan = getHeaderColSpan(header)
                                
                                // Render the cell based on header configuration
                                const cellContent = renderCellContent(row, header, rowIndex, colIndex)
                                
                                return (
                                    <TableBodyCell 
                                        key={cellKeyValue}
                                        $size={size}
                                        align={header.align}
                                        $colSpan={colSpan}
                                        style={{ 
                                            flex: headerWidth ? 'none' : colSpan,
                                            width: headerWidth || 'auto',
                                            minWidth: headerWidth || 'auto'
                                        }}
                                    >
                                        {cellContent}
                                    </TableBodyCell>
                                )
                            })}
                        </TableBodyRow>
                    )
                })}
            </TableBody>
        </TableContainer>
    )
}

// Helper function to render cell content based on header configuration
const renderCellContent = (row: any, header: HeaderConfig, rowIndex: number, colIndex: number) => {
    if (typeof header === 'string') {
        return row[header]
    }
    
    // Handle object-based header configuration
    if (header.render) {
        return header.render(row, rowIndex, colIndex)
    }
    
    if (header.key) {
        return row[header.key]
    }
    
    return null
}

export type HeaderConfig = {
    key: string
    label: string
    align?: "left" | "center" | "right"
    width?: string | number
    colSpan?: number
    render?: (row: any, rowIndex: number, colIndex: number) => React.ReactNode
}

type TableSize = "normal" | "small"

type TableProps<T = any> = {
    columns: HeaderConfig[]
    data: T[]
    columnWidths?: (string | number)[]
    rowKey?: (row: T, index: number) => string | number
    cellKey?: (row: T, headerKey: string, rowIndex: number, colIndex: number) => string | number
    onRowClick?: (row: T, index: number) => void
    size?: TableSize
}

const TableContainer = styled.div`
    width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const TableHeader = styled.div<{ $size: TableSize }>`
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
`

const TableHeaderCell = styled.div<{ 
    $size: TableSize; 
    align?: "left" | "center" | "right";
    $colSpan?: number;
}>`
    flex: ${props => props.$colSpan || 1};
    font-weight: 600;
    color: #374151;
    text-align: ${props => props.align || "left"};
    border-right: 1px solid #e2e8f0;
    
    padding: ${props => props.$size === "small" ? "8px 12px" : "12px 16px"};
    font-size: ${props => props.$size === "small" ? "14px" : "16px"};
    
    &:last-child {
        border-right: none;
    }
`

const TableBody = styled.div`
    display: flex;
    flex-direction: column;
`

const TableBodyRow = styled.div<{ $clickable: boolean; $size: TableSize }>`
    display: flex;
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.2s ease;
    cursor: ${props => props.$clickable ? 'pointer' : 'default'};
    
    &:hover {
        background-color: #f8fafc;
    }
    
    &:last-child {
        border-bottom: none;
    }
`

const TableBodyCell = styled.div<{ 
    $size: TableSize; 
    align?: "left" | "center" | "right";
    $colSpan?: number;
}>`
    flex: ${props => props.$colSpan || 1};
    color: #374151;
    text-align: ${props => props.align || "left"};
    display: flex;
    justify-content: ${props => props.align || "left"};
    border-right: 1px solid #f1f5f9;
    
    padding: ${props => props.$size === "small" ? "8px 12px" : "12px 16px"};
    font-size: ${props => props.$size === "small" ? "14px" : "16px"};
    
    &:last-child {
        border-right: none;
    }
`