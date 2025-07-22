import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { Grid, GridItem } from "../../../components/Layout/Grid";
import { FormControl } from "../../../components/Ui/FormControl/FormControl";
import { Flex } from "../../../components/Layout/Flex";
import { Button } from "../../../components/Ui/Button/Button";

import { useAppStore } from "../../../store/store";
import MapCoordinateSelector from "../../../components/Prebuilt/MapCoordinateSelector";
import { Select } from "../../../components/Ui/Select/Select";
import useStepper from "../../../components/Stepper/useStepper";
import { useMunicipalities } from "../../../hooks/queries/useMunicipalities";
import { useParrishes } from "../../../hooks/queries/useParrishes";
import { useCommunityCircuitsByParish } from "../../../hooks/queries/useCommunityCircuitsByParish";

const UbicationForm = () => {
  const formik = useFormikContext<any>();
  const { nextStep, isFirstStep, previousStep } = useStepper();
  const { formState, setFormState } = useAppStore();

  // Persistencia en store
  const [municipalityId, setMunicipalityId] = useState(formState?.projectMunicipalityId || "");
  const [parrishId, setParrishId] = useState(formState?.projectParrishId || "");
  const [circuitId, setCircuitId] = useState(formState?.projectCommunityCircuitId || "");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(formState?.projectLatitude && formState?.projectLongitude ? { lat: formState.projectLatitude, lng: formState.projectLongitude } : undefined);

  // Consultas reales
  const { data: municipalities = [] } = useMunicipalities({});
  const { data: parrishes = [] } = useParrishes(municipalityId);
  const { data: circuitsRaw = [] } = useCommunityCircuitsByParish(parrishId);
  const circuits = circuitsRaw.map((c: any) => ({ value: c.id, label: c.name }));

  // Manejo de selects dependientes y persistencia
  useEffect(() => {
    setFormState({ ...formState, projectMunicipalityId: municipalityId, projectParrishId: "", projectCommunityCircuitId: "" });
    setParrishId("");
    setCircuitId("");
  }, [municipalityId]);

  useEffect(() => {
    setFormState({ ...formState, projectParrishId: parrishId, projectCommunityCircuitId: "" });
    setCircuitId("");
  }, [parrishId]);

  useEffect(() => {
    setFormState({ ...formState, projectCommunityCircuitId: circuitId });
  }, [circuitId]);

  useEffect(() => {
    if (coords) {
      setFormState({ ...formState, projectLatitude: coords.lat, projectLongitude: coords.lng });
    }
  }, [coords]);

  // Opciones para selects
  const municipalityOptions = municipalities.map((m: any) => ({ value: m.id, label: m.name }));
  const parrishOptions = parrishes.map((p: any) => ({ value: p.id, label: p.name }));
  // const circuitOptions = circuits.map((c: any) => ({ value: c.id, label: c.name })); // TODO

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        nextStep();
      }}
    >
      <Grid $columns="repeat(24, 1fr)" $gap="12px">
        <GridItem $colSpan={24}>
          <FormControl label="Municipio" required>
            <Select
              options={municipalityOptions}
              value={municipalityId}
              onChange={setMunicipalityId}
              placeholder="Seleccione un municipio"
            />
          </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
          <FormControl label="Parroquia" required>
            <fieldset disabled={!municipalityId} style={{ margin: 0, padding: 0, border: 0 }}>
              <Select
                options={parrishOptions}
                value={parrishId}
                onChange={setParrishId}
                placeholder="Seleccione una parroquia"
              />
            </fieldset>
          </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
          <FormControl label="Circuito Comunal" required>
            <fieldset disabled={!parrishId} style={{ margin: 0, padding: 0, border: 0 }}>
              <Select
                options={circuits}
                value={circuitId}
                onChange={setCircuitId}
                placeholder="Seleccione un circuito comunal"
              />
            </fieldset>
          </FormControl>
        </GridItem>
        <GridItem $colSpan={24}>
          <FormControl label="Geolocalización" required>
            <MapCoordinateSelector
              value={coords}
              onChange={(value) => {
                setCoords(value);
                formik.setFieldValue("coords", value);
              }}
              height={220}
            />
          </FormControl>
        </GridItem>
        <Flex $direction="row" $justify="end" $gap="12px">
          <Button $variant="primary" disabled={isFirstStep} onClick={previousStep} type="button">
            Atrás
          </Button>
          <Button $variant="primary" type="submit">
            Siguiente
          </Button>
        </Flex>
      </Grid>
    </form>
  );
};

export default UbicationForm;
