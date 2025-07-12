import { useFormik } from "formik";
import { Input } from "../Ui/Input/Input";
import { Grid, GridItem } from "../Layout/Grid";
import { SecretarySelect } from "../Prebuilt/SecretarySelect";
import { FormControl } from "../Ui/FormControl/FormControl";
import { Button } from "../Ui/Button/Button";
import { useAlert } from "../Ui/Alert/Alert";

export default function CreateProgramForm({ onSubmit, initialValues, isLoading }: CreateProgramFormProps) {

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values)
            show()
        }
    })

    const { show } = useAlert({
        variant: "success",
        title: "Programa creado correctamente",
        description: "El programa ha sido creado correctamente"
    })


    return <Grid columns="repeat(24, 1fr)" gap="12px" width="100%">
        <GridItem colSpan={24}>
            <FormControl label="Nombre del programa" required>
                <Input name="name" placeholder="Nombre del programa"
                    value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem colSpan={12}>
            <FormControl label="Secretaría territorial" required>
                <SecretarySelect rootOnly value={formik.values.parentId} onChange={(value) => formik.setFieldValue('parentId', value)} />
            </FormControl>
        </GridItem>
        <GridItem colSpan={12}>
            <FormControl label="Secretaría" required={false}>
                <SecretarySelect
                    parentId={formik.values.parentId}
                    value={formik.values.secretaryId}
                    onChange={(value) => formik.setFieldValue('secretaryId', value)} />
            </FormControl>
        </GridItem>
        <GridItem colSpan={24}>
            <Button type="submit" onClick={() => formik.handleSubmit()} variant="primary" disabled={!formik.isValid || isLoading}>Crear programa</Button>
        </GridItem>
    </Grid>
}

type CreateProgramFormValues = {
    name: string
    secretaryId: string
    parentId?: string
}

type CreateProgramFormProps = {
    onSubmit: (values: CreateProgramFormValues) => void
    initialValues: CreateProgramFormValues
    isLoading?: boolean
}