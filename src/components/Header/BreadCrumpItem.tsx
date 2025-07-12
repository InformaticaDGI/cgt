import styled from "styled-components";
import Text from "../Ui/Text";
import type React from "react";

const BreadCrumpItem = ({ children, href, placement = "default", ...props }: { children: string, href: string, placement?: "start" | "end" | "middle" | "default" } & React.ComponentPropsWithoutRef<'a'>) => {

    if (placement === 'end') {
        return <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
    }

    if (placement === 'start') {
        return <>
            <StyledBreadCrumpItemText>/</StyledBreadCrumpItemText>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
            <StyledBreadCrumpItemText>/</StyledBreadCrumpItemText>
        </>
    }

    if (placement === 'middle') {
        return <>
            <StyledBreadCrumpItemText>/</StyledBreadCrumpItemText>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
        </>
    }


    return (
        <>
            <StyledBreadCrumpItem {...props} href={href}>{children}</StyledBreadCrumpItem>
            <StyledBreadCrumpItemText>/</StyledBreadCrumpItemText>
        </>
    )
}

export default BreadCrumpItem

const StyledBreadCrumpItemText = styled(Text)`
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
`

const StyledBreadCrumpItem = styled.a`
    text-decoration: none;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`