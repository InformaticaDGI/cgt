import { SearchableSelect } from "../Ui/Select/SearchableSelect";
import { useCommunityCircuitsByParish } from "../../hooks/queries/useCommunityCircuitsByParish";

export const CommunityCircuitCodeSelect = ({
  value,
  onChange,
  parishId,
  style,
}: CommunityCircuitCodeSelectProps) => {
  const { data: circuits } = useCommunityCircuitsByParish(parishId);
  return (
    <SearchableSelect
      options={
        circuits?.map((circuit) => ({
          label: circuit.name,
          value: circuit.code,
        })) || []
      }
      value={value}
      onChange={onChange}
      placeholder="Seleccione un circuito comunal"
      style={style}
    />
  );
};

type CommunityCircuitCodeSelectProps = {
  value: string;
  onChange: (value: string) => void;
  parishId: string;
  style?: React.CSSProperties;
};
