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
import Text from "../../../components/Ui/Text/Text";

const ResourceStep = () => {
  const { previousStep, nextStep } = useStepper();
  const { formState, setFormState } = useAppStore();
  const { rate: dollarRate } = useDollarRate();


  const validate = (values: any) => {
    const errors: any = {};
    if (!values.budgetSourceId) {
      errors.budgetSourceId = "El origen de los fondos es requerido";
    }
    

    if(!values.initialBudget && values.budgetSourceId !== 'without-budget' && values.budgetSourceId !== '') {
       errors.initialBudget = "Este campo es requerido";
    }

    if(!values.initialBudgetUsd && values.budgetSourceId !== 'without-budget' && values.budgetSourceId !== '') {
       errors.initialBudgetUsd = "Este campo es requerido";
    }

    return errors;
  }

  const handleChangeSource = (value: string) => {
    formik.setFieldValue("initialBudget", value)
  }

  const formik = useFormik({
    initialValues: {
      budgetSourceId: formState.projectBudgetSourceId,
      initialBudget: formState.projectInitialBudget || '',
      initialBudgetUsd: formState.projectInitialBudgetUsd || '',
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
        projectInitialBudget: values.initialBudget,
        projectInitialBudgetUsd: values.initialBudgetUsd,
        projectQualifiedLabor: values.qualifiedLabor || '0',
        projectUnqualifiedLabor: values.unqualifiedLabor || '0',
        projectIndirectLabor: values.indirectLabor || '0',
        projectDirectLabor: values.directLabor || '0',
        projectFemaleLabor: values.femaleLabor || '0',
        projectMaleLabor: values.maleLabor || '0',
      })
      nextStep()

    },
    validate
  });

  useEffect(() => {
    if (dollarRate && formik.values.initialBudget) {
      const budgetBs = parseFloat(formik.values.initialBudget.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(budgetBs)) {
        const usdAmount = (budgetBs / dollarRate).toFixed(2);
        formik.setFieldValue('initialBudgetUsd', usdAmount.replace('.', ','));
      }
    }
  }, [formik.values.initialBudget, dollarRate]);


  return (
    <form onSubmit={formik.handleSubmit}>
      <Card $isSelectable={false} $padding="32px">
        <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
          <GridItem $colSpan={24}>
            <Text $fontSize="14px" $color="#2d2d2d">Fondos</Text>
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
            <FormControl label="Presupuesto (Bs)" required={formik.values.budgetSourceId !== "without-budget" && formik.values.budgetSourceId !== ''} error={formik.errors.initialBudget && formik.touched.initialBudget ? formik.errors.initialBudget : undefined}>
              <CurrencyInput
                name="initialBudget"
                value={formik.values.initialBudget}
                onChange={handleChangeSource}
                placeholder="0,00"
                maxLength={20}
                disabled={formik.values.budgetSourceId === "without-budget" || !formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Presupuesto (USD)" required={formik.values.budgetSourceId !== "without-budget" && formik.values.budgetSourceId !== ''} error={formik.errors.initialBudgetUsd && formik.touched.initialBudgetUsd ? formik.errors.initialBudgetUsd : undefined}>
              <CurrencyInput
                name="initialBudgetUsd"
                value={formik.values.initialBudgetUsd}
                onChange={(value) => formik.setFieldValue("initialBudgetUsd", value)}
                placeholder="0,00"
                maxLength={20}
		            disabled={formik.values.budgetSourceId === "without-budget" || !formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <Text $fontSize="14px" $color="#2d2d2d">Cantidad de mano de obra</Text>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Calificada" error={formik.errors.qualifiedLabor && formik.touched.qualifiedLabor ? formik.errors.qualifiedLabor : undefined}>
              <Input
                name="qualifiedLabor"
                value={formik.values.qualifiedLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("qualifiedLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
                disabled={!formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="No calificada" error={formik.errors.unqualifiedLabor && formik.touched.unqualifiedLabor ? formik.errors.unqualifiedLabor : undefined}>
              <Input
                name="unqualifiedLabor"
                value={formik.values.unqualifiedLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("unqualifiedLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                disabled={!formik.values.budgetSourceId}
                $size="medium"
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Indirecta" error={formik.errors.indirectLabor && formik.touched.indirectLabor ? formik.errors.indirectLabor : undefined}>
              <Input
                name="indirectLabor"
                value={formik.values.indirectLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("indirectLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
                disabled={!formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Directa" error={formik.errors.directLabor && formik.touched.directLabor ? formik.errors.directLabor : undefined}>
              <Input
                name="directLabor"
                value={formik.values.directLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("directLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                $size="medium"
                disabled={!formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <Text $fontSize="14px" $color="#2d2d2d">Cantidad de personal</Text>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Mujeres">
              <Input
                name="femaleLabor"
                value={formik.values.femaleLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("femaleLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                maxLength={6}
                $size="medium"
                disabled={!formik.values.budgetSourceId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={6}>
            <FormControl label="Hombres">
              <Input
                name="maleLabor"
                $size="medium"
                value={formik.values.maleLabor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue("maleLabor", e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                maxLength={6}
                disabled={!formik.values.budgetSourceId}
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
