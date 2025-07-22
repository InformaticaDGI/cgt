import { useFormikContext } from "formik";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Input } from "../../../components/Ui/Input/Input";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";
import { Select } from "../../../components/Ui/Select/Select";
import useStepper from "../../../components/Stepper/useStepper";
import { useBudgetSourcesQuery } from "../../../hooks/queries/useBudgetSourcesQuery";

const ProjectResourcesForm = () => {
  const formik = useFormikContext<any>();
  const { previousStep, isFirstStep } = useStepper();
  const { data: sources = [], isLoading } = useBudgetSourcesQuery();

  const searchBudgetSources = async (q: string) => {
    if (!q) return sources.map((s) => ({ value: s.id, label: s.name }));
    return sources
      .filter((s) => s.name.toLowerCase().includes(q.toLowerCase()))
      .map((s) => ({ value: s.id, label: s.name }));
  };
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 20) value = value.slice(0, 20);
    formik.setFieldValue(field, value);
  };

  const formatNumber = (value: string | number) => {
    if (value === undefined || value === null || value === "") return "";
    const num = typeof value === "number" ? value : Number(value.toString().replace(/[^\d.]/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
        <GridItem $colSpan={24}>
          <FormControl label="Origen de los fondos" required>
            <Select
              options={sources.map(s => ({ value: s.id, label: s.name }))}
              value={formik.values.fundSource}
              onChange={value => formik.setFieldValue("fundSource", value)}
              placeholder="Seleccione el origen de fondos"
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Presupuesto" required>
            <Input
              name="budget"
              value={formik.values.budget}
              onChange={handleChange("budget")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Mano de obra calificada" required>
            <Input
              name="skilledLabor"
              value={formik.values.skilledLabor}
              onChange={handleChange("skilledLabor")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Mano de obra no calificada" required>
            <Input
              name="unskilledLabor"
              value={formik.values.unskilledLabor}
              onChange={handleChange("unskilledLabor")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Mano de obra indirecta" required>
            <Input
              name="indirectLabor"
              value={formik.values.indirectLabor}
              onChange={handleChange("indirectLabor")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Mano de obra directa" required>
            <Input
              name="directLabor"
              value={formik.values.directLabor}
              onChange={handleChange("directLabor")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Mujeres" required>
            <Input
              name="women"
              value={formik.values.women}
              onChange={handleChange("women")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
          <FormControl label="Hombres" required>
            <Input
              name="men"
              value={formik.values.men}
              onChange={handleChange("men")}
              placeholder="0,00"
              inputMode="decimal"
              maxLength={20}
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
          <Flex $direction="row" $justify="end" $gap="12px">
            <Button $variant="primary" type="button" disabled={isFirstStep} onClick={previousStep}>Atrás</Button>
            <Button $variant="primary" type="submit">Siguiente</Button>
          </Flex>
        </GridItem>
      </Grid>
    </form>
  );
};

export default ProjectResourcesForm;
