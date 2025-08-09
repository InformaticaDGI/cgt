import styled from "styled-components"
import type { NavButtonProps } from "./config"

const NavButton = ({ item }: { item: NavButtonProps }) => {
    const Icon = item.icon;
    return (
        <StyledNavLink onClick={item.onClick}>
            <IconWrapper >
                {Icon && <Icon />}
            </IconWrapper>
            <StyledLink>{item.label}</StyledLink>
        </StyledNavLink>
    )
}

export default NavButton



const StyledNavLink = styled.div`
    display: flex;
    padding: 15px;
    align-items: center;
    gap: 8px;
    background: transparent;
    max-width: 98%;
    border-radius: 15px;
    height: 54px;
    text-decoration: none;

    &:hover {
        background: var(--secondary);
        cursor: pointer;
    }
`;


const IconWrapper = styled.div`
    color: var(--text_primary);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    width: 30px;
    height: 30px;
    border-radius: 12px;
`
const StyledLink = styled.p`
    color: var(--text_foreground);
    font-size: 12px;
    font-weight: 600;
`