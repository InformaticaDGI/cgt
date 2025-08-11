import styled from "styled-components";
import { Filter, FilterContainer } from "../Filter/Filter";
import FilterHeader from "../Filter/FilterHeader";
import {
  FunnelPlus,
  Map,
  MapPin,
  MapPinned,
  Building,
  Layers,
  Users,
} from "lucide-react";
import { useAppStore } from "../../store/store";
import { SecretarySelect } from "./SecretarySelect";
import { TerritorialSecreatarySelect } from "./TerritorialSecretarySelect";
import { MunicipalitySelect } from "./MunicipalitySelect";
import { ParrishSelect } from "./ParrishSelect";
import { Flex } from "../Layout/Flex";
import LocateToMap from "./LocateToMap";
import { useLocation } from "react-router";
import { CommunityCircuitSelect } from "./CommunityCircuitSelect";

const FilterTool = () => {
  const store = useAppStore();

  const pathname = useLocation();

  return (
    <FilterToolCard>
      <Flex
        $direction="row"
        $justify="space-between"
        $align="center"
        $gap="8px"
      >
        <FilterHeader
          icon={<FunnelPlus color="white" height={"20px"} width={"20px"} />}
          fill="linear-gradient(180deg, #20B2AA 0%, #008080 100%)"
          onClick={() => store.setOpenFilter(!store.openFilter)}
        >
          Filtrar:
        </FilterHeader>
        {!pathname.pathname.includes("mapa") && <LocateToMap />}
      </Flex>
      <Container isOpen={store.openFilter}>
        <Filter style={{ gridColumn: "span 3" }}>
          <FilterContainer>
            <FilterHeader
              icon={<Layers color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg,  #e94c6f 0%, #a72d73 100%)"
            >
              Transformaciones
            </FilterHeader>
            <SecretarySelect
              rootOnly
              onChange={(secretaryRootId) =>
                store.setSecretaryRootId(secretaryRootId)
              }
              value={store.secretaryRootId}
            />
          </FilterContainer>
        </Filter>
        <Filter style={{ gridColumn: "span 3" }}>
          <FilterContainer>
            <FilterHeader
              icon={<Building color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg, #D3CCFF 0%, #483D8B 100%)"
            >
              Dependencia
            </FilterHeader>
            <SecretarySelect
              parentId={store.secretaryRootId}
              onChange={(secretaryParentId) =>
                store.setSecretaryParentId(secretaryParentId)
              }
              value={store.secretaryParentId}
            />
          </FilterContainer>
        </Filter>
        <Filter style={{ gridColumn: "span 2" }}>
          <FilterContainer>
            <FilterHeader
              icon={<Map color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%)"
            >
              Secretaria Territorial (Eje)
            </FilterHeader>
            <TerritorialSecreatarySelect
              onChange={(secretarialTerritoryId) =>
                store.setSecretarialTerritoryId(secretarialTerritoryId)
              }
              value={store.secretarialTerritoryId}
            />
          </FilterContainer>
        </Filter>
        <Filter style={{ gridColumn: "span 2" }}>
          <FilterContainer>
            <FilterHeader
              icon={<MapPinned color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg, #FFA500 0%, #FF4500 100%);"
            >
              Municipio
            </FilterHeader>
            <MunicipalitySelect
              territorialSecretaryId={store.secretarialTerritoryId}
              onChange={(municipalityId) =>
                store.setMunicipalityId(municipalityId)
              }
              value={store.municipalityId}
            />
          </FilterContainer>
        </Filter>
        <Filter style={{ gridColumn: "span 2" }}>
          <FilterContainer>
            <FilterHeader
              icon={<MapPin color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg, #98FB98 0%, #008000 100%)"
            >
              Parroquia
            </FilterHeader>
            <ParrishSelect
              onChange={(parrishId) => store.setParrishId(parrishId)}
              value={store.parrishId}
              municipalityId={store.municipalityId}
            />
          </FilterContainer>
        </Filter>
        <Filter style={{ gridColumn: "span 4" }}>
          <FilterContainer>
            <FilterHeader
              icon={<Users color="white" height={"16px"} width={"16px"} />}
              fill="linear-gradient(180deg,rgb(46, 167, 136) 0%, #008000 100%)"
            >
              Circuito comunal
            </FilterHeader>
            <CommunityCircuitSelect
              onChange={(circuitId) => store.setCircuitId(circuitId)}
              value={store.circuitId}
              parishId={store.parrishId}
            />
          </FilterContainer>
        </Filter>
      </Container>
    </FilterToolCard>
  );
};

export default FilterTool;

const FilterToolCard = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  height: 100%;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  // border: 1px solid #98F4E3;
`;

const Container = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  width: 100%;
  transition: transform 0.3s ease-in-out, opa;
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  
`;

