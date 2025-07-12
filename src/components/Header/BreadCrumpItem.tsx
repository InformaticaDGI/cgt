import styled from "styled-components";
import Text from "../Ui/Text/Text";
import type React from "react";

const BreadCrumpItem = ({ children, href, placement = "default", ...props }: { children: string, href: string, placement?: "start" | "end" | "middle" | "default" } & React.ComponentPropsWithoutRef<'a'>) => {

    if(placement === 'end'){
        return <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
    }

    if(placement === 'start') {
        return <>
            <Text>/</Text>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
            <Text>/</Text>
        </>
    }

    if(placement === 'middle') {
        return <>
            <Text>/</Text>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
        </>
    }


    return (
        <>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
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