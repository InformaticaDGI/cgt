import styled from "styled-components"
import { Flex } from "../Layout/Flex"
import { KpiBaseSelector } from "./KpiBaseSelector"


type KpiBaseInputProps = {
    value: string[]
    onChange: (value: string[]) => void
}


export const KpiBaseInput = ({ value, onChange }: KpiBaseInputProps) => {
    return <Flex style={{ width: '100%' }}>
        <KpiBaseSelector value={value} onChange={onChange} />
    </Flex>
}

const KpiBaseCard = styled.div`
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`