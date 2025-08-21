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
import styled from "styled-components";

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
  disabled?: boolean;
}

function LocationMarker({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitCode,
  disabled = false,
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
      if (disabled) return;
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

const MapContainerWrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  
  ${props => props.disabled && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1000;
      pointer-events: all;
      cursor: not-allowed;
    }
    
    &::before {
      content: 'Mapa deshabilitado';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 1001;
      pointer-events: none;
    }
  `}
`;

export default function MapCoordinateSelector({
  value,
  onChange,
  municipalityId,
  parrishId,
  circuitCode,
  disabled = false,
}: MapCoordinateSelectorProps) {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  return (
    <MapContainerWrapper 
      disabled={disabled} 
      onClick={handleContainerClick}
      onMouseDown={handleContainerClick}
      onMouseUp={handleContainerClick}
    >
      <MapContainer
        center={LAT_LNG_DEFAULT}
        doubleClickZoom={!disabled}
        zoomControl={false}
        scrollWheelZoom={!disabled}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
        dragging={!disabled}
        touchZoom={!disabled}
        boxZoom={!disabled}
        keyboard={!disabled}
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
          disabled={disabled}
        />
      </MapContainer>
    </MapContainerWrapper>
  );
}
