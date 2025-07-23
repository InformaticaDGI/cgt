import { useCallback, useEffect, useState } from "react";
import { useMap, useMapEvents, GeoJSON } from "react-leaflet";

export function GuaricoGeoJson({
    onFeatureDblClick,
    opacity,
    lineWeight,
    lineColor,
    onChange
}: {
    onFeatureDblClick?: Function;
    opacity?: number,
    lineWeight?: number,
    lineColor?: string,
    onChange: Function
}) {
    const map = useMap();
    const [_opacity, setOpacity] = useState(opacity || 0.5);
    const [geoJson, setGeojson] = useState<any | null>(null);
    const [ setParroquias] = useState<any | null>(null);
    const [municipios, setMunicipios] = useState<any | null>(null);
    const [currentGeoJson, setCurrentGeoJson] = useState<"municipio" | "parroquia">("municipio");

    useEffect(() => {
        fetch('/guarico.geojson')
            .then(res => res.json())
            .then(data => {
                setGeojson(data);
                setMunicipios(data);
                onChange(data);
            });
        fetch('/parroquias.geojson')
            .then(res => res.json())
            .then(data => {
                setParroquias(data);
            });
    }, []);

    useMapEvents({
        zoomend: (e: any) => {
            setOpacity(0.4);
            setGeojson(municipios);
            setCurrentGeoJson("municipio");
            onChange(municipios);
            if (e.target._zoom >= 10 && e.target._zoom < 14) {
                setOpacity(0.2);
            }
            if (e.target._zoom >= 14) {
                setOpacity(0);
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
            onFeatureDblClick && onFeatureDblClick(event, event.sourceTarget.feature.properties.CODE);
        },
        [map, onFeatureDblClick]
    );

    return geoJson ? (
        <>
            {currentGeoJson === "municipio" && <GeoJSON
                key="municipios"
                eventHandlers={{
                    dblclick: onDblClick,
                }}
                
                pathOptions={{
                    style:(feat: any) => {
                    return {
                        color: lineColor || feat.properties.COLOR,
                        fillColor: feat.properties.COLOR,
                        weight: lineWeight || 0.2,
                        fillRule: "evenodd",
                    };
                },
                    fillOpacity: _opacity,
                }}
                data={geoJson}
            />}
            {currentGeoJson === "parroquia" && <GeoJSON
                key="parroquia"
                eventHandlers={{
                    dblclick: onDblClick,
                }}
                pathOptions={{
                    style: (feat: any) => { // 'style' dentro de 'pathOptions'
                        return {
                            color: lineColor || feat.properties.COLOR,
                            fillColor: feat.properties.COLOR,
                            weight: lineWeight || 0.2,
                            fillRule: "evenodd",
                        };
                    },
                    fillOpacity: _opacity,
                }}
                data={geoJson}
            />}
        </>
    ) : null;
};
