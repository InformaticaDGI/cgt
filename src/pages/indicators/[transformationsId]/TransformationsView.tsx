import FilterToolACA from "../../../components/Prebuilt/FilterToolACA";
import Header from "../../../components/Header/Header";
import CardIndicatorACA from "../../../components/Prebuilt/CardIndicatorACA";
import { Grid } from "../../../components/Layout/Grid";
import { Flex } from "../../../components/Layout/Flex";
import transformations from "../../../../transformations.json";
import { useAcaProjectsByFilter } from "../../../hooks/queries/useAcaProjectsByFilter";
import { useParams } from "react-router";
import { useAppStore } from "../../../store/store";

const TransformationsView = () => {
  const { transformationsId } = useParams();
  const store = useAppStore();
  const { data } = useAcaProjectsByFilter({
    territorialSecretaryId: store.secretarialTerritoryId,
    municipalityId: store.municipalityId,
    sectorId: store.circuitId,
    all: true,
  });
  const filteredData = data?.data || [];

  return (
    <Flex
      $direction="column"
      $gap="12px"
      $padding="1rem"
      $align="stretch"
      style={{ width: "85vw", position: "relative" }}
    >
      <Header />
      <FilterToolACA />
      <Grid>
        {transformations
          .find((transformation) => transformation.id === transformationsId)
          ?.areas.map((area, index) => {
            const projectsAca = filteredData.reduce((acc, project) => {
              if (area.id === project.areaId) {
                acc++;
              }
              return acc;
            }, 0);

            return (
              <CardIndicatorACA
                key={`area-${area.id}` + index}
                title={area.name}
                count={projectsAca}
                progress={(projectsAca * 100) / 50}
                info={
                  transformations.find(
                    (transformation) => transformation.id === transformationsId
                  )?.transformation
                }
              />
            );
          })}
      </Grid>
    </Flex>
  );
};

export default TransformationsView;
