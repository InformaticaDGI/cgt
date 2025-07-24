import { useEffect, useState, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import usePrograms from "../../../../hooks/usePrograms";
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
    const {data} = usePrograms()
    
    const {secretaryParentId, parrishId} = useAppStore()

    const filteredPrograms = useMemo(() => {
        if (!data) return [];

        // Si no hay filtros activos, no se muestra nada (mantiene la lógica original).
        if (!secretaryParentId && !parrishId) {
            return data;
        }

        let programsToFilter = data;

        // 1. Filtrar por secretaría si está seleccionada.
        if (secretaryParentId) {
            programsToFilter = programsToFilter.filter(p => p.secretaryId === secretaryParentId);
        }

        // 2. Filtrar adicionalmente por parroquia si está seleccionada (lógica AND).
        if (parrishId) {
            programsToFilter = programsToFilter.filter(p => p.projects.some(proj => proj.parishId === parrishId));
        }

        return programsToFilter;
    }, [data, secretaryParentId, parrishId]);


    useEffect(() => {
      if(data){
        const fetchedPlaces: Place[] = filteredPrograms.reduce((acc, program) => {
                const projectsWithCoords = program.projects
                    .filter(project => project.latitude !== null && project.longitude !== null)
                    .map(project => ({
                        id: project.id,
                        name: project.name,
                        lat: project.latitude as number, // Aseguramos el tipo
                        lng: project.longitude as number, // Aseguramos el tipo
                    }));
                return acc.concat(projectsWithCoords);
            }, [] as Place[]);

        setPlaces(fetchedPlaces);

        // --- 2. CENTRAR EL MAPA AUTOMÁTICAMENTE ---
        if (fetchedPlaces.length === 0) return;

        const markerBounds = L.latLngBounds(fetchedPlaces.map(p => [p.lat, p.lng]));
        map.fitBounds(markerBounds, { padding: [50, 50] });
    }

    }, [map, filteredPrograms]); // El hook se ejecuta cuando el mapa está listo.

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
