'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RoverMapProps {
  lat: number;
  lng: number;
}

export default function RoverMap({ lat, lng }: RoverMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-[#060608] border border-[#27272A] flex items-center justify-center text-zinc-500 font-mono text-xs">
        INITIALIZING_LEAFLET_MAP_ENGINE...
      </div>
    );
  }

  // Create custom red circle marker icon using standard Leaflet L.divIcon
  const customMarkerIcon = L.divIcon({
    className: 'custom-rover-marker',
    html: `<div style="
      width: 18px;
      height: 18px;
      background-color: #EF4444;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.9);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[lat, lng]}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={customMarkerIcon} />
      </MapContainer>
    </div>
  );
}
