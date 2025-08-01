import { Select } from "../Ui/Select/Select";
import { useCommunitiesByCircuit } from "../../hooks/queries/useCommunitiesByCircuit";

export const CommunitySelect = ({ value, onChange, circuitCode, style }: CommunitySelectProps) => {
    const { data: communities } = useCommunitiesByCircuit(circuitCode);
    return <Select options={communities?.map(community => ({ label: community.name, value: community.id })) || []} value={value} onChange={onChange} 
    placeholder="Seleccione una comunidad" style={style} />
}

type CommunitySelectProps = {
    value: string;
    onChange: (value: string) => void;
    circuitCode: string;
    style?: React.CSSProperties;
}
