import { SearchableSelect } from "../Ui/Select/SearchableSelect";
import { useAcaProjectsByFilter } from "../../hooks/queries/useAcaProjectsByFilter";

export const AcaProjectsSelect = ({
  value,
  onChange,
  comunityId,
  municipalityId,
  style,
}: AcaProjectsSelectProps) => {
  const { data: acaProjects } = useAcaProjectsByFilter({
    comunityId,
    municipalityId,
  });

  console.log("acaProjects", acaProjects?.data);
  return (
    <SearchableSelect
      options={
        acaProjects?.data?.map((acaProject) => ({
          label: acaProject.name,
          value: acaProject.id,
        })) || []
      }
      value={value}
      onChange={onChange}
      placeholder="Seleccione una comunidad"
      style={style}
    />
  );
};

type AcaProjectsSelectProps = {
  value: string;
  onChange: (value: string) => void;
  comunityId: string;
  municipalityId: string;
  style?: React.CSSProperties;
};
