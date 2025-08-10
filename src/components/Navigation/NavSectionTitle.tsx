import styled from "styled-components"
import type { NavSectionTitleProps } from "./config"
import { FaList } from "react-icons/fa"
import { Flex } from "../Layout/Flex"
import { Link, useLocation } from "react-router-dom"

const NavSectionTitle = ({ item }: { item: NavSectionTitleProps }) => {
    const Icon = item.icon || FaList
    const location = window.location.pathname;

    if (item.to) {
        return <StyledNavLink $currentPage={location.includes(item.to)} to={item.to}>
            <Flex $justify="start" $direction="row" $gap="10px">
                <Icon color="white" />
                <Title>{item.sectionTitle}</Title>
            </Flex>
        </StyledNavLink>
    }

    return (
        <SectionContainer>
            <SectionHeader>
                <Flex $justify="start" $padding="10px 14px" $direction="row" $gap="10px" $align="center">
                    <Icon color="white" size={14} />
                    <Title>{item.sectionTitle}</Title>
                </Flex>
            </SectionHeader>
        </SectionContainer>
    )
}

export default NavSectionTitle

const SectionContainer = styled.div`
    margin: 6px 0;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const SectionHeader = styled.div`
    transition: all 0.3s ease;
`;

const Title = styled.h2`
    font-size: 12px;
    color: white;
    font-weight: 600;
    margin: 0;
    flex: 1;
    text-transform: uppercase;
    letter-spacing: 0.3px;
`;

const StyledNavLink = styled(Link)<{ $currentPage: boolean }>`
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 8px;
    background: ${props => props.$currentPage ? "var(--background)" : "transparent"};
    max-width: 98%;
    box-shadow: ${props => props.$currentPage ? "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)" : "none"};
    border-radius: 12px;
    height: 32px;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        background: ${props => props.$currentPage ? "var(--background)" : "var(--secondary)"};
        cursor: pointer;
    }
`;