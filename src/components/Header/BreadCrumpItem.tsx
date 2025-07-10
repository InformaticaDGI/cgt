import styled from "styled-components";
import Text from "../Ui/Text";

const BreadCrumpItem = ({ children, href, placement = "default" }: { children: string, href: string, placement?: "start" | "end" | "default" }) => {

    if(placement === 'end'){
        return <StyledBreadCrumpItem href={href}>{children}</StyledBreadCrumpItem>
    }

    if(placement === 'start') {
        return <>
            <Text>/</Text>
            <StyledBreadCrumpItem href={href}>{children}</StyledBreadCrumpItem>
            <Text>/</Text>
        </>
    }


    return (
        <>
            <StyledBreadCrumpItem href={href}>{children}</StyledBreadCrumpItem>
            <Text>/</Text>
        </>
    )
}

export default BreadCrumpItem

const StyledBreadCrumpItem = styled.a`
    text-decoration: none;
    font-size: 20px;
    color: #2D3748;
    &:hover {
        text-decoration: underline;
    }
`