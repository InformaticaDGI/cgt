import styled from "styled-components"

const MapViewer = () => {

    return <MapViewerContainer src="https://mapa.guarico.gob.ve/" />
}

export default MapViewer;

const MapViewerContainer = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`