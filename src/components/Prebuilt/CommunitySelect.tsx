import { Select } from "../Ui/Select/Select";
import { useCommunitiesByCircuit } from "../../hooks/queries/useCommunitiesByCircuit";

export const CommunitySelect = ({ value, onChange, circuitId, style }: CommunitySelectProps) => {
    const { data: communities } = useCommunitiesByCircuit(circuitId);
    return <Select options={communities?.map(community => ({ label: community.name, value: community.id })) || []} value={value} onChange={onChange} 
    placeholder="Seleccione una comunidad" style={style} />
}

type CommunitySelectProps = {
    value: string;
    onChange: (value: string) => void;
    circuitId: string;
    style?: React.CSSProperties;
}
