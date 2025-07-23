import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Circle, Map, Marker, marker, Polygon, Polyline, Rectangle } from 'leaflet';
import { useMap } from 'react-leaflet';
// import { useDispatch } from 'react-redux';
// import { useFilledForm } from '../../../../hooks/useFilledForm';
// import useSession from '../../../../hooks/useSession';
// import { useAppSelector } from '../../../../redux/redux-hooks';
// import { setOpen } from '../../../../redux/slice/drawer-slice';
// import { setModal } from '../../../../redux/slice/modal-slice';
// import { setShapeID } from '../../../../redux/slice/shape-slice';
// import { shapeService } from '../../../../services/shape.service';
// import { ModalComponent } from '../../../modal/modal.components';
import { iconDefault } from '../map-shapes/map-shapes.components';

//TODO JS revisar todo este archivo

export const clearAllShapes = (map: L.Map) => {
	map.eachLayer(layer => {
		if(layer instanceof Circle || layer instanceof Rectangle || layer instanceof Polygon || layer instanceof Polyline || layer instanceof Marker){
		  layer.remove()
		}
	  })
} 

export function MapShapesToolbar() {

	// const { isAuthenticated } = useSession()

	// if (!isAuthenticated) return

	const map = useMap()
	
	const dispatch = () => {}
	// const dispatch = useDispatch()
	map.pm.setGlobalOptions({snappable: false})
	map.pm.setLang('es')
	map.pm.addControls({
		position: 'topright',
		drawMarker: false,
		drawCircleMarker: false,
		drawText: false,
		cutPolygon: false,
	})

	map.on('pm:create', ({ shape, layer }: any) => {

		if(shape === 'Line'){
			return createShape({positions: layer.getLatLngs()}, layer, shape)
		}
		else if(shape === 'Circle'){
			return createShape({center: layer.getLatLng(), radius: layer.getRadius()}, layer, shape)
		}
		else if(shape === 'Rectangle'){
			return createShape({bounds: layer.getLatLngs()[0]}, layer, shape)
		}
		else{
			return createShape({positions: layer.getLatLngs()[0]}, layer, shape)
		}
		
	})


	map.on('pm:buttonclick', ({ btnName, target }: any) => {
		
		if(btnName === 'editMode' || 'dragMode' || 'drawMode' || 'removalMode' || 'rotateMode'){
			

			target.eachLayer((layer: any) => {
				if(layer instanceof Marker) {
					layer.remove()
				}


				if(layer instanceof Circle || layer instanceof Rectangle || layer instanceof Polygon || layer instanceof Polyline){
					layer.off()
				}

				layer.on('pm:update', ({shape, layer}: any) => {
					const { attribution: { id } } = layer.options; 

					if(shape === 'Circle'){
						return updateShape(id, {center: layer.getLatLng(), radius: layer.getRadius()})	
					}

					if(shape === 'Rectangle'){
						return updateShape(id, {bounds: layer.getLatLngs()[0]})
					}

					if(shape === 'Polygon'){
						return updateShape(id, {positions: layer.getLatLngs()[0]})
					}

					if(shape === 'Line'){
						return updateShape(id, {positions: layer.getLatLngs()})
					}
				})

				layer.on('pm:remove', (_e: any) => {
					const { attribution: { id } } = layer.options;
					return removeShape(id)
				})

			})
		}
		
	
	})
	.on('pm:globaleditmodetoggled', (e: any) => { if (!e.enabled) return addMarkers(e) })
	.on('pm:globaldragmodetoggled', (e) => { if (!e.enabled) return addMarkers(e) })
	.on('pm:globalrotatemodetoggled', (e) => { if (!e.enabled) return addMarkers(e) })
	.on('pm:globalremovalmodetoggled', (e) => { if (!e.enabled) return addMarkers(e) })
	.on('pm:globaldrawmodetoggled', (e) => { if (!e.enabled ) return addMarkers(e) })
	


	const createShape = (geometry: any, currentLayer: any, shapetype: any) => {
		console.log(geometry, currentLayer, shapetype)
		// dispatch(setModal(<ModalComponent data={{geometry, currentLayer, shapetype}}  />))
	}
	const updateShape = async (id: any, geometry: any) => {
		console.log(id, geometry)
		// await shapeService.update(id, {geometry})
	}

	const removeShape = async (id: string) => {
		console.log(id)
		// await shapeService.destroy(id)
	}

	const addMarkers = ({ map }: { map: L.Map }) => {

		map.eachLayer((layer) => {

			if (layer.options.attribution !== null) {
				const { attribution: { tooltip, id } }: any = layer.options
				if (layer instanceof Circle) {
					layer.addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, id, map, dispatch))
					marker(layer.getLatLng(), {icon: iconDefault, pmIgnore: true})
						.addEventParent(layer)
						.bindTooltip(tooltip)
						.addTo(map)


				}
				else if (layer instanceof Rectangle || layer instanceof Polygon || layer instanceof Polyline) {
					layer.addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, id, map, dispatch))
					marker(layer.getCenter(), {icon: iconDefault, pmIgnore: true})
						.addEventParent(layer)
						.bindTooltip(tooltip)
						.addTo(map)
				}
			}




		})

	}
	
	
}

export const onShapeSelected = ({ target }: any, id: string, map: Map, dispatch: any) => {
		
	// dispatch(setShapeID(id))
	// dispatch(setOpen(true))
	map.pm.removeControls()
	const flyToShape = async () => {
		return new Promise((resolve, _reject) => {
			const mapContainer = map.getContainer();
			mapContainer.classList.add('map__active-drawer')
			map.flyToBounds(target.getBounds(), { animate: false, duration: 0 })
			setTimeout(() => { resolve(null) }, 10);
		})
	}
	flyToShape()
		.then(() => map.invalidateSize({ animate: false }))
}

