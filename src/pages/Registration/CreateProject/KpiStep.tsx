import Card from "../../../components/Card/Card"
import { Button } from "../../../components/Ui/Button/Button"
import useStepper from "../../../components/Stepper/useStepper"
import { Flex } from "../../../components/Layout/Flex"
import { Grid, GridItem } from "../../../components/Layout/Grid"
import { FormControl } from "../../../components/Ui/FormControl/FormControl"
import { Input } from "../../../components/Ui/Input/Input"
import { useFormik } from "formik"
import { useAppStore } from "../../../store/store"
import { KpiBaseInput } from "../../../components/Prebuilt/KpiBaseInput"
import { useCreateProject } from "../../../hooks/mutations/useCreateProject"

const KpiStep = () => {

    const { previousStep } = useStepper()
    const { formState } = useAppStore()
    const { mutateAsync: createProject } = useCreateProject()

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.kpiInstances) errors.kpiInstances = "Las metas del proyecto son requeridas";
        if (!values.benefitedPopulation) errors.benefitedPopulation = "La cantidad de beneficiarios es requerida";
        if (!values.benefitedChildren) errors.benefitedChildren = "La cantidad de beneficiarios menores de 18 años es requerida";
        return errors;
    }


    const formik = useFormik({
        initialValues: {
            kpiInstances: formState.projectKpiInstances,
            benefitedPopulation: formState.projectBenefitedPopulation,
            benefitedChildren: formState.projectBenefitedChildren,
        },
        onSubmit: async (values) => {
            const project = {
                ...formState,
                projectKpiInstances: values.kpiInstances,
                projectBenefitedPopulation: +values.benefitedPopulation,
                projectBenefitedChildren: +values.benefitedChildren,
            }

            await createProject({
                name: project.projectName,
                initialDate: project.projectInitialDate,
                finalDate: project.projectFinalDate,
                observations: project.projectDescription,
                parrishId: project.projectParrishId,
                kpiInstances: project.projectKpiInstances,
                secretaryId: '',
                programId: '',
            })
            
        },

        validate
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card $isSelectable={false} $padding="32px">
                <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
                    <GridItem $colSpan={24}>
                        <h3 style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Metas del Proyecto</h3>
                    </GridItem>
                    <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <KpiBaseInput value={formik.values.kpiInstances} onChange={(value) => formik.setFieldValue('kpiInstances', value)} />
                    </GridItem>
                    <GridItem $colSpan={12}>
                        <FormControl label="Cantidad de beneficiarios" required error={formik.errors.benefitedPopulation && formik.touched.benefitedPopulation ? formik.errors.benefitedPopulation : undefined}>
                            <Input name="benefitedPopulation" placeholder="Cantidad de beneficiarios"
                                value={formik.values.benefitedPopulation} onChange={(e) => formik.setFieldValue("benefitedPopulation", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={12}>
                        <FormControl label="Cantidad de beneficiarios menores de 18 años" required error={formik.errors.benefitedChildren && formik.touched.benefitedChildren ? formik.errors.benefitedChildren : undefined}>
                            <Input name="benefitedChildren" placeholder="Cantidad de beneficiarios menores de 18 años"
                                value={formik.values.benefitedChildren} onChange={(e) => formik.setFieldValue("benefitedChildren", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Flex $direction="row" $justify="end" $gap="12px">
                    <Button $variant="primary" onClick={previousStep}>Atras</Button>
                    <Button $variant="primary" type="submit">Crear Proyecto</Button>
                </Flex>
            </Card>
        </form>
    )
}

export default KpiStep;