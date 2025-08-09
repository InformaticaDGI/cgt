import { useFormik } from "formik";
import { Input } from "../Ui/Input/Input";
import { Grid, GridItem } from "../Layout/Grid";
import { FormControl } from "../Ui/FormControl/FormControl";
import { Button } from "../Ui/Button/Button";

export default function CreateContactForm({ onSubmit, initialValues, isLoading }: CreateContactFormProps) {

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values)
        }
    })

    return <Grid $columns="repeat(24, 1fr)" $gap="12px" $width="100%">
        <GridItem $colSpan={24} $colSpanSm={24}>
            <h3 style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Información del contacto</h3>
        </GridItem>
        <GridItem $colSpan={24}>
            <FormControl label="Nombre del contacto" required>
                <Input name="name" placeholder="Nombre del contacto"
                    value={formik.values.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Email" required={false}>
                <Input name="email" type="email" placeholder="Email"
                    value={formik.values.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={12} $colSpanSm={24}>
            <FormControl label="Teléfono" required={false}>
                <Input name="phone" type="tel" placeholder="Teléfono"
                    value={formik.values.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('phone', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24} $colSpanSm={24}>
            <FormControl label="Cargo que ocupa" required={false}>
                <Input name="position" placeholder=""
                    value={formik.values.position} onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('position', e.target.value)}
                    onBlur={formik.handleBlur}
                />
            </FormControl>
        </GridItem>
        <GridItem $colSpan={24} style={{ display: 'flex', justifyContent: 'center', paddingTop: "12px" }}>
            <Button $size="large" type="submit" onClick={() => formik.handleSubmit()} $variant="primary" disabled={!formik.isValid || isLoading}>Crear contacto</Button>
        </GridItem>
    </Grid>
}

export type CreateContactFormValues = {
    name: string
    email: string
    phone: string
    position: string
}

type CreateContactFormProps = {
    onSubmit: (values: CreateContactFormValues) => void
    initialValues: CreateContactFormValues
    isLoading?: boolean
}