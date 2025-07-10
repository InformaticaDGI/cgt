import styled from "styled-components";

const BreadCrumpItem = ({ children, href, placement = "default" }: { children: string, href: string, placement?: "start" | "end" | "default" }) => {

    if(placement === 'end'){
        return <BreadCrumpElement href={href}>{children}</BreadCrumpElement>
    }

    if(placement === 'start') {
        return <>
            <Text>/</Text>
            <BreadCrumpElement href={href}>{children}</BreadCrumpElement>
            <Text>/</Text>
        </>
    }


    return (
        <>
            <BreadCrumpElement href={href}>{children}</BreadCrumpElement>
            <Text>/</Text>
        </>
    )
}

export default BreadCrumpItem

const BreadCrumpElement = styled.a`
    text-decoration: none;
    font-size: 20px;
    color: #2D3748;
`
const Text = styled.p<{ variant?: "title" | "normal" }>`
    color: ${props => props.variant === 'title' ? "#A0AEC0" : "#2D3748"};
    font-size: 20px;
    font-weight: 600;
`;