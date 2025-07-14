import styled from "styled-components"

type $CardProps = {
    $width?: string;
    $height?: string;
    $padding?: string;
    $margin?: string;
    $backgroundColor?: string;
    $isSelectable?: boolean;
}

const Card = styled.div<$CardProps>`
    text-decoration: none;
    border: 1px solid #98F4E3;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: ${props => props.$padding || "12px"};
    margin: ${props => props.$margin || "0"};
    background-color: ${props => props.$backgroundColor || "transparent"};
    width: ${props => props.$width || "100%"};
    height: ${props => props.$height || "100%"};
    border-radius: 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: ${props => props.$isSelectable === false ? "default" : "pointer"};
    &:hover {
        transform: ${props => props.$isSelectable === false ? "none" : "scale(1.02)"};
        box-shadow: ${props => props.$isSelectable === false ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "0px 8px 8px rgba(0, 0, 0, 0.25)"};
        outline: ${props => props.$isSelectable === false ? "none" : "3px solid #66CDAA"};
    }
`;

export default Card