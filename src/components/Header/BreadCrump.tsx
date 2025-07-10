import styled from "styled-components";
import BreadCrumpItem from "./BreadCrumpItem";
import Text from "../Ui/Text";

const BreadCrump = () => {

    const pathname = window.location.pathname;
    const splittedPathname = pathname.split("/").filter(Boolean);
    const lastIndex = splittedPathname.length - 1;
    
    return (<StyledBreadCrump>
        <Text variant="title">Paginas</Text>
        <Text>/</Text>
        <BreadCrumpItem href="/" placement="end">Indicadores</BreadCrumpItem>
        {splittedPathname.map((dirname, index) => {
            const pathname = "/" + splittedPathname.slice(0, index + 1).join("/");
            const isFirstIndex = index === 0;
            const isLastIndex = lastIndex === index;
            if(isFirstIndex && isLastIndex) {
                return <BreadCrumpItem href={pathname} placement="middle" key={crypto.randomUUID()}>{dirname}</BreadCrumpItem>
            }
            if(isFirstIndex) return <BreadCrumpItem href={pathname} placement="start" key={crypto.randomUUID()}>{dirname}</BreadCrumpItem>
            if(isLastIndex) return <BreadCrumpItem href={pathname} placement="end" key={crypto.randomUUID()}>{dirname}</BreadCrumpItem>
            return <BreadCrumpItem href={pathname} key={crypto.randomUUID()}>{dirname}</BreadCrumpItem>
        })}
    </StyledBreadCrump>)
}

export default BreadCrump


const StyledBreadCrump = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;