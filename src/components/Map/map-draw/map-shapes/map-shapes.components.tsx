import { Circle, Icon, Polygon, Polyline, Rectangle, circle, marker, polygon, polyline, rectangle } from "leaflet";
import { FeatureGroup, useMap } from "react-leaflet";
// import { useDispatch } from "react-redux";
// import { useInitialShapes } from "../../../../hooks/useInitialShapes";
// import { useAppSelector } from "../../../../redux/redux-hooks";
import MapLoader from "../../map-loader";
import { MapShapesToolbar, onShapeSelected } from "../toolbar/map-shapes-toolbar";

export const iconDefault = new Icon({
  iconRetinaUrl: '/icon/marker/marker-icon-2x.png',
  iconUrl: '/icon/marker/marker-icon.png',
  shadowUrl: '/icon/marker/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});


export const getEducationIcon = (is_connected: boolean) => {

  if (!is_connected) {
    return new Icon({
      iconRetinaUrl: '/icon/marker/education-off-2x.png',
      iconUrl: '/icon/marker/education-off.png',
      shadowUrl: '/icon/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  return new Icon({
    iconRetinaUrl: '/icon/marker/education-on-2x.png',
    iconUrl: '/icon/marker/education-on.png',
    shadowUrl: '/icon/marker/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

}


export const getIcon = (icon: string, metadata?: any) => {

  if (icon === 'education') {

    if (metadata.is_connected) {
      return new Icon({
        iconRetinaUrl: '/icon/marker/education-on-2x.png',
        iconUrl: '/icon/marker/education-on.png',
        shadowUrl: '/icon/marker/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
    }

    return new Icon({
      iconRetinaUrl: '/icon/marker/education-off-2x.png',
      iconUrl: '/icon/marker/education-off.png',
      shadowUrl: '/icon/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

  }
  else if (icon === 'risk') {
    return new Icon({
      iconRetinaUrl: '/icon/marker/risk-2x.png',
      iconUrl: '/icon/marker/risk.png',
      shadowUrl: '/icon/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }
  else if (icon === 'vote') {
    return new Icon({
      iconRetinaUrl: '/icon/marker/voto-2x.png',
      iconUrl: '/icon/marker/voto.png',
      shadowUrl: '/icon/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

  } else if (icon === 'hospital') {
    return new Icon({
      iconRetinaUrl: '/icon/marker/hospital.svg',
      iconUrl: '/icon/marker/hospital.svg',
      shadowUrl: '/icon/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  return new Icon({
    iconRetinaUrl: '/icon/marker/risk-2x.png',
    iconUrl: '/icon/marker/risk.png',
    shadowUrl: '/icon/marker/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

}



export function MapShapes() {
  // const { filters } = useAppSelector((state) => state.map);
  const { loading } = {loading: false} //useInitialShapes({ filters })
  MapShapesToolbar()

  return loading ? <MapLoader /> : <FeatureGroup />

}


export function useShapeFactory() {
  const map = useMap()
  // const dispatch = () => {}
  // const dispatch = useDispatch()

  return (shape: any) => {

    const { description, color, geometry, shapetype, id, name, metadata, icon } = shape

    const createCircle = (center: any, radius: any) => {
      let nCircle = circle(center, { radius, color })
        .addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, map))
        .addTo(map)
      let tooltip = `<p style='font-weight: 600; color: ${color};'>${name} </p> ${description} <br /> Latitud: ${nCircle.getLatLng().lat} <br /> Longitud: ${nCircle.getLatLng().lng}`;
      nCircle.setStyle({ attribution: { id, tooltip } as any })
      addMarker(nCircle)

    }
    const createRectangle = (bounds: any) => {
      let nRectangle = rectangle(bounds, { color })
        .addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, map))
        .addTo(map)
      let tooltip = `<p style='font-weight: 600; color: ${color};'>${name} </p> ${description} <br /> Latitud: ${nRectangle.getCenter().lat} <br /> Longitud: ${nRectangle.getCenter().lng}`;
      nRectangle.setStyle({ attribution: { id, tooltip } as any })
      addMarker(nRectangle)

    }
    const createPolygon = (positions: any) => {
      let nPolygon = polygon(positions, { color })
        .addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, map))
        .addTo(map)
      let tooltip = `<p style='font-weight: 600; color: ${color};'>${name} </p> ${description} <br /> Latitud: ${nPolygon.getCenter().lat} <br /> Longitud: ${nPolygon.getCenter().lng}`;
      nPolygon.setStyle({ attribution: { id, tooltip } as any })
      addMarker(nPolygon)
    }
    const createLine = (positions: any) => {
      let nLine = polyline(positions, { color })
        .addEventListener('click', (e) => onShapeSelected && onShapeSelected(e, map))
        .addTo(map)
      let tooltip = `<p style='font-weight: 600; color: ${color};'>${name} </p> ${description} <br /> Latitud: ${nLine.getCenter().lat} <br /> Longitud: ${nLine.getCenter().lng}`;
      nLine.setStyle({ attribution: { id, tooltip } as any })
      addMarker(nLine)
    }

    const addMarker = async (layer: Circle | Rectangle | Polygon | Polyline) => {
      const { tooltip }: any = layer.options.attribution;
      marker(layer instanceof Circle ? layer.getLatLng() : layer.getCenter(), { icon: getIcon(icon, metadata), pmIgnore: true })
        .addEventParent(layer)
        .bindTooltip(tooltip)
        .addTo(map)
    }


    switch (shapetype) {
      case 'Rectangle':
        return createRectangle(geometry?.bounds)
      case 'Circle':
        return createCircle(geometry?.center, geometry?.radius)
      case 'Line':
        return createLine(geometry?.positions)
      case 'Polygon':
        return createPolygon(geometry?.positions)
      default:
        return createCircle(geometry?.center, geometry?.radius)
    }


  }
}

export function getCoordinatesFromShape(geometry: any) {
  if (Object.hasOwn(geometry, 'center')) {
    return geometry.center;
  } else if (Object.hasOwn(geometry, 'bounds')) {
    return geometry.bounds[0]
  } else if (Object.hasOwn(geometry, 'positions')) {
    return geometry.positions[0]
  } else {
    return null
  }
}

