import styled from "styled-components"
import { MapContainer } from 'react-leaflet';
import type { PathOptions } from "leaflet";
import type { Feature } from "geojson";
import { useSearchParams } from 'react-router';
import CopyRight from '../Copyright/copyright.component';
import { MapClickDisabler } from './click-disabler';
import { MapMarkers} from './map-draw/map-markers/map-markers.components'
import { MapSelector } from './map-selector/map-selector.component';
import { GuaricoGeoJson } from './get-json';

export function GobMap() {
	//TODO JS averiguar que hace esta modal
	// const modal = useAppSelector((state) => state.modal.component);
	const [searchParams] = useSearchParams()
	const lng = searchParams.get('lng')
	const lat = searchParams.get('lat')
	const zoom = searchParams.get('zoom')

	const locate = {
		getLat: () => lat ? Number(lat) : 9.102146, 
		getLng: () => lng ? Number(lng) : -66.544602,
		getZoom: () => zoom ? Number(zoom) : 7
	}

	// Función de estilo que usa el color de las propiedades del GeoJSON.
	const styleMunicipality = (feature?: Feature): PathOptions => {
		return {
			fillColor: feature?.properties?.COLOR || '#CCCCCC',
			weight: 1,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	};


	return (
		<CardMap >
			<MapContainer
				style={{ width: '100%', height: '100%' }}
				center={[locate.getLat(), locate.getLng()]}
				zoom={locate.getZoom()} maxZoom={21} doubleClickZoom={false}
				zoomControl={false}
				scrollWheelZoom={true}>
				<MapClickDisabler>
					<MapSelector />
					<MapMarkers />
				</MapClickDisabler>
				<CopyRight />
				<GuaricoGeoJson	
				onChange={() => {}}				
					style={styleMunicipality}
				/>
			</MapContainer>
		</CardMap>
	);
}

const CardMap = styled.div`
    width: 100%;
    height: 100%;
`;