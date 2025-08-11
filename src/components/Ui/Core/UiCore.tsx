import styled from "styled-components";
import { forwardRef } from "react";
import type { 
    CoreProps, 
    UiCoreProps, 
    StyledCoreProps 
} from "./types";

// Función para transformar props normales a props con prefijo $
const transformProps = (props: CoreProps): StyledCoreProps => {
    const transformed: any = {};
    
    Object.keys(props).forEach(key => {
        if (key === 'as' || key === 'size' || key === 'variant' || key === 'colorScheme') {
            // Props especiales que no necesitan transformación
            transformed[key] = props[key as keyof CoreProps];
        } else {
            // Transformar a prefijo $
            transformed[`$${key}`] = props[key as keyof CoreProps];
        }
    });
    
    return transformed;
};

// Componente styled base
const StyledCore = styled.div<StyledCoreProps>`
    ${props => props.$m && `margin: ${props.$m};`}
    ${props => props.$mt && `margin-top: ${props.$mt};`}
    ${props => props.$mr && `margin-right: ${props.$mr};`}
    ${props => props.$mb && `margin-bottom: ${props.$mb};`}
    ${props => props.$ml && `margin-left: ${props.$ml};`}
    ${props => props.$mx && `margin-left: ${props.$mx}; margin-right: ${props.$mx};`}
    ${props => props.$my && `margin-top: ${props.$my}; margin-bottom: ${props.$my};`}
    
    ${props => props.$p && `padding: ${props.$p};`}
    ${props => props.$pt && `padding-top: ${props.$pt};`}
    ${props => props.$pr && `padding-right: ${props.$pr};`}
    ${props => props.$pb && `padding-bottom: ${props.$pb};`}
    ${props => props.$pl && `padding-left: ${props.$pl};`}
    ${props => props.$px && `padding-left: ${props.$px}; padding-right: ${props.$px};`}
    ${props => props.$py && `padding-top: ${props.$py}; padding-bottom: ${props.$py};`}
    
    ${props => props.$w && `width: ${props.$w};`}
    ${props => props.$h && `height: ${props.$h};`}
    ${props => props.$minW && `min-width: ${props.$minW};`}
    ${props => props.$minH && `min-height: ${props.$minH};`}
    ${props => props.$maxW && `max-width: ${props.$maxW};`}
    ${props => props.$maxH && `max-height: ${props.$maxH};`}
    
    ${props => props.$display && `display: ${props.$display};`}
    ${props => props.$overflow && `overflow: ${props.$overflow};`}
    ${props => props.$boxSizing && `box-sizing: ${props.$boxSizing};`}
    
    ${props => props.$position && `position: ${props.$position};`}
    ${props => props.$top && `top: ${props.$top};`}
    ${props => props.$bottom && `bottom: ${props.$bottom};`}
    ${props => props.$left && `left: ${props.$left};`}
    ${props => props.$right && `right: ${props.$right};`}
    ${props => props.$zIndex && `z-index: ${props.$zIndex};`}
    
    ${props => props.$flexDir && `flex-direction: ${props.$flexDir};`}
    ${props => props.$alignItems && `align-items: ${props.$alignItems};`}
    ${props => props.$justifyContent && `justify-content: ${props.$justifyContent};`}
    ${props => props.$flexWrap && `flex-wrap: ${props.$flexWrap};`}
    ${props => props.$flex && `flex: ${props.$flex};`}
    ${props => props.$flexGrow && `flex-grow: ${props.$flexGrow};`}
    ${props => props.$flexShrink && `flex-shrink: ${props.$flexShrink};`}
    ${props => props.$flexBasis && `flex-basis: ${props.$flexBasis};`}
    
    ${props => props.$gap && `gap: ${props.$gap};`}
    ${props => props.$rowGap && `row-gap: ${props.$rowGap};`}
    ${props => props.$columnGap && `column-gap: ${props.$columnGap};`}
    ${props => props.$alignSelf && `align-self: ${props.$alignSelf};`}
    ${props => props.$justifySelf && `justify-self: ${props.$justifySelf};`}
    ${props => props.$order && `order: ${props.$order};`}
    
    ${props => props.$grid && `grid: ${props.$grid};`}
    ${props => props.$gridTemplateColumns && `grid-template-columns: ${props.$gridTemplateColumns};`}
    ${props => props.$gridTemplateRows && `grid-template-rows: ${props.$gridTemplateRows};`}
    ${props => props.$gridColumn && `grid-column: ${props.$gridColumn};`}
    ${props => props.$gridRow && `grid-row: ${props.$gridRow};`}
    ${props => props.$gridArea && `grid-area: ${props.$gridArea};`}
    ${props => props.$gridAutoFlow && `grid-auto-flow: ${props.$gridAutoFlow};`}
    ${props => props.$gridAutoColumns && `grid-auto-columns: ${props.$gridAutoColumns};`}
    ${props => props.$gridAutoRows && `grid-auto-rows: ${props.$gridAutoRows};`}
    
    ${props => props.$fontSize && `font-size: ${props.$fontSize};`}
    ${props => props.$fontWeight && `font-weight: ${props.$fontWeight};`}
    ${props => props.$fontFamily && `font-family: ${props.$fontFamily};`}
    ${props => props.$fontStyle && `font-style: ${props.$fontStyle};`}
    ${props => props.$lineHeight && `line-height: ${props.$lineHeight};`}
    ${props => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing};`}
    ${props => props.$textAlign && `text-align: ${props.$textAlign};`}
    ${props => props.$textTransform && `text-transform: ${props.$textTransform};`}
    ${props => props.$textDecoration && `text-decoration: ${props.$textDecoration};`}
    
    ${props => props.$color && `color: ${props.$color};`}
    ${props => props.$bg && `background: ${props.$bg};`}
    ${props => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
    ${props => props.$bgImage && `background-image: ${props.$bgImage};`}
    ${props => props.$bgSize && `background-size: ${props.$bgSize};`}
    ${props => props.$bgPosition && `background-position: ${props.$bgPosition};`}
    ${props => props.$bgRepeat && `background-repeat: ${props.$bgRepeat};`}
    
    ${props => props.$border && `border: ${props.$border};`}
    ${props => props.$borderWidth && `border-width: ${props.$borderWidth};`}
    ${props => props.$borderColor && `border-color: ${props.$borderColor};`}
    ${props => props.$borderStyle && `border-style: ${props.$borderStyle};`}
    ${props => props.$borderTop && `border-top: ${props.$borderTop};`}
    ${props => props.$borderRight && `border-right: ${props.$borderRight};`}
    ${props => props.$borderBottom && `border-bottom: ${props.$borderBottom};`}
    ${props => props.$borderLeft && `border-left: ${props.$borderLeft};`}
    ${props => props.$borderX && `border-left: ${props.$borderX}; border-right: ${props.$borderX};`}
    ${props => props.$borderY && `border-top: ${props.$borderY}; border-bottom: ${props.$borderY};`}
    
    ${props => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
    ${props => props.$borderTopRadius && `border-top-left-radius: ${props.$borderTopRadius}; border-top-right-radius: ${props.$borderTopRadius};`}
    ${props => props.$borderBottomRadius && `border-bottom-left-radius: ${props.$borderBottomRadius}; border-bottom-right-radius: ${props.$borderBottomRadius};`}
    ${props => props.$borderLeftRadius && `border-top-left-radius: ${props.$borderLeftRadius}; border-bottom-left-radius: ${props.$borderLeftRadius};`}
    ${props => props.$borderRightRadius && `border-top-right-radius: ${props.$borderRightRadius}; border-bottom-right-radius: ${props.$borderRightRadius};`}
    
    ${props => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
    ${props => props.$opacity && `opacity: ${props.$opacity};`}
    ${props => props.$transform && `transform: ${props.$transform};`}
    ${props => props.$transition && `transition: ${props.$transition};`}
    
    ${props => props.$cursor && `cursor: ${props.$cursor};`}
    ${props => props.$visibility && `visibility: ${props.$visibility};`}
    ${props => props.$pointerEvents && `pointer-events: ${props.$pointerEvents};`}
    ${props => props.$userSelect && `user-select: ${props.$userSelect};`}
    ${props => props.$whiteSpace && `white-space: ${props.$whiteSpace};`}
    ${props => props.$textOverflow && `text-overflow: ${props.$textOverflow};`}
    ${props => props.$wordBreak && `word-break: ${props.$wordBreak};`}
    
    /* Pseudo-selectores */
    ${props => props.$_hover && `&:hover { ${props.$_hover} }`}
    ${props => props.$_focus && `&:focus { ${props.$_focus} }`}
    ${props => props.$_active && `&:active { ${props.$_active} }`}
    ${props => props.$_disabled && `&:disabled { ${props.$_disabled} }`}
    ${props => props.$_empty && `&:empty { ${props.$_empty} }`}
    ${props => props.$_selected && `&:selected { ${props.$_selected} }`}
    ${props => props.$_groupHover && `&:hover { ${props.$_groupHover} }`}
    ${props => props.$_before && `&::before { ${props.$_before} }`}
    ${props => props.$_after && `&::after { ${props.$_after} }`}
    ${props => props.$_first && `&:first-child { ${props.$_first} }`}
    ${props => props.$_last && `&:last-child { ${props.$_last} }`}
`;

// Componente principal UiCore
export const UiCore = forwardRef<HTMLDivElement, UiCoreProps>(
    ({ children, className, sx, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...coreProps }, ref) => {
        // Separar las props de styled-components de las props normales
        const { as, size, variant, colorScheme, ...styledProps } = coreProps;
        
        // Transformar las props para styled-components
        const transformedProps = transformProps(styledProps);
        
        return (
            <StyledCore
                ref={ref}
                className={className}
                style={sx}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
                onBlur={onBlur}
                as={as}
                {...transformedProps}
            >
                {children}
            </StyledCore>
        );
    }
);

UiCore.displayName = 'UiCore';

// Exportar el tipo para uso en otros componentes
export type { CoreProps, UiCoreProps };