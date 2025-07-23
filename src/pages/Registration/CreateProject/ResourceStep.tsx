import { useFormik } from "formik";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Input } from "../../../components/Ui/Input/Input";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";
import useStepper from "../../../components/Stepper/useStepper";
import Card from "../../../components/Card/Card";
import { BudgetSourceSelect } from "../../../components/Prebuilt/BudgetSourceSelect";
import { useAppStore } from "../../../store/store";

const ResourceStep = () => {
  const { previousStep, isFirstStep, nextStep } = useStepper();
  const { formState, setFormState } = useAppStore();


  const validate = (values: any) => {
    const errors: any = {};
    if (!values.budgetSourceId) {
      errors.budgetSourceId = "El origen de los fondos es requerido";
    }
    if (!values.budget) {
      errors.budget = "El presupuesto es requerido";
    }
    if (!values.qualifiedLabor) {
      errors.qualifiedLabor = "La mano de obra calificada es requerida";
    }
    if (!values.unqualifiedLabor) {
      errors.unqualifiedLabor = "La mano de obra no calificada es requerida";
    }
    if (!values.indirectLabor) {
      errors.indirectLabor = "La mano de obra indirecta es requerida";
    }
    if (!values.directLabor) {
      errors.directLabor = "La mano de obra directa es requerida";
    }
    if (!values.femaleLabor) {
      errors.femaleLabor = "Las mujeres son requeridas";
    }
    if (!values.maleLabor) {
      errors.maleLabor = "Los hombres son requeridos";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      budgetSourceId: formState.projectBudgetSourceId,
      budget: formState.projectBudget,
      qualifiedLabor: formState.projectQualifiedLabor,
      unqualifiedLabor: formState.projectUnqualifiedLabor,
      indirectLabor: formState.projectIndirectLabor,
      directLabor: formState.projectDirectLabor,
      femaleLabor: formState.projectFemaleLabor,
      maleLabor: formState.projectMaleLabor,
    },
    onSubmit: (values) => {
      setFormState({ 
        ...formState,
        projectBudgetSourceId: values.budgetSourceId,
        projectBudget: +values.budget,
        projectQualifiedLabor: +values.qualifiedLabor,
        projectUnqualifiedLabor: +values.unqualifiedLabor,
        projectIndirectLabor: +values.indirectLabor,
        projectDirectLabor: +values.directLabor,
        projectFemaleLabor: +values.femaleLabor,
        projectMaleLabor: +values.maleLabor,
       })
       nextStep()
       
    },
    validate
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card $isSelectable={false} $padding="32px">
        <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
          <GridItem $colSpan={24}>
            <FormControl label="Origen de los fondos" required error={formik.errors.budgetSourceId && formik.touched.budgetSourceId ? formik.errors.budgetSourceId : undefined}>
              <BudgetSourceSelect
                value={formik.values.budgetSourceId}
                onChange={value => formik.setFieldValue("budgetSourceId", value)}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Presupuesto" required error={formik.errors.budget && formik.touched.budget ? formik.errors.budget : undefined}>
              <Input
                name="budget"
                value={formik.values.budget}
                onChange={({ target: { value } }) => formik.setFieldValue("budget", value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Mano de obra calificada" required error={formik.errors.qualifiedLabor && formik.touched.qualifiedLabor ? formik.errors.qualifiedLabor : undefined}>
              <Input
                name="qualifiedLabor"
                value={formik.values.qualifiedLabor}
                onChange={(e) => formik.setFieldValue("qualifiedLabor", e.target.value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Mano de obra no calificada" required error={formik.errors.unqualifiedLabor && formik.touched.unqualifiedLabor ? formik.errors.unqualifiedLabor : undefined}>
              <Input
                name="unqualifiedLabor"
                value={formik.values.unqualifiedLabor}
                onChange={({ target: { value } }) => formik.setFieldValue("unqualifiedLabor", value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Mano de obra indirecta" required error={formik.errors.indirectLabor && formik.touched.indirectLabor ? formik.errors.indirectLabor : undefined}>
              <Input
                name="indirectLabor"
                value={formik.values.indirectLabor}
                onChange={({ target: { value } }) => formik.setFieldValue("indirectLabor", value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Mano de obra directa" required error={formik.errors.directLabor && formik.touched.directLabor ? formik.errors.directLabor : undefined}>
              <Input
                name="directLabor"
                value={formik.values.directLabor}
                onChange={({ target: { value } }) => formik.setFieldValue("directLabor", value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Mujeres" required error={formik.errors.femaleLabor && formik.touched.femaleLabor ? formik.errors.femaleLabor : undefined}>
              <Input
                name="femaleLabor"
                value={formik.values.femaleLabor}
                onChange={({ target: { value } }) => formik.setFieldValue("femaleLabor", value)}
                placeholder="0,00"
                inputMode="decimal"
                maxLength={20}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Hombres" required error={formik.errors.maleLabor && formik.touched.maleLabor ? formik.errors.maleLabor : undefined}>
              <Input
                name="maleLabor"
                value={formik.values.maleLabor}
                onChange={({ target: { value } }) => formik.setFieldValue("maleLabor", value)}
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
      </Card>
    </form>
  );
};

export default ResourceStep;
