import { SearchableSelect } from "../Ui/Select/SearchableSelect";
import { useAcaProjectsByFilter } from "../../hooks/queries/useAcaProjectsByFilter";
import { useMemo, useState } from "react";

export const AcaProjectsSelect = ({
  value,
  onChange,
  areaId,
  municipalityId,
  communityCircuitId,
  sectorId,
  style,
  disabled,
}: AcaProjectsSelectProps) => {
  const { data: acaProjects } = useAcaProjectsByFilter({
    municipalityId,
    communityCircuitId,
    sectorId,
  });

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const setListOptionsFilter = () => {
    const list = acaProjects?.data || [];
    console.log("Areas", areaId);
    const listOptions = list
      .filter((item) => {
        return areaId.includes(item.areaId) && municipalityId !== "";
      })
      .map((item) => ({
        label: item.name,
        value: item.id,
      }));

    setOptions(listOptions);
  };

  useMemo(() => {
    setListOptionsFilter();
  }, [acaProjects]);

  return (
    <SearchableSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Seleccione una comunidad"
      style={style}
      disabled={disabled}
    />
  );
};

type AcaProjectsSelectProps = {
  value: string;
  onChange: (value: string) => void;
  areaId: string[];
  parrishId: string;
  municipalityId: string;
  communityCircuitId: string;
  sectorId: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};
