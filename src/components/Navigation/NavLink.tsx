import styled from "styled-components"
import { Link, useLocation } from "react-router";
import type { NavLinkProps } from "./config"

const NavLink = ({ item }: { item: NavLinkProps }) => {
    const location = useLocation().pathname.split('/');
    const Icon = item.icon;

    return (
        <StyledNavLink $currentPage={location.includes(item.to)} to={item.to}>
            {Icon && <IconWrapper $currentPage={location.includes(item.to)}>
                <Icon size={14} />
            </IconWrapper>}
            <StyledLink $currentPage={location.includes(item.to)}>{item.label}</StyledLink>
        </StyledNavLink>
    )
}

export default NavLink

const StyledNavLink = styled(Link)<{ $currentPage: boolean }>`
    display: flex;
    padding: 8px 12px;
    align-items: center;
    margin: 3px 6px;
    gap: 10px;
    background: ${props => props.$currentPage ? "rgba(255, 255, 255, 0.15)" : "transparent"};
    border-radius: 6px;
    height: 36px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${props => props.$currentPage ? "rgba(255, 255, 255, 0.2)" : "transparent"};
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    &:hover {
        background: ${props => props.$currentPage ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
        transform: translateX(3px);
        border-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        
        &::before {
            opacity: 1;
        }
    }
    
    &:active {
        transform: translateX(1px) scale(0.98);
    }
`;

const IconWrapper = styled.div<{ $currentPage: boolean }>`
    color: ${props => props.$currentPage ? "var(--primary)" : "rgba(255, 255, 255, 0.8)"};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$currentPage ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.1)"};
    width: 24px;
    height: 24px;
    border-radius: 5px;
    transition: all 0.3s ease;
    box-shadow: ${props => props.$currentPage ? "0 2px 6px rgba(0, 0, 0, 0.1)" : "none"};
    
    &:hover {
        background: ${props => props.$currentPage ? "white" : "rgba(255, 255, 255, 0.2)"};
        transform: scale(1.05);
    }
`;

const StyledLink = styled.p<{ $currentPage: boolean }>`
    color: ${props => props.$currentPage ? "white" : "rgba(255, 255, 255, 0.9)"};
    font-size: 14px;
    font-weight: ${props => props.$currentPage ? "600" : "500"};
    margin: 0;
    transition: all 0.3s ease;
    text-shadow: ${props => props.$currentPage ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none"};
`;