import styled from "styled-components"
import type { NavSectionTitleProps } from "./config"

const NavSectionTitle = ({ item }: { item: NavSectionTitleProps }) => {
    return <Title>{item.sectionTitle}</Title>
}

export default NavSectionTitle


const Title = styled.h1`
        font-size: 14px;
        color: white;
        font-weight: 600;
    `;