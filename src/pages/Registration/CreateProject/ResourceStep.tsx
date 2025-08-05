import { useFormik } from "formik";
import { Input } from "../../../components/Ui/Input/Input";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";
import useStepper from "../../../components/Stepper/useStepper";
import Card from "../../../components/Card/Card";
import { BudgetSourceSelect } from "../../../components/Prebuilt/BudgetSourceSelect";
import { useAppStore } from "../../../store/store";
import { CurrencyInput } from "../../../components/Prebuilt/CurrencyInput";
import { useDollarRate } from "../../../hooks/useDollarRate";
import { useEffect } from "react";

const ResourceStep = () => {
  const { previousStep, nextStep } = useStepper();
  const { formState, setFormState } = useAppStore();
  const { rate: dollarRate } = useDollarRate();


  const validate = (values: any) => {
    const errors: any = {};
    if (!values.budgetSourceId) {
      errors.budgetSourceId = "El origen de los fondos es requerido";
    }
    

    if(!values.budgetBs && values.budgetSourceId !== 'without-budget') {
       errors.budgetBs = "Este campo es requerido";
    }

    if(!values.budgetUsd && values.budgetSourceId !== 'without-budget') {
       errors.budgetUsd = "Este campo es requerido";
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

    console.log(errors);

    return errors;
  }

  const handleChangeBs = (value: string) => {
    formik.setFieldValue("budgetBs", value)
  }

  const formik = useFormik({
    initialValues: {
      budgetSourceId: formState.projectBudgetSourceId,
      budgetBs: formState.projectBudgetBs,
      budgetUsd: formState.projectBudgetUsd,
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
        projectBudgetBs: values.budgetBs,
        projectBudgetUsd: values.budgetUsd,
        projectQualifiedLabor: values.qualifiedLabor,
        projectUnqualifiedLabor: values.unqualifiedLabor,
        projectIndirectLabor: values.indirectLabor,
        projectDirectLabor: values.directLabor,
        projectFemaleLabor: values.femaleLabor,
        projectMaleLabor: values.maleLabor,
      })
      nextStep()

    },
    validate
  });

  useEffect(() => {
    if (dollarRate && formik.values.budgetBs) {
      const budgetBs = parseFloat(formik.values.budgetBs.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(budgetBs)) {
        const usdAmount = (budgetBs / dollarRate).toFixed(2);
        formik.setFieldValue('budgetUsd', usdAmount.replace('.', ','));
      }
    }
  }, [formik.values.budgetBs, dollarRate]);


  return (
    <form onSubmit={formik.handleSubmit}>
      <Card $isSelectable={false} $padding="32px">
        <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
          <GridItem $colSpan={24}>
            <h3 style={{ marginBottom: 8, color: '#222E3A', fontWeight: 600, fontSize: 18 }}>Fondos</h3>
          </GridItem>
          <GridItem $colSpan={12}>
            <FormControl label="Origen de los fondos" required error={formik.errors.budgetSourceId && formik.touched.budgetSourceId ? formik.errors.budgetSourceId : undefined}>
              <BudgetSourceSelect
                value={formik.values.budgetSourceId}
                onChange={value => formik.setFieldValue("budgetSourceId", value)}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Presupuesto (Bs)" required={formik.values.budgetSourceId !== "without-budget"} error={formik.errors.budgetBs && formik.touched.budgetBs ? formik.errors.budgetBs : undefined}>
              <CurrencyInput
                name="budgetBs"
                value={formik.values.budgetBs}
                onChange={handleChangeBs}
                placeholder="0,00"
                maxLength={20}
                disabled={formik.values.budgetSourceId === "without-budget"}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Presupuesto (USD)" required={formik.values.budgetSourceId !== "without-budget"} error={formik.errors.budgetUsd && formik.touched.budgetUsd ? formik.errors.budgetUsd : undefined}>
              <CurrencyInput
                name="budgetUsd"
                value={formik.values.budgetUsd}
                onChange={(value) => formik.setFieldValue("budgetUsd", value)}
                placeholder="0,00"
                maxLength={20}
		disabled={formik.values.budgetSourceId === "without-budget"}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <h3 style={{ margin: '24px 0 8px 0', color: '#222E3A', fontWeight: 600, fontSize: 18 }}>Cantidad de mano de obra</h3>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Calificada" required error={formik.errors.qualifiedLabor && formik.touched.qualifiedLabor ? formik.errors.qualifiedLabor : undefined}>
              <Input
                name="qualifiedLabor"
                value={formik.values.qualifiedLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("qualifiedLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
                
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="No calificada" required error={formik.errors.unqualifiedLabor && formik.touched.unqualifiedLabor ? formik.errors.unqualifiedLabor : undefined}>
              <Input
                name="unqualifiedLabor"
                value={formik.values.unqualifiedLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("unqualifiedLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                
                $size="medium"
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Indirecta" required error={formik.errors.indirectLabor && formik.touched.indirectLabor ? formik.errors.indirectLabor : undefined}>
              <Input
                name="indirectLabor"
                value={formik.values.indirectLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("indirectLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Directa" required error={formik.errors.directLabor && formik.touched.directLabor ? formik.errors.directLabor : undefined}>
              <Input
                name="directLabor"
                value={formik.values.directLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("directLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <h3 style={{ margin: '24px 0 8px 0', color: '#222E3A', fontWeight: 600, fontSize: 18 }}>Cantidad de personal</h3>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Mujeres" required error={formik.errors.femaleLabor && formik.touched.femaleLabor ? formik.errors.femaleLabor : undefined}>
              <Input
                name="femaleLabor"
                value={formik.values.femaleLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("femaleLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                maxLength={6}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Hombres" required error={formik.errors.maleLabor && formik.touched.maleLabor ? formik.errors.maleLabor : undefined}>
              <Input
                name="maleLabor"
                value={formik.values.maleLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("maleLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                maxLength={6}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <Flex $direction="row" $justify="space-between" $gap="12px">
              <Button $variant="primary" type="button" onClick={previousStep}>Anterior</Button>
              <Button $variant="primary" type="submit">Siguiente</Button>
            </Flex>
          </GridItem>
        </Grid>
      </Card>
    </form>
  );
};

export default ResourceStep;
