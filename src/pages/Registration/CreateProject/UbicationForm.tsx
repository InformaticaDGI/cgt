import { useFormik } from "formik";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";
import { useAppStore } from "../../../store/store";
import MapCoordinateSelector from "../../../components/Prebuilt/MapCoordinateSelector";
import useStepper from "../../../components/Stepper/useStepper";
import Card from "../../../components/Card/Card";
import { MunicipalitySelect } from "../../../components/Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../../../components/Prebuilt/ParrishSelect";
import { CommunityCircuitSelect } from "../../../components/Prebuilt/CommunityCircuit";

const UbicationForm = () => {
  const { nextStep, isFirstStep, previousStep } = useStepper();
  const { formState, setFormState } = useAppStore();

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.municipalityId) errors.municipalityId = "El municipio es requerido";
    if (!values.parrishId) errors.parrishId = "La parroquia es requerida";
    if (!values.circuitId) errors.circuitId = "El circuito comunal es requerido";
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      municipalityId: formState.projectMunicipalityId,
      parrishId: formState.projectParrishId,
      circuitId: formState.projectCommunityCircuitId,
      coords: { lat: formState.projectLatitude, lng: formState.projectLongitude }
    },
    onSubmit: (values) => {
      setFormState({
        ...formState,
        projectMunicipalityId: values.municipalityId,
        projectParrishId: values.parrishId,
        projectCommunityCircuitId: values.circuitId,
        projectLatitude: values.coords.lat,
        projectLongitude: values.coords.lng
      })
      nextStep()
    },
    validate
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card $isSelectable={false} $padding="32px">
        <Grid $columns="repeat(24, 1fr)" $gap="12px">
          <GridItem $colSpan={24}>
            <FormControl label="Municipio" required error={formik.errors.municipalityId && formik.touched.municipalityId ? formik.errors.municipalityId : undefined}>
              <MunicipalitySelect value={formik.values.municipalityId} onChange={(value) => formik.setFieldValue('municipalityId', value)} />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl label="Parroquia" required error={formik.errors.parrishId && formik.touched.parrishId ? formik.errors.parrishId : undefined}>
              <ParrishSelect
                value={formik.values.parrishId}
                onChange={(value) => formik.setFieldValue('parrishId', value)}
                municipalityId={formik.values.municipalityId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl label="Circuito Comunal" required error={formik.errors.circuitId && formik.touched.circuitId ? formik.errors.circuitId : undefined}>
              <CommunityCircuitSelect
                value={formik.values.circuitId}
                onChange={(value) => formik.setFieldValue('circuitId', value)}
                parishId={formik.values.parrishId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl label="Geolocalización" required error={formik.errors.coords && formik.touched.coords ? formik.errors.coords.lat || formik.errors.coords.lng ? "La geolocalización es requerida" : undefined : undefined}>
              <MapCoordinateSelector
                value={formik.values.coords}
                onChange={(value) => {
                  formik.setFieldValue("coords", value);
                }}
                height={220}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Flex $direction="row" $justify="end" $gap="12px">
          <Button $variant="primary" disabled={isFirstStep} onClick={previousStep} type="button">
            Atrás
          </Button>
          <Button $variant="primary" type="submit">
            Siguiente
          </Button>
        </Flex>
      </Card>
    </form>
  );
};

export default UbicationForm;
