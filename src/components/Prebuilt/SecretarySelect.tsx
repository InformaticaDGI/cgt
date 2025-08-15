import { SearchableSelect } from "../Ui/Select/SearchableSelect";
import useSecretary from "../../hooks/useSecretary";

export const SecretarySelect = ({
  value,
  onChange,
  rootOnly = false,
  parentId,
}: SecretarySelectProps) => {
  const { data: secretaries } = useSecretary({ rootOnly, parentId });
  return (
    <SearchableSelect
      options={secretaries}
      value={value}
      onChange={onChange}
      placeholder={
        rootOnly ? "Seleccione una secretaría" : "Seleccione una dependencia"
      }
    />
  );
};

type SecretarySelectProps = {
  rootOnly?: boolean;
  parentId?: string;
  value?: string;
  onChange?: (value: string) => void;
};
