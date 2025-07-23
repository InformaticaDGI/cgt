import { MapContainer, AttributionControl } from 'react-leaflet';
import { useSearchParams } from 'react-router';
// import { useAppSelector } from '../../redux/redux-hooks';
import CopyRight from '../Copyright/copyright.component';
import { MapClickDisabler } from './click-disabler';
import { MapShapes } from './map-draw/map-shapes/map-shapes.components';
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
		getLat: () => lat ? Number(lat) : 9.9124,
		getLng: () => lng ? Number(lng) : -67.3540,
		getZoom: () => zoom ? Number(zoom) : 15
	}


	return (
		<div className={'hide-cursor'}>
			<MapContainer
				className={`map`} 
				center={[locate.getLat(), locate.getLng()]}
				 zoom={locate.getZoom()} maxZoom={21} doubleClickZoom={false}
				zoomControl={false}
				scrollWheelZoom={true}>
				{/* {modal} */}
				<MapClickDisabler>
					<MapSelector />
					<MapShapes />
				</MapClickDisabler>
				<CopyRight />
				<GuaricoGeoJson
					onChange={(geoJson: any) => {
						setCurrentGeoJson(geoJson.features);
					}}
					lineWeight={2}
					opacity={0.3} />
					<AttributionControl position="bottomright" />
			</MapContainer>
		</div>
	);
}
