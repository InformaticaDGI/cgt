import styled from "styled-components"
import type { NavButtonProps } from "./config"

const NavButton = ({ item }: { item: NavButtonProps }) => {
    const Icon = item.icon;
    return (
        <StyledNavButton onClick={item.onClick}>
            {Icon && <IconWrapper>
                 <Icon size={14} />
            </IconWrapper>}
            <StyledLink>{item.label}</StyledLink>
        </StyledNavButton>
    )
}

export default NavButton

const StyledNavButton = styled.div`
    display: flex;
    padding: 10px 12px;
    align-items: center;
    margin: 6px;
    gap: 10px;
    border-radius: 6px;
    height: 36px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    
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
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(3px);
        border-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        
        &::before {
            opacity: 1;
        }
    }
    
    &:active {
        transform: translateY(0px) scale(0.98);
    }
`;

const IconWrapper = styled.div`
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    width: 24px;
    height: 24px;
    border-radius: 5px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
    }
`;

const StyledLink = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    transition: all 0.3s ease;
`;