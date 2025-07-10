import styled from "styled-components";
import BreadCrumpItem from "./BreadCrumpItem";

const BreadCrump = () => {

    const url = window.location.pathname;
    const splittedUrl = url.split("/").filter(Boolean);
    const lastIndex = splittedUrl.length - 1;

    return (<BreadCrumpContent>
        <Text variant="title">Paginas</Text>
        <Text>/</Text>
        <BreadCrumpItem href="/" placement="end">Indicadores</BreadCrumpItem>
        {splittedUrl.map((url, index) => {
            const isFirstIndex = index === 0;
            const isLastIndex = lastIndex === index

            if(isFirstIndex) return <BreadCrumpItem href={splittedUrl.slice(0,index).join('/')} placement="start" key={crypto.randomUUID()}>{url}</BreadCrumpItem>
            if(isLastIndex) return <BreadCrumpItem href={splittedUrl.slice(0,index).join('/')} placement="end" key={crypto.randomUUID()}>{url}</BreadCrumpItem>
            return <BreadCrumpItem href={splittedUrl.slice(0,index).join('/')} key={crypto.randomUUID()}>{url}</BreadCrumpItem>
        })}
    </BreadCrumpContent>)
}

export default BreadCrump


const BreadCrumpContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const Text = styled.p<{ variant?: "title" | "normal" }>`
    color: ${props => props.variant === 'title' ? "#A0AEC0" : "#2D3748"};
    font-size: 20px;
    font-weight: 600;
`;