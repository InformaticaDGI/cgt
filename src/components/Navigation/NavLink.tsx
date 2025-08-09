import styled from "styled-components"
import { Link, useLocation } from "react-router";
import type { NavLinkProps } from "./config"

const NavLink = ({ item }: { item: NavLinkProps }) => {
    const location = useLocation().pathname.split('/');
    const Icon = item.icon;

    return (
        <StyledNavLink $currentPage={location.includes(item.to)} as={Link} to={item.to}>
            {Icon && <IconWrapper $currentPage={location.includes(item.to)}>
                <Icon />
            </IconWrapper>}
            <StyledLink $currentPage={location.includes(item.to)}>{item.label}</StyledLink>
        </StyledNavLink>
    )
}

export default NavLink

const StyledNavLink = styled.div<{ $currentPage: boolean }>`
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 8px;
    background: ${props => props.$currentPage ? "var(--background)" : "transparent"};
    max-width: 98%;
    box-shadow: ${props => props.$currentPage ? "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)" : "none"};
    border-radius: 15px;
    height: 32px;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        background: ${props => props.$currentPage ? "var(--background)" : "var(--secondary)"};
        cursor: pointer;
    }
`;

const IconWrapper = styled.div<{ $currentPage: boolean }>`
    color: ${props => props.$currentPage ? "var(--text_foreground)" : "var(--text_primary)"};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$currentPage ? "var(--primary)" : "var(--background)"};
    width: 24px;
    height: 24px;
    border-radius: 12px;
`

const StyledLink = styled.p<{ $currentPage: boolean }>`
    color: ${props => props.$currentPage ? "var(--text_primary)" : "var(--text_foreground)"};
    font-size: 12px;
    font-weight: 600;
`