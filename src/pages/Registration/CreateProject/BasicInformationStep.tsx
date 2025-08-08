import Card from "../../../components/Card/Card"
import { Button } from "../../../components/Ui/Button/Button"
import useStepper from "../../../components/Stepper/useStepper"
import { Flex } from "../../../components/Layout/Flex"
import { Grid, GridItem } from "../../../components/Layout/Grid"
import { FormControl } from "../../../components/Ui/FormControl/FormControl"
import { Input } from "../../../components/Ui/Input/Input"
import { $TextArea } from "../../../components/Ui/TextArea/TextArea"
import { AreaMultiSelect } from "../../../components/Prebuilt/AreaMultiSelect"
import { useFormik } from "formik"
import { useAppStore } from "../../../store/store"
import { SecretarySelect } from "../../../components/Prebuilt/SecretarySelect"
import { ProgramSelect } from "../../../components/Prebuilt/ProgramSelect"

const BasicInformation = () => {

    const { nextStep } = useStepper()
    const { formState, setFormState } = useAppStore()


    const validate = (values: any) => {
        const errors: any = {};
        if (!values.name) errors.name = "El nombre es requerido";
        if (!values.initialDate) errors.initialDate = "La fecha de inicio es requerida";
        if (!values.finalDate) errors.finalDate = "La fecha de fin es requerida";
        if (values.initialDate > values.finalDate) errors.finalDate = "La fecha de fin debe ser mayor o igual a la fecha de inicio";
        if (!values.areaId || values.areaId.length === 0) errors.areaId = "El área es requerida";
        if (!values.description) errors.description = "La descripción es requerida";
        if (!values.parentId) errors.parentId = "La secretaría territorial es requerida";
        if (!values.secretaryId) errors.secretaryId = "La secretaría es requerida";
        if (!values.programId) errors.programId = "El programa es requerido";
        return errors;
    }


    const formik = useFormik({
        initialValues: {
            name: formState.projectName,
            initialDate: formState.projectInitialDate,
            finalDate: formState.projectFinalDate,
            areaId: formState.projectAreaId || [],
            description: formState.projectDescription,
            parentId: formState.projectParentId,
            secretaryId: formState.projectSecretaryId,
            programId: formState.projectProgramId,
        },
        onSubmit: (values) => {
            setFormState({
                ...formState,
                projectName: values.name,
                projectInitialDate: values.initialDate,
                projectFinalDate: values.finalDate,
                projectAreaId: values.areaId,
                projectDescription: values.description,
                projectParentId: values.parentId,
                projectSecretaryId: values.secretaryId,
                projectProgramId: values.programId,
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
                        <h3 style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Información Básica</h3>
                    </GridItem>

                    <GridItem $colSpan={12}>
                        <FormControl label="Secretaría territorial" required error={formik.errors.parentId && formik.touched.parentId ? formik.errors.parentId : undefined}>
                            <SecretarySelect rootOnly value={formik.values.parentId} onChange={(value) => formik.setFieldValue('parentId', value)} />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={12}>
                        <FormControl label="Secretaría" required error={formik.errors.secretaryId && formik.touched.secretaryId ? formik.errors.secretaryId : undefined}>
                            <SecretarySelect parentId={formik.values.parentId} value={formik.values.secretaryId} onChange={(value) => formik.setFieldValue('secretaryId', value)} />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={24}>
                        <FormControl label="Programa" required error={formik.errors.programId && formik.touched.programId ? formik.errors.programId : undefined}>
                            <ProgramSelect
                                secretaryId={formik.values.secretaryId}
                                value={formik.values.programId}
                                onChange={(value) => formik.setFieldValue('programId', value)} />
                        </FormControl>
                    </GridItem>

                    <GridItem $colSpan={24}>
                        <FormControl label="Nombre del proyecto" required error={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}>
                            <Input name="name" placeholder="Nombre del proyecto"
                                value={formik.values.name} onChange={(e) => formik.setFieldValue("name", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={12}>
                        <FormControl label="Fecha de inicio" required error={formik.errors.initialDate && formik.touched.initialDate ? formik.errors.initialDate : undefined}>
                            <Input type="date" name="initialDate" placeholder="Fecha de inicio"
                                value={formik.values.initialDate} onChange={(e) => formik.setFieldValue("initialDate", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={12}>
                        <FormControl label="Fecha de fin" required error={formik.errors.finalDate && formik.touched.finalDate ? formik.errors.finalDate : undefined}>
                            <Input type="date" name="finalDate" placeholder="Fecha de fin"
                                value={formik.values.finalDate} onChange={(e) => formik.setFieldValue("finalDate", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl label="Area" error={formik.errors.areaId && formik.touched.areaId ? formik.errors.areaId as string : undefined}>
                            <AreaMultiSelect value={formik.values.areaId} onChange={(value) => formik.setFieldValue("areaId", value)} />
                        </FormControl>
                    </GridItem>
                    <GridItem $colSpan={24}>
                        <FormControl label="Descripción" error={formik.errors.description && formik.touched.description ? formik.errors.description : undefined}>
                            <$TextArea name="description" placeholder="Descripción"
                                value={formik.values.description} onChange={(e) => formik.setFieldValue("description", e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Flex $direction="row" $justify="end" $gap="12px">
                    <Button $variant="primary" type="submit">Siguiente</Button>
                </Flex>
            </Card>
        </form>
    )
}

export default BasicInformation;