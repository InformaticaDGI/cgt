// import { CloseButton } from '@chakra-ui/react';
// import { MouseEvent } from 'react';
// import { useMap } from 'react-leaflet';
// // import { useDispatch } from 'react-redux';
// import useSession from '../../hooks/useSession';
// import { useShape } from '../../hooks/useShape';
// import { useAppSelector } from '../../redux/redux-hooks';
// import { setOpen } from '../../redux/slice/drawer-slice';
// import { setShapeID } from '../../redux/slice/shape-slice';
// import { AboutLocation } from '../about_location/about_location.components';
// import { LocationTagNameEditable } from '../location_tag_name_editable/location_tag_name_editable.components';
// import { LoaderSkeleton } from '../map/loader-skeleton';


export default function Drawer() {
	// const shapeid = useAppSelector((state) => state.shape.id)
	// const { shape } = useShape(shapeid);
	// const { isAuthenticated } = useSession()
	// // const dispatch = useDispatch()
	// const map = useMap();
	// const { open } = useAppSelector((state) => state.drawer)


	// function change(e: MouseEvent) {
	// 	// dispatch(setOpen(false));
	// 	// dispatch(setShapeID('-1'));
	// 	const mapContainer = map.getContainer();
	// 	mapContainer.classList.remove('map__active-drawer');
	// 	map.invalidateSize({ animate: false, duration: 1 })


	// 	if(!isAuthenticated) return
	// 	map.pm.toggleControls()

	// }

	return null

	// return (
	// 	<div onMouseEnter={() => { map.dragging.disable(); map.scrollWheelZoom.disable() }} onMouseLeave={() => { map.dragging.enable(); map.scrollWheelZoom.enable() }} className={`drawer ${open ? 'drawer__active' : ''}`}>
	// 		<CloseButton onClick={change} pos='absolute' top='2%' right='2%' size='sm' />
	// 		<LoaderSkeleton isLoaded={shape?.categories?.length && shape.description?.length? true: false}>
	// 			<div>
	// 				<LocationTagNameEditable shape={shape} />
	// 			</div>
	// 			<AboutLocation shape={shape} />
	// 		</LoaderSkeleton>
			
	// 	</div>
	// );
}



