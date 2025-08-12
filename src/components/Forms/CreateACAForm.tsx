import { useFormik, type FormikHelpers } from "formik";
import { Input } from "../Ui/Input/Input";
import { Grid, GridItem } from "../Layout/Grid";
import { FormControl } from "../Ui/FormControl/FormControl";
import { Button } from "../Ui/Button/Button";
import { AreaSelect } from "../Prebuilt/AreaSelect";
import { CommunityCircuitSelect } from "../Prebuilt/CommunityCircuit";
import { CommunitySelect } from "../Prebuilt/CommunitySelect";
import { ContactMultiSelect } from "../Prebuilt/ContactMultiSelect";
import { MunicipalityMultiSelect } from "../Prebuilt/MunicipalityMultiSelect";
import { TransformationSelect } from "../Prebuilt/TransformationSelect";

export default function CreateACAForm({ onSubmit, initialValues, isLoading }: CreateACAFormProps) {

    const formik = useFormik({
        initialValues,
        onSubmit: (values, helpers) => {
            onSubmit(values, helpers)
        }
    })

    return <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
        <GridItem $colSpan={24} $colSpanSm={24}>
            <h3 style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Información del ACA</h3>
        </GridItem>
        <GridItem $colSpan={24}>
            <FormControl label="Nombre de la necesidad" required>
                <Input $size="medium" name="name" placeholder="Nombre de la necesidad"
                    value={formik.values.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Transformación" required={false}>
                <TransformationSelect onChange={(e: any) => formik.setFieldValue('transformationId', e)} value={formik.values.transformationId} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Area" required={false}>
                <AreaSelect transformationId={formik.values.transformationId} onChange={(e: any) => formik.setFieldValue('areaId', e)} value={formik.values.areaId} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24} $colSpanSm={24}>
            <FormControl label="Municipio" required={false}>
                <MunicipalityMultiSelect onChange={(e) => formik.setFieldValue('municipalityId', e)} value={formik.values.municipalityId} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Circuito" required={false}>
                <CommunityCircuitSelect municipalityId={formik.values.municipalityId} value={formik.values.communityCircuit?.id || ''} onChange={(e) => formik.setFieldValue('communityCircuit', e)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Comunidad" required={false}>
                <CommunitySelect circuitCode={formik.values.communityCircuit?.code || ''} value={formik.values.sectorId || ''} onChange={(e) => formik.setFieldValue('sectorId', e)} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Contactos" required={false}>
                <ContactMultiSelect onChange={(e: any) => formik.setFieldValue('contacts', e)} value={formik.values.contacts || []} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Potencial" required={false}>
                <Input $size="medium" placeholder="Potencial" onChange={(e) => formik.setFieldValue('potential', e.target.value)} value={formik.values.potential} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={8} $colSpanSm={24}>
            <FormControl label="Aspectos Criticos" required={false}>
                <Input $size="medium" placeholder="Aspectos Criticos" onChange={(e) => formik.setFieldValue('criticalAspects', e.target.value)} value={formik.values.criticalAspects} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={8} $colSpanSm={24}>
            <FormControl label="Recursos Estimados" required={false}>
                <Input $size="medium" placeholder="Recursos Estimados" onChange={(e) => formik.setFieldValue('estimatedBudget', e.target.value)} value={formik.values.estimatedBudget} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={8} $colSpanSm={24}>
            <FormControl label="Duración Estimada" required={false}>
                <Input $size="medium" placeholder="Duración Estimada" onChange={(e) => formik.setFieldValue('estimatedDuration', e.target.value)} value={formik.values.estimatedDuration} />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center', paddingTop: "12px" }}>
            <Button $size="large" type="submit" onClick={() => formik.handleSubmit()} $variant="primary" disabled={!formik.isValid || isLoading}>Crear ACA</Button>
        </GridItem>
    </Grid>
}

export type CreateACAFormValues = {
    name: string
    transformationId: string
    areaId: string
    municipalityId: string[]
    contacts: string[]
    potential?: string
    criticalAspects?: string
    estimatedBudget?: string
    estimatedDuration?: string
    communityCircuit?: { id: string, code: string }
    sectorId?: string
}

type CreateACAFormProps = {
    onSubmit: (values: CreateACAFormValues, helpers: FormikHelpers<CreateACAFormValues>) => void
    initialValues: CreateACAFormValues
    isLoading?: boolean
}