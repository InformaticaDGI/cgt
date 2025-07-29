import { useEffect, useState, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {useProjectsInclude} from "../../../../hooks/useProjects";
import { useAppStore } from '../../../../store/store';
import markerIconPng from '../../../../assets/marker-icon.png'
import markerShadowPng from '../../../../assets/marker-shadow.png'

// En un futuro, podrías definir una interfaz más estricta para tus lugares
interface Place {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

const customIcon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41], // Tamaño del ícono [ancho, alto]
    iconAnchor: [12, 41], // Punto del ícono que corresponderá a la ubicación del marcador
    popupAnchor: [1, -34], // Punto desde el cual se abrirá el popup en relación con iconAnchor
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

export function MapMarkers() {
    const [places, setPlaces] = useState<Place[]>([]);
    const map = useMap();
    const {data} = useProjectsInclude()
    
    const {secretaryRootId, municipalityId} = useAppStore()

    const filteredProjects = useMemo(() => {
    
        if (!data) return [];

        // Si no hay filtros activos, muestra todo.
        
        if (!municipalityId && !secretaryRootId) {
            return data.filter(project => project.latitude !== null && project.longitude !== null);
        }

        let projectsToFilter = data;

        if(secretaryRootId) {
            projectsToFilter = projectsToFilter.filter(p => p.secretary.parentId === secretaryRootId);
        }

        if(municipalityId){
            projectsToFilter = projectsToFilter.filter(p => p.parish.municipalityId === municipalityId);
        }

        return projectsToFilter.filter(project => project.latitude !== null && project.longitude !== null);
    }, [data, secretaryRootId, municipalityId]);


    useEffect(() => {
      if(data){
        const fetchedPlaces: Place[] = filteredProjects.map(project => ({
                        id: project.id,
                        name: project.name,
                        lat: project.latitude as number, // Aseguramos el tipo
                        lng: project.longitude as number, // Aseguramos el tipo
                    }))

        setPlaces(fetchedPlaces);

        // --- 2. CENTRAR EL MAPA AUTOMÁTICAMENTE ---
        if (fetchedPlaces.length === 0) return;

        const markerBounds = L.latLngBounds(fetchedPlaces.map(p => [p.lat, p.lng]));
        map.fitBounds(markerBounds, { padding: [50, 50] });
    }

    }, [map, filteredProjects]); // El hook se ejecuta cuando el mapa está listo.

    // --- 3. RENDERIZAR MARCADORES ---
    return (
        <>
            {places.map(place => (
                <Marker key={place.id} position={[place.lat, place.lng]} icon={customIcon}>
                    <Popup><b>{place.name}</b></Popup>
                </Marker>
            ))}
        </>
    );
}
