import { useFormik } from "formik";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";
import { Input } from "../../../components/Ui/Input/Input";
import { useAppStore } from "../../../store/store";
import MapCoordinateSelector from "../../../components/Prebuilt/MapCoordinateSelector";
import useStepper from "../../../components/Stepper/useStepper";
import Card from "../../../components/Card/Card";
import { MunicipalitySelect } from "../../../components/Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../../../components/Prebuilt/ParrishSelect";
import { CommunitySelect } from "../../../components/Prebuilt/CommunitySelect";
import { AcaProjectsSelect } from "../../../components/Prebuilt/AcaProjectsSelect";
import Text from "../../../components/Ui/Text/Text";
import Switch from "../../../components/Ui/Switch/Switch";
import { useState, useEffect } from "react";
import * as utm from "utm";
import { CommunityCircuitCodeSelect } from "../../../components/Prebuilt/CommunityCircuitCodeSelect";

const LocationStep = () => {
  const { nextStep, previousStep } = useStepper();
  const { formState, setFormState } = useAppStore();
  const [isUtm, setIsUtm] = useState(false);
  const [north, setNorth] = useState<number | string>("");
  const [east, setEast] = useState<number | string>("");

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.municipalityId)
      errors.municipalityId = "El municipio es requerido";
    if (!values.parrishId) errors.parrishId = "La parroquia es requerida";
    if (!values.circuitCode) errors.circuitCode = "El circuito comunal es requerido";
    if (!values.coords.lat) errors.coords.lat = "La latitud es requerida";
    if (!values.coords.lng) errors.coords.lng = "La longitud es requerida";
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      municipalityId: formState.projectMunicipalityId,
      parrishId: formState.projectParrishId,
      circuitCode: formState.projectCommunityCircuitCode,
      communityId: formState.projectCommunityId || "",
      acaProjectId: formState.projectAcaProjectId || "",
      coords: {
        lat: formState.projectLatitude,
        lng: formState.projectLongitude,
      },
    },
    onSubmit: (values) => {
      setFormState({
        ...formState,
        projectMunicipalityId: values.municipalityId,
        projectParrishId: values.parrishId,
        projectCommunityCircuitCode: values.circuitCode,
        projectCommunityId: values.communityId,
        projectLatitude: values.coords.lat,
        projectLongitude: values.coords.lng,
      });
      nextStep();
    },
    validate,
  });

  useEffect(() => {
    if (formik.values.coords.lat && formik.values.coords.lng) {
      const { easting, northing } = utm.fromLatLon(
        formik.values.coords.lat,
        formik.values.coords.lng
      );
      setEast(easting);
      setNorth(northing);
    }
  }, [formik.values.coords.lat, formik.values.coords.lng]);

  const handleNorthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const northValue = e.target.value;
    setNorth(northValue);
    if (east) {
      const { latitude, longitude } = utm.toLatLon(
        Number(east),
        Number(northValue),
        19,
        "N"
      );
      formik.setFieldValue("coords.lat", latitude);
      formik.setFieldValue("coords.lng", longitude);
    }
  };

  const handleEastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eastValue = e.target.value;
    setEast(eastValue);
    if (north) {
      const { latitude, longitude } = utm.toLatLon(
        Number(eastValue),
        Number(north),
        19,
        "N"
      );
      formik.setFieldValue("coords.lat", latitude);
      formik.setFieldValue("coords.lng", longitude);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card $isSelectable={false} $padding="32px">
        <Grid $columns="repeat(24, 1fr)" $gap="12px">
          <GridItem $colSpan={24}>
            <Text $fontSize="14px" $color="#2d2d2d">
              Ubicación del Proyecto
            </Text>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl
              label="Municipio"
              required
              error={
                formik.errors.municipalityId && formik.touched.municipalityId
                  ? formik.errors.municipalityId
                  : undefined
              }
            >
              <MunicipalitySelect
                value={formik.values.municipalityId}
                onChange={(value) => {
                  formik.setFieldValue("municipalityId", value);
                  formik.setFieldValue("parrishId", "");
                  formik.setFieldValue("circuitId", "");
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl
              label="Parroquia"
              required
              error={
                formik.errors.parrishId && formik.touched.parrishId
                  ? formik.errors.parrishId
                  : undefined
              }
            >
              <ParrishSelect
                value={formik.values.parrishId}
                onChange={(value) => {
                  formik.setFieldValue("parrishId", value);
                  formik.setFieldValue("circuitId", "");
                }}
                municipalityId={formik.values.municipalityId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl
              label="Circuito Comunal"
              required
              error={
                formik.errors.circuitCode && formik.touched.circuitCode
                  ? formik.errors.circuitCode
                  : undefined
              }
            >
              <CommunityCircuitCodeSelect
                value={formik.values.circuitCode}
                onChange={(value) => {
                  formik.setFieldValue("circuitCode", value);
                  formik.setFieldValue("communityId", ""); // Reset community when circuit changes
                }}
                parishId={formik.values.parrishId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl label="Comunidad" required={true}>
              <CommunitySelect
                value={formik.values.communityId}
                onChange={(value) => formik.setFieldValue("communityId", value)}
                circuitCode={formik.values.circuitCode}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <FormControl label="Proyecto ACA">
              <AcaProjectsSelect
                value={formik.values.acaProjectId}
                onChange={(value) =>
                  formik.setFieldValue("acaProjectId", value)
                }
                areaId={formState.projectAreaId}
                municipalityId={formik.values.municipalityId}
                communityCircuitId={formik.values.circuitCode}
                sectorId={formik.values.communityId}
                parrishId={formik.values.parrishId}
              />
            </FormControl>
          </GridItem>
          <GridItem $colSpan={24}>
            <Switch
              checked={isUtm}
              onChange={() => setIsUtm(!isUtm)}
              label="Usar coordenadas UTM"
            />
          </GridItem>
          {isUtm ? (
            <>
              <GridItem $colSpan={12}>
                <FormControl label="Norte" required>
                  <Input
                    name="norte"
                    placeholder="Norte"
                    value={north}
                    onChange={handleNorthChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem $colSpan={12}>
                <FormControl label="Este" required>
                  <Input
                    name="este"
                    placeholder="Este"
                    value={east}
                    onChange={handleEastChange}
                  />
                </FormControl>
              </GridItem>
            </>
          ) : (
            <>
              <GridItem $colSpan={12}>
                <FormControl
                  label="Latitud"
                  required
                  error={
                    formik.errors.coords?.lat && formik.touched.coords?.lat
                      ? formik.errors.coords.lat
                      : undefined
                  }
                >
                  <Input
                    name="name"
                    placeholder="Latitud"
                    value={formik.values.coords.lat}
                    onChange={(e) =>
                      formik.setFieldValue("coords.lat", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
              </GridItem>
              <GridItem $colSpan={12}>
                <FormControl
                  label="Longitud"
                  required
                  error={
                    formik.errors.coords?.lng && formik.touched.coords?.lng
                      ? formik.errors.coords?.lng
                      : undefined
                  }
                >
                  <Input
                    name="name"
                    placeholder="Longitud"
                    value={formik.values.coords.lng}
                    onChange={(e) =>
                      formik.setFieldValue("coords.lng", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
              </GridItem>
            </>
          )}
          <GridItem $colSpan={24}>
            <FormControl
              label="Geolocalización"
              required
              error={
                formik.errors.coords && formik.touched.coords
                  ? formik.errors.coords.lat || formik.errors.coords.lng
                    ? "La geolocalización es requerida"
                    : undefined
                  : undefined
              }
            >
              <MapCoordinateSelector
                value={formik.values.coords}
                municipalityId={formik.values.municipalityId}
                parrishId={formik.values.parrishId}
                circuitCode={formik.values.circuitCode}
                onChange={(value) => {
                  formik.setFieldValue("coords", value);
                }}
                height={220}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Flex $direction="row" $justify="space-between" $gap="12px">
          <Button $variant="primary" onClick={previousStep} type="button">
            Anterior
          </Button>
          <Button $variant="primary" type="submit">
            Siguiente
          </Button>
        </Flex>
      </Card>
    </form>
  );
};

export default LocationStep;
