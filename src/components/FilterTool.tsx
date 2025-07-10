import styled from "styled-components"
import { Filter, FilterContainer } from "./Filter/Filter";
import FilterHeader from "./Filter/FilterHeader";
import FilterBody from "./Filter/FilterBody";
import { Search, Map, MapPin, MapPinned, Building, Network } from "lucide-react";


const FilterTool = () => {
    return (
        <FilterToolCard>
            <FilterHeader icon={<Search color="white" height={"20px"} width={"20px"} />} fill="linear-gradient(180deg, #20B2AA 0%, #008080 100%)">Filtrar por:</FilterHeader>
            <Container>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Network color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFDEAD 0%, #A0522D 100%)">Secretaria Ejecutiva</FilterHeader>
                        <FilterBody data={[]} placeholder="Seleccione una secretaria..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 3' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Building color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #D3CCFF 0%, #483D8B 100%)">Dependencia</FilterHeader>
                        <FilterBody data={[]} placeholder="Seleccione una dependencia..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<Map color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%)">Secretaria Territorial (Eje)</FilterHeader>
                        <FilterBody data={[]} placeholder="Seleccione un eje..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPinned color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #FFA500 0%, #FF4500 100%);">Municipio</FilterHeader>
                        <FilterBody data={[]} placeholder="Seleccione un municipio..." />
                    </FilterContainer>
                </Filter>
                <Filter style={{ gridColumn: 'span 2' }}>
                    <FilterContainer>
                        <FilterHeader icon={<MapPin color="white" height={"16px"} width={"16px"} />} fill="linear-gradient(180deg, #98FB98 0%, #008000 100%)">Parroquia</FilterHeader>
                        <FilterBody data={[]} placeholder="Seleccione una parroquia..." />
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