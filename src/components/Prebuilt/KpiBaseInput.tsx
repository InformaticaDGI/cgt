import { Flex } from "../Layout/Flex"
import { KpiInstanceSelector } from "./KpiBaseSelector"
import type { KpiInstance } from "../../hooks/mutations/useKpiInstances"


type KpiBaseInputProps = {
    value: KpiInstance[]
    onChange: (value: KpiInstance[]) => void
}


export const KpiBaseInput = ({ value, onChange }: KpiBaseInputProps) => {
    return <Flex style={{ width: '100%' }}>
        <KpiInstanceSelector value={value} onChange={onChange} />
    </Flex>
}
