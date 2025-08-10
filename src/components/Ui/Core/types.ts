// Tipos base para el sistema de diseño

// Props de espaciado
export interface SpacingProps {
    m?: string;      // margin
    mt?: string;     // margin-top
    mr?: string;     // margin-right
    mb?: string;     // margin-bottom
    ml?: string;     // margin-left
    mx?: string;     // margin-left & margin-right
    my?: string;     // margin-top & margin-bottom
    p?: string;      // padding
    pt?: string;     // padding-top
    pr?: string;     // padding-right
    pb?: string;     // padding-bottom
    pl?: string;     // padding-left
    px?: string;     // padding-left & padding-right
    py?: string;     // padding-top & padding-bottom
}

// Props de dimensiones
export interface SizeProps {
    w?: string;      // width
    h?: string;      // height
    minW?: string;   // min-width
    minH?: string;   // min-height
    maxW?: string;   // max-width
    maxH?: string;   // max-height
}

// Props de layout
export interface LayoutProps {
    display?: string;    // display
    overflow?: string;   // overflow
    boxSizing?: string;  // box-sizing
    position?: string;   // position
    top?: string;        // top
    bottom?: string;     // bottom
    left?: string;       // left
    right?: string;      // right
    zIndex?: string;     // z-index
}

// Props de flexbox
export interface FlexProps {
    flexDir?: string;        // flex-direction
    alignItems?: string;     // align-items
    justifyContent?: string; // justify-content
    flexWrap?: string;       // flex-wrap
    flex?: string;           // flex
    flexGrow?: string;       // flex-grow
    flexShrink?: string;     // flex-shrink
    flexBasis?: string;      // flex-basis
    gap?: string;            // gap
    rowGap?: string;         // row-gap
    columnGap?: string;      // column-gap
    alignSelf?: string;      // align-self
    justifySelf?: string;    // justify-self
    order?: string;          // order
}

// Props de grid
export interface GridProps {
    grid?: string;               // grid
    gridTemplateColumns?: string; // grid-template-columns
    gridTemplateRows?: string;    // grid-template-rows
    gridColumn?: string;          // grid-column
    gridRow?: string;             // grid-row
    gridArea?: string;            // grid-area
    gridAutoFlow?: string;        // grid-auto-flow
    gridAutoColumns?: string;     // grid-auto-columns
    gridAutoRows?: string;        // grid-auto-rows
}

// Props de tipografía
export interface TypographyProps {
    fontSize?: string;        // font-size
    fontWeight?: string;      // font-weight
    fontFamily?: string;      // font-family
    fontStyle?: string;       // font-style
    lineHeight?: string;      // line-height
    letterSpacing?: string;   // letter-spacing
    textAlign?: string;       // text-align
    textTransform?: string;   // text-transform
    textDecoration?: string;  // text-decoration
    color?: string;           // color
}

// Props de fondo
export interface BackgroundProps {
    bg?: string;              // background
    backgroundColor?: string; // background-color
    bgImage?: string;         // background-image
    bgSize?: string;          // background-size
    bgPosition?: string;      // background-position
    bgRepeat?: string;        // background-repeat
}

// Props de bordes
export interface BorderProps {
    border?: string;              // border
    borderWidth?: string;         // border-width
    borderColor?: string;         // border-color
    borderStyle?: string;         // border-style
    borderTop?: string;           // border-top
    borderRight?: string;         // border-right
    borderBottom?: string;        // border-bottom
    borderLeft?: string;          // border-left
    borderX?: string;             // border-left & border-right
    borderY?: string;             // border-top & border-bottom
    borderRadius?: string;        // border-radius
    borderTopRadius?: string;     // border-top-left-radius & border-top-right-radius
    borderBottomRadius?: string;  // border-bottom-left-radius & border-bottom-right-radius
    borderLeftRadius?: string;    // border-top-left-radius & border-bottom-left-radius
    borderRightRadius?: string;   // border-top-right-radius & border-bottom-right-radius
}

// Props de efectos
export interface EffectProps {
    boxShadow?: string;   // box-shadow
    opacity?: string;     // opacity
    transform?: string;   // transform
    transition?: string;  // transition
}

// Props de pseudo-selectores
export interface PseudoProps {
    _hover?: string;      // &:hover
    _focus?: string;      // &:focus
    _active?: string;     // &:active
    _disabled?: string;   // &:disabled
    _empty?: string;      // &:empty
    _selected?: string;   // &:selected
    _groupHover?: string; // &:hover
    _before?: string;     // &::before
    _after?: string;      // &::after
    _first?: string;      // &:first-child
    _last?: string;       // &:last-child
}

// Props de interacción
export interface InteractionProps {
    cursor?: string;        // cursor
    visibility?: string;    // visibility
    pointerEvents?: string; // pointer-events
    userSelect?: string;    // user-select
    whiteSpace?: string;    // white-space
    textOverflow?: string;  // text-overflow
    wordBreak?: string;     // word-break
}

// Props especiales
export interface SpecialProps {
    as?: string;        // styled-components as prop
    size?: string;      // size variant
    variant?: string;   // component variant
    colorScheme?: string; // color scheme
}

// Props de eventos
export interface EventProps {
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

// Props de React
export interface ReactProps {
    children?: React.ReactNode;
    className?: string;
    sx?: React.CSSProperties;
}

// CoreProps - Unión de todas las props disponibles
export type CoreProps = 
    & SpacingProps
    & SizeProps
    & LayoutProps
    & FlexProps
    & GridProps
    & TypographyProps
    & BackgroundProps
    & BorderProps
    & EffectProps
    & PseudoProps
    & InteractionProps
    & SpecialProps;

// Props completas para UiCore
export type UiCoreProps = CoreProps & EventProps & ReactProps;

// Tipo para las props transformadas con prefijo $
export type StyledCoreProps = {
    [K in keyof CoreProps as K extends string ? `$${K}` : K]: CoreProps[K]
}
