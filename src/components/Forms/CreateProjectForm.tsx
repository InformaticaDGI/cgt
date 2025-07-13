import { useFormik } from "formik";
import { $Input } from "../Ui/Input/Input";
import { Grid, GridItem } from "../Layout/Grid";
import { SecretarySelect } from "../Prebuilt/SecretarySelect";
import { FormControl } from "../Ui/FormControl/FormControl";
import { $Button } from "../Ui/Button/Button";
import { ProgramSelect } from "../Prebuilt/ProgramSelect";
import { $TextArea } from "../Ui/TextArea/TextArea";
import { MunicipalitySelect } from "../Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../Prebuilt/ParrishSelect";
import { KpiBaseInput } from "../Prebuilt/KpiBaseInput";

export default function CreateProjectForm({ onSubmit, initialValues, isLoading }: CreateProjectFormProps) {

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values)
        }
    })

    return <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
        <GridItem $colSpan={12}>
            <FormControl label="Secretaría territorial" required>
                <SecretarySelect rootOnly value={formik.values.parentId} onChange={(value) => formik.setFieldValue('parentId', value)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
            <FormControl label="Secretaría" required>
                <SecretarySelect parentId={formik.values.parentId} value={formik.values.secretaryId} onChange={(value) => formik.setFieldValue('secretaryId', value)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
            <FormControl label="Programa" required={false}>
                <ProgramSelect
                    secretaryId={formik.values.secretaryId}
                    value={formik.values.programId}
                    onChange={(value) => formik.setFieldValue('programId', value)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
            <FormControl label="Nombre del proyecto" required>
                <$Input name="name" placeholder="Nombre del proyecto"
                    value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
            <FormControl label="Municipio" required>
                <MunicipalitySelect value={formik.values.municipalityId} onChange={(value) => formik.setFieldValue('municipalityId', value)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
            <FormControl label="Parroquia" required>
                <ParrishSelect
                    value={formik.values.parrishId}
                    onChange={(value) => formik.setFieldValue('parrishId', value)}
                    municipalityId={formik.values.municipalityId}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
            <FormControl label="Fecha de inicio" required>
                <$Input type="date" name="initialDate" placeholder="Fecha de inicio"
                    value={formik.values.initialDate} onChange={(e) => formik.setFieldValue('initialDate', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12}>
            <FormControl label="Fecha de fin" required>
                <$Input type="date" name="endDate" placeholder="Fecha de fin"
                    value={formik.values.endDate} onChange={(e) => formik.setFieldValue('endDate', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
            <FormControl label="Descripción">
                <$TextArea name="observations" placeholder="Descripción"
                    value={formik.values.observations} onChange={(e) => formik.setFieldValue('observations', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <KpiBaseInput value={formik.values.kpiBaseId} onChange={(value) => formik.setFieldValue('kpiBaseId', value)} />
        </GridItem>
        <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <$Button type="submit" onClick={() => formik.handleSubmit()} variant="primary" disabled={!formik.isValid || isLoading}>Crear proyecto</$Button>
        </GridItem>
    </Grid>
}

type CreateProjectFormValues = {
    name: string
    secretaryId: string
    programId: string
    parentId?: string
    initialDate: string
    endDate: string
    observations: string
    municipalityId: string
    parrishId: string
    kpiBaseId: string[]
}

type CreateProjectFormProps = {
    onSubmit: (values: CreateProjectFormValues) => void
    initialValues: CreateProjectFormValues
    isLoading?: boolean
}