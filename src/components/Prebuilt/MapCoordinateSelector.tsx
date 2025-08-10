import { useRef, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMunicipalities } from "../../hooks/queries/useMunicipalities";
import { useParrishes } from "../../hooks/queries/useParrishes";
import { useCommunityCircuits } from "../../hooks/queries/useCommunityCircuits";
import markerIconPng from "../../assets/marker-icon.png";
import markerShadowPng from "../../assets/marker-shadow.png";

const LAT_LNG_DEFAULT = { lat: 8.9237, lng: -67.4266 };

const customIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41], // Tamaño del ícono [ancho, alto]
  iconAnchor: [12, 41], // Punto del ícono que corresponderá a la ubicación del marcador
  popupAnchor: [1, -34], // Punto desde el cual se abrirá el popup en relación con iconAnchor
  shadowUrl: markerShadowPng,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

interface MapCoordinateSelectorProps {
  value?: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
  height?: number;
  municipalityId?: string;
  parrishId?: string;
  circuitCode?: string;
}

function LocationMarker({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitCode,
}: MapCoordinateSelectorProps) {
  const markerRef = useRef<any>(null);
  const map = useMap();

  const { data: municipalities } = useMunicipalities({
    territorialSecretaryId: undefined,
  });
  const { data: parrishes } = useParrishes(municipalityId ?? "");
  const { data: circuits } = useCommunityCircuits({ parishId: parrishId ?? "" });

  useEffect(() => {
    if (value) {
      map.setView(value, 15, { animate: true });
    }
  }, [value, map]);

  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });

  useMemo(() => {
    if (circuits && circuitCode !== "") {
      const circuit = circuits.find((m) => m.code === circuitCode);
      if (!circuit) return;

      if (circuit.latitude && circuit.longitude) {
        map.setView({ lat: circuit.latitude, lng: circuit.longitude }, 12);
        return;
      } else {
        return;
      }
    }

    if (parrishes && parrishId !== "") {
      const parrish = parrishes.find((m) => m.id === parrishId);
      if (!parrish) return;

      if (parrish.latitude && parrish.longitude) {
        map.setView({ lat: parrish.latitude, lng: parrish.longitude }, 11);
        return;
      } else {
        return;
      }
    }

    if (municipalities && municipalityId !== "") {
      const municipality = municipalities.find((m) => m.id === municipalityId);
      if (!municipality) return;

      if (municipality.latitude && municipality.longitude) {
        map.setView(
          { lat: municipality.latitude, lng: municipality.longitude },
          10
        );
        return;
      }
    }
  }, [municipalityId, parrishId, circuitCode]);

  return value ? (
    <Marker position={value} ref={markerRef} icon={customIcon} />
  ) : null;
}

export default function MapCoordinateSelector({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitCode,
}: MapCoordinateSelectorProps) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <MapContainer
        center={LAT_LNG_DEFAULT}
        doubleClickZoom={false}
        zoomControl={false}
        scrollWheelZoom={true}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          value={value}
          onChange={onChange}
          municipalityId={municipalityId}
          parrishId={parrishId}
          circuitCode={circuitCode}
        />
      </MapContainer>
    </div>
  );
}
