import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import usePrograms from "../../../../hooks/usePrograms";

// En un futuro, podrías definir una interfaz más estricta para tus lugares
interface Place {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

export function MapMarkers() {
    const [places, setPlaces] = useState<Place[]>([]);
    const map = useMap();
    const { data } = usePrograms()

    useEffect(() => {
      if(data){
        const fetchedPlaces: Place[] = data.reduce((acc, program) => {
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

    }, [map, data]); // El hook se ejecuta cuando el mapa está listo.

    // --- 3. RENDERIZAR MARCADORES ---
    return (
        <>
            {places.map(place => (
                <Marker key={place.id} position={[place.lat, place.lng]}>
                    <Popup><b>{place.name}</b></Popup>
                </Marker>
            ))}
        </>
    );
}
