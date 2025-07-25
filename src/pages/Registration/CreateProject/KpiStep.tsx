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
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { getFloatValue } from "../../../components/Prebuilt/CurrencyInput"

const KpiStep = () => {
    const navigate = useNavigate();

    const { previousStep, resetStepper } = useStepper()
    const { formState, resetFormState } = useAppStore()
    const { mutateAsync: createProject } = useCreateProject()

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.kpiInstances || values.kpiInstances.length === 0) errors.kpiInstances = "Debe agregar al menos una meta al proyecto";
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
                projectBudget: getFloatValue(formState.projectBudget),
                projectDirectLabor: getFloatValue(formState.projectDirectLabor),
                projectIndirectLabor: getFloatValue(formState.projectIndirectLabor),
                projectQualifiedLabor: getFloatValue(formState.projectQualifiedLabor),
                projectUnqualifiedLabor: getFloatValue(formState.projectUnqualifiedLabor),
                projectFemaleLabor: getFloatValue(formState.projectFemaleLabor),
                projectMaleLabor: getFloatValue(formState.projectMaleLabor),
                projectKpiInstances: values.kpiInstances,
                projectBenefitedPopulation: +values.benefitedPopulation,
                projectBenefitedChildren: +values.benefitedChildren,
            }

            console.log(project)

            const result = await createProject({
                name: project.projectName,
                initialDate: project.projectInitialDate,
                finalDate: project.projectFinalDate,
                observations: project.projectDescription,
                parishId: project.projectParrishId,
                kpiInstances: project.projectKpiInstances,
                secretaryId: project.projectSecretaryId,
                programId: project.projectProgramId,
                communityCircuitId: project.projectCommunityCircuitId,
                areaId: project.projectAreaId,
                directLabor: project.projectDirectLabor,
                indirectLabor: project.projectIndirectLabor,
                qualifiedLabor: project.projectQualifiedLabor,
                unqualifiedLabor: project.projectUnqualifiedLabor,
                femaleLabor: project.projectFemaleLabor,
                maleLabor: project.projectMaleLabor,
                benefitedPopulation: project.projectBenefitedPopulation,
                benefitedChildren: project.projectBenefitedChildren,
                initialBudget: project.projectBudget,
                latitude: project.projectLatitude,
                longitude: project.projectLongitude,
            })

            resetFormState()
            resetStepper()

            Swal.fire({
                title: 'Proyecto creado',
                text: 'El proyecto se ha creado correctamente',
                icon: 'success',
            }).then(() => {
                // Navegar al detalle usando el id real si existe en result, si no simular con 1
                const projectId = result?.id || 1;
                navigate(`/registro/detalle-proyecto/${projectId}`);
            });

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
                    <GridItem $colSpan={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                        <KpiBaseInput value={formik.values.kpiInstances} onChange={(value) => formik.setFieldValue('kpiInstances', value)} />
                        {formik.errors.kpiInstances && formik.touched.kpiInstances && typeof formik.errors.kpiInstances === 'string' && <p style={{ color: "red" }}>{formik.errors.kpiInstances}</p>}
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
                <Flex $direction="row" $justify="space-between" $gap="12px">
                    <Button $variant="primary" onClick={previousStep}>Anterior</Button>
                    <Button $variant="primary" type="submit" $disabled={formik.isSubmitting}>Crear Proyecto</Button>
                </Flex>
            </Card>
        </form>
    )
}

export default KpiStep;