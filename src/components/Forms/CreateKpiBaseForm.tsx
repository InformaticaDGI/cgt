import { Grid, GridItem } from "../Layout/Grid"
import { FormControl } from "../Ui/FormControl/FormControl"
import { Input } from "../Ui/Input/Input"
import { useFormik } from "formik"
import { Button } from "../Ui/Button/Button"
import { SearchMeasurementUnit } from "../Prebuilt/SearchMeasurementUnit"
import { AreaSelect } from "../Prebuilt/AreaSelect"

export const CreateKpiBaseForm = ({ onSubmit, initialValues }: CreateKpiBaseFormProps) => {

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values)
        }
    })

    return <Grid columns="repeat(24, 1fr)" gap="12px" width="100%">
        <GridItem colSpan={24}>
            <FormControl label="Nombre de la meta" required>
                <Input type="text" placeholder="Nombre" value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)} />
            </FormControl>
        </GridItem>
        <GridItem colSpan={24}>
            <FormControl label="Unidad de medida" required>
                <SearchMeasurementUnit onChange={(value) => formik.setFieldValue('measurementUnitId', value)} />
            </FormControl>
        </GridItem>
        <GridItem colSpan={24}> 
            <FormControl label="Área de aplicación" required>
                <AreaSelect value={formik.values.areaId} onChange={(value) => formik.setFieldValue('areaId', value)} />
            </FormControl>
        </GridItem>
        <GridItem colSpan={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="primary" onClick={() => formik.handleSubmit()}>Crear meta</Button>
        </GridItem>
    </Grid>
}

export type CreateKpiBaseFormValues = {
    name: string
    measurementUnitId: string
    areaId: string
}

type CreateKpiBaseFormProps = {
    onSubmit: (values: CreateKpiBaseFormValues) => void
    initialValues: CreateKpiBaseFormValues
}