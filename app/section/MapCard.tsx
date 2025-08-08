"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "../context/LocationContext";

export default function MapCard() {
  const { locations, selectedLocations } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (map) {
        map.remove();
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    const L = window.L;
    
    const mapInstance = L.map(mapRef.current).setView([-7.795579, 110.328797], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Add markers for each location
    const newMarkers: any[] = [];
    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 32px; 
              height: 32px; 
              background: ${location.isActive ? '#22c55e' : '#6b7280'}; 
              border: 2px solid white; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: white; 
              font-weight: bold; 
              font-size: 12px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">
              ${location.name.charAt(0)}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(mapInstance);

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #3a7c3a; font-weight: bold;">${location.name}</h3>
          <p style="margin: 4px 0; color: #666;">Tanggal: ${location.date}</p>
          <p style="margin: 4px 0; color: #666;">Status: ${location.isActive ? 'Sampah' : 'Sampah Terambil'}</p>
          <p style="margin: 4px 0; color: #666;">Koordinat: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}</p>
        </div>
      `);

      // Add click listener
      marker.on('click', () => {
        setSelectedLocation(location);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
      <div className="w-full mb-4">
        <h3 className="text-lg font-semibold text-black mb-2">Peta Lokasi Sampah</h3>
        <p className="text-sm text-black mb-4">
          Klik marker untuk melihat detail lokasi
        </p>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-lg border border-gray-200"
        style={{ minHeight: '500px' }}
      />

      {/* Location List */}
      <div className="w-full mt-4">
        <h4 className="text-md font-semibold text-gray-800 mb-2">Daftar Lokasi:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {locations.map((location) => (
            <div 
              key={location.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLocation?.id === location.id 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${location.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                  <p className="font-medium text-gray-800">{location.name}</p>
                  <p className="text-sm text-black">{location.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="w-full mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Detail Lokasi Terpilih:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-black">Nama:</span>
              <p className="font-medium text-black">{selectedLocation.name}</p>
            </div>
            <div>
              <span className="text-black">Tanggal:</span>
              <p className="font-medium text-black">{selectedLocation.date}</p>
            </div>
            <div>
              <span className="text-black">Status:</span>
              <p className={`font-medium ${selectedLocation.isActive ? 'text-green-600' : 'text-black'}`}>
                {selectedLocation.isActive ? 'Sampah' : 'Sampah Terambil'}
              </p>
            </div>
            <div>
              <span className="text-black">Koordinat:</span>
              <p className="font-medium text-black">{selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

