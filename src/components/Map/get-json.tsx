import { useCallback, useEffect, useState } from "react";
import { useMap, useMapEvents, GeoJSON } from "react-leaflet";
import type { PathOptions, GeoJSON as LeafletGeoJSON } from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";

interface GuaricoGeoJsonProps {
    onFeatureDblClick?: (event: any, code: string) => void;
    onChange: (geoJson: GeoJsonObject | null) => void;
    style?: (feature?: Feature) => PathOptions;
}

export function GuaricoGeoJson({
    onFeatureDblClick,
    onChange,
    style
}: GuaricoGeoJsonProps) {
    const map = useMap();
    const [geoJson, setGeojson] = useState<GeoJsonObject | null>(null);
    const [parroquias, setParroquias] = useState<GeoJsonObject | null>(null);
    const [municipios, setMunicipios] = useState<GeoJsonObject | null>(null);
    const [currentGeoJson, setCurrentGeoJson] = useState<"municipio" | "parroquia">("municipio");
    const [activeMunicipalityId, setActiveMunicipalityId] = useState<string | null>(null);

    useEffect(() => {
        fetch('/guarico.geojson')
            .then(res => res.json())
            .then(data => {
                setGeojson(data as GeoJsonObject);
                setMunicipios(data as GeoJsonObject);
                onChange(data as GeoJsonObject);
            });
        fetch('/parroquias.geojson')
            .then(res => res.json())
            .then(data => {
                
                setParroquias(data as GeoJsonObject);
            });
    }, []);

    useMapEvents({
        zoomend: (e: any) => {
            const zoomLevel = e.target.getZoom();
 
            // 1. Si el zoom es >= 16, se ocultan los GeoJSON.
            if (zoomLevel >= 16) {
                setGeojson(null);
                onChange(null);
                return;
            }
 
            // 2. Si el zoom es >= 10
            if (zoomLevel >= 10 && parroquias) {
                // y tenemos un municipio activo, mostramos sus parroquias.
                if (activeMunicipalityId) {
                    const filteredParishes = {
                        ...parroquias,
                        features: (parroquias as any).features.filter(
                            (parish: Feature) => parish.properties?.COD_MUN === activeMunicipalityId
                        ),
                    };
                    setGeojson(filteredParishes);
                    setCurrentGeoJson("parroquia");
                    onChange(filteredParishes);
                } else {
                    // si no hay municipio activo, mostramos TODAS las parroquias.
                    setGeojson(parroquias);
                    setCurrentGeoJson("parroquia");
                    onChange(parroquias);
                }
            } else {
                // 3. Si el zoom es < 10, mostramos los municipios y reseteamos el ID activo.
                setGeojson(municipios);
                setCurrentGeoJson("municipio");
                setActiveMunicipalityId(null);
                onChange(municipios);
            }
        }
    });

    const onDblClick = useCallback(
        (event: any) => {
            map.setView(
                [
                    event.sourceTarget.feature.properties.CENTER[1],
                    event.sourceTarget.feature.properties.CENTER[0], // + 0.5 <-- offset
                ],
                11
            );
            // Guardamos el ID del municipio en el que se hizo doble clic.
            const municipalityId = event.sourceTarget.feature.properties.COD_MUN;
            setActiveMunicipalityId(municipalityId);
            onFeatureDblClick?.(event, municipalityId);
        },
        [map, onFeatureDblClick]
    );

    // Estilo para las parroquias
    const styleParish = (): PathOptions => ({
        fillColor: '#3388ff', // Un color azul para diferenciar
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5,
    });

    // Función que decide qué estilo aplicar
    const featureStyle = (feature?: Feature): PathOptions => {
        if (currentGeoJson === 'parroquia') {
            return styleParish();
        }
        // Para municipios, usamos el estilo que viene de las props
        return style ? style(feature) : {};
    };

    return geoJson ? (
        <GeoJSON
            key={currentGeoJson}
            eventHandlers={{ dblclick: onDblClick }}
            style={featureStyle}
            data={geoJson}
        />
    ) : null;
};
