import FilterToolACA from "../../components/Prebuilt/FilterToolACA";
import Header from "../../components/Header/Header";
import CardIndicatorACA from "../../components/Prebuilt/CardIndicatorACA";
import { Grid } from "../../components/Layout/Grid";
import { Flex } from "../../components/Layout/Flex";
import transformations from "../../../transformations.json";
import { useAcaProjectsByFilter } from "../../hooks/queries/useAcaProjectsByFilter";
import { useAppStore } from "../../store/store";

const IndicatorsView = () => {
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
        {transformations.map((transformation, index) => {
          const projectsAca = filteredData.reduce(
            (acc, project) => {
              if (
                transformation.areas.some((area) => area.id === project.areaId)
              ) {
                acc.total++;
                let count = project.projectCount || 0;

                acc.projects = acc.projects + count;
              }
              return acc;
            },
            { total: 0, projects: 0 }
          );

          return (
            <CardIndicatorACA
              key={`transformation-${index}`}
              to={`/indicadoresACA/${transformation.id}`}
              title={transformation.id}
              count={projectsAca.total}
              progress={
                projectsAca.total === 0
                  ? 0
                  : (projectsAca.projects * 100) / projectsAca.total
              }
              info={transformation.transformation}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export default IndicatorsView;
