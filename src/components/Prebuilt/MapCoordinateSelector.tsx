import { useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapCoordinateSelectorProps {
  value?: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
  height?: number;
}

function LocationMarker({ value, onChange }: MapCoordinateSelectorProps) {
  const markerRef = useRef<any>(null);
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });
  return value ? <Marker position={value} ref={markerRef} /> : null;
}

export default function MapCoordinateSelector({ value, onChange }: MapCoordinateSelectorProps) {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <MapContainer
        center={value || { lat: 8.9237, lng: -67.4266 }}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker value={value} onChange={onChange} />
      </MapContainer>
    </div>
  );
}
