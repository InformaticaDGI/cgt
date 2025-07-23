import styled from "styled-components"
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'react-router';
// import { useAppSelector } from '../../redux/redux-hooks';
import CopyRight from '../Copyright/copyright.component';
import { MapClickDisabler } from './click-disabler';
import { MapMarkers} from './map-draw/map-markers/map-markers.components'
import { MapSelector } from './map-selector/map-selector.component';
import { useState } from 'react';
import { GuaricoGeoJson } from './get-json';

export function GobMap() {
	//TODO JS averiguar que hace esta modal
	// const modal = useAppSelector((state) => state.modal.component);
	const [searchParams] = useSearchParams()
	const lng = searchParams.get('lng')
	const lat = searchParams.get('lat')
	const zoom = searchParams.get('zoom')
	const [setCurrentGeoJson] = useState<any>(null);

	const locate = {
		getLat: () => lat ? Number(lat) : 9.102146, 
		getLng: () => lng ? Number(lng) : -66.544602,
		getZoom: () => zoom ? Number(zoom) : 7
	}


	return (
		<CardMap >
			<MapContainer
				style={{ width: '100%', height: '100%' }}
				center={[locate.getLat(), locate.getLng()]}
				zoom={locate.getZoom()} maxZoom={21} doubleClickZoom={false}
				zoomControl={false}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapClickDisabler>
					<MapSelector />
					<MapMarkers />
				</MapClickDisabler>
				<CopyRight />
				<GuaricoGeoJson
					onChange={(geoJson: any) => {
						console.log(geoJson);
						setCurrentGeoJson?.(geoJson?.features);
					}}
					lineWeight={1}
					opacity={0.3} />
			</MapContainer>
		</CardMap>
	);
}

const CardMap = styled.div`
    width: 100%;
    height: 100%;
`;