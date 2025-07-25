import { useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMunicipalities } from "../../hooks/queries/useMunicipalities";
import { useParrishes } from "../../hooks/queries/useParrishes";
import { useCommunityCircuitsByParish } from "../../hooks/queries/useCommunityCircuitsByParish";

const LAT_LNG_DEFAULT = { lat: 8.9237, lng: -67.4266 };

interface MapCoordinateSelectorProps {
  value?: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
  height?: number;
  municipalityId?: string;
  parrishId?: string;
  circuitId?: string;
}

function LocationMarker({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitId,
}: MapCoordinateSelectorProps) {
  const markerRef = useRef<any>(null);
  const map = useMap();

  const { data: municipalities } = useMunicipalities({
    territorialSecretaryId: undefined,
  });
  const { data: parrishes } = useParrishes(municipalityId ?? "");
  const { data: circuits } = useCommunityCircuitsByParish(parrishId ?? "");

  useMapEvents({
    click(e) {
      onChange(e.latlng);
      map.setView(e.latlng, 15);
    },
  });

  useMemo(() => {
    if (circuits && circuitId !== "") {
      const circuit = circuits.find((m) => m.id === circuitId);
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
  }, [municipalityId, parrishId, circuitId]);

  return value ? <Marker position={value} ref={markerRef} /> : null;
}

export default function MapCoordinateSelector({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitId,
}: MapCoordinateSelectorProps) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <MapContainer
        center={LAT_LNG_DEFAULT}
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
          circuitId={circuitId}
        />
      </MapContainer>
    </div>
  );
}
