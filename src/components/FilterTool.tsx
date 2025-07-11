import styled from "styled-components"
import { Filter, FilterContainer } from "./Filter/Filter";
import FilterHeader from "./Filter/FilterHeader";
import FilterBody from "./Filter/FilterBody";
import { Search, Map, MapPin, MapPinned, Building, Network } from "lucide-react";
import useSecretary from "../hooks/useSecretary";
import useDependency from "../hooks/useDependency";
import { useState } from "react";
import useTerritorySecretary from "../hooks/useTerritorySecretary";
import useMunicipality from "../hooks/useMunicipality";
import { useAppStore } from "../store/store";


const FilterTool = () => {
    const store = useAppStore()
    const secretaries = useSecretary();
    const dependencias = useDependency(store.secretary_id)
    const municipality = useMunicipality(store.territory_id);
    const secretaryTerritory = useTerritorySecretary();
    const [selectedMunicipality, setSelectedMuncipality] = useState<{ value: string, label: string }[]>([]);

    return (
        <FilterToolCard>
            <FilterHeader icon={<Search color="white" height={"20px"} width={"20px"} />} fill="linear-gradient(180deg, #20B2AA 0%, #008080 100%)">Filtrar por:</FilterHeader>
            <Container>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Network color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFDEAD 0%, #A0522D 100%)">Secretaria Ejecutiva</FilterHeader>
                        <FilterBody onChange={(dep) => store.setSecretaryId(dep)} data={secretaries.data} placeholder="Seleccione una secretaria..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Building color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #D3CCFF 0%, #483D8B 100%)">Dependencia</FilterHeader>
                        <FilterBody onChange={(dep => store.setDependencyId(dep))} data={dependencias.data}  placeholder="Seleccione una dependencia..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Map color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%)">Secretaria Territorial (Eje)</FilterHeader>
                        <FilterBody onChange={(territory) => store.setTerritoryId(territory)} data={secretaryTerritory.data} placeholder="Seleccione un eje..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPinned color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFA500 0%, #FF4500 100%);">Municipio</FilterHeader>
                        <FilterBody data={municipality.data} onChange={(municipalityId) => {
                            store.setMunicipalityId(municipalityId)
                            const parrishes = municipality.data.find(mun => mun.value === municipalityId)
                            if(!parrishes) return;
                            const mappedParrish = parrishes.parroquias.map(parrish => ({ value: parrish.idParroquia, label: parrish.nombreParroquia }))
                            setSelectedMuncipality(mappedParrish)
                        }} placeholder="Seleccione un municipio..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPin color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #98FB98 0%, #008000 100%)">Parroquia</FilterHeader>
                        <FilterBody onChange={(dep) => store.setParrishId(dep)} data={selectedMunicipality} placeholder="Seleccione una parroquia..." />
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