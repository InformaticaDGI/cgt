import styled from "styled-components"
import { Filter, FilterContainer } from "../Filter/Filter";
import FilterHeader from "../Filter/FilterHeader";
import { Search, Map, MapPin, MapPinned, Building, Network } from "lucide-react";
import { useAppStore } from "../../store/store";
import { SecretarySelect } from "./SecretarySelect";
import { TerritorialSecreatarySelect } from "./TerritorialSecretarySelect";


const FilterTool = () => {
    const store = useAppStore()

    return (
        <FilterToolCard>
            <FilterHeader icon={<Search color="white" height={"20px"} width={"20px"} />} fill="linear-gradient(180deg, #20B2AA 0%, #008080 100%)">Filtrar por:</FilterHeader>
            <Container>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Network color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFDEAD 0%, #A0522D 100%)">Secretaria Ejecutiva</FilterHeader>
                        <SecretarySelect rootOnly onChange={(secretaryRootId) => store.setSecretaryRootId(secretaryRootId)} value={store.secretaryRootId} />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Building color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #D3CCFF 0%, #483D8B 100%)">Dependencia</FilterHeader>
                        <SecretarySelect parentId={store.secretaryRootId} onChange={(secretaryParentId) => store.setSecretaryParentId(secretaryParentId)} value={store.secretaryParentId} />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Map color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%)">Secretaria Territorial (Eje)</FilterHeader>
                       <TerritorialSecreatarySelect onChange={(secretarialTerritoryId) => store.setSecretarialTerritoryId(secretarialTerritoryId)} value={store.secretarialTerritoryId} />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPinned color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFA500 0%, #FF4500 100%);">Municipio</FilterHeader>
                        {/* TODO: Add municipality select */}
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPin color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #98FB98 0%, #008000 100%)">Parroquia</FilterHeader>
                        {/* TODO: Add parrish select */}
                    </FilterContainer>
                </Filter>
            </Container>
        </FilterToolCard>
        
    )
} 

export default FilterTool

const FilterToolCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    height: 100%;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    border: 1px solid #98F4E3;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 4px;
    width: 100%;
`;