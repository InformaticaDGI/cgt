import type { CoreProps, EventProps, ReactProps } from "../Ui/Core/types";
import { UiCore } from "../Ui/Core/UiCore";

// Ejemplo 4: Componente Flex que extiende UiCore
interface StackProps extends CoreProps, EventProps, ReactProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean;
    spacing?: string;
}

export const Stack: React.FC<StackProps> = ({ 
    children, 
    direction = 'column',
    align = 'start',
    justify = 'start',
    wrap = false,
    spacing = '2px',
    p = '8px',
    ...props 
}) => {
    const directionMap: Record<string, string> = {
        row: 'row',
        column: 'column',
        'row-reverse': 'row-reverse',
        'column-reverse': 'column-reverse',
    };

    const alignMap: Record<string, string> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
        baseline: 'baseline',
    };

    const justifyMap: Record<string, string> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
    };

    const flexStyles: CoreProps = {
        display: 'flex',
        flexDir: directionMap[direction],
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: spacing.includes('px') ? spacing : `${spacing}px`,
        p: p.includes('px') ? p : `${p}px`,
    };

    return (
        <UiCore 
            {...flexStyles}
            {...props}
        >
            {children}
        </UiCore>
    );
};