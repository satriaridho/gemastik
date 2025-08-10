"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "../context/LocationContext";

export default function MapCard() {
  const { locations, selectedLocations } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const mapInitializedRef = useRef(false);
  const mountedRef = useRef(false);

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Prevent multiple initializations
    if (mapInitializedRef.current || mountedRef.current) return;
    
    mountedRef.current = true;
    
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
        try {
          map.remove();
        } catch (error) {
          console.warn('Error removing map:', error);
        }
        setMap(null);
        setMarkers([]);
      }
      
      // Clean up map container
      cleanupMapContainer();
      
      mapInitializedRef.current = false;
      mountedRef.current = false;
      
      // Remove Leaflet CSS and JS
      const existingLink = document.querySelector('link[href*="leaflet"]');
      const existingScript = document.querySelector('script[src*="leaflet"]');
      if (existingLink) existingLink.remove();
      if (existingScript) existingScript.remove();
    };
  }, []); // Empty dependency array to ensure it only runs once

  const navigateToLocation = (location: any) => {
    if (!map) return;
    
    setSelectedLocation(location);
    
    // Pan to the location coordinates
    map.setView([location.lat, location.lng], 15);
    
    // Find the corresponding marker and open its popup
    const marker = markers.find(m => {
      const markerLat = m.getLatLng().lat;
      const markerLng = m.getLatLng().lng;
      return markerLat === location.lat && markerLng === location.lng;
    });
    
    if (marker) {
      marker.openPopup();
    }
  };

  // Clean up map container function
  const cleanupMapContainer = useCallback(() => {
    if (mapRef.current && (mapRef.current as any)._leaflet_id) {
      try {
        // Remove the Leaflet instance from the container
        delete (mapRef.current as any)._leaflet_id;
      } catch (error) {
        console.warn('Error cleaning up map container:', error);
      }
    }
  }, []);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.L || mapInitializedRef.current || !mountedRef.current) {
      console.log('Map initialization skipped:', {
        hasRef: !!mapRef.current,
        hasLeaflet: !!window.L,
        alreadyInitialized: mapInitializedRef.current,
        isMounted: mountedRef.current
      });
      return;
    }

    const L = window.L;
    
    // Clean up any existing map instance
    if (map) {
      try {
        console.log('Cleaning up existing map instance');
        map.remove();
        setMap(null);
        setMarkers([]);
      } catch (error) {
        console.warn('Error removing existing map:', error);
      }
    }
    
    // Check if map container already has a map instance
    if ((mapRef.current as any)._leaflet_id) {
      console.warn('Map container already has a map instance, cleaning up first');
      cleanupMapContainer();
    }
    
    try {
      console.log('Initializing new map instance');
      const mapInstance = L.map(mapRef.current).setView([-7.795579, 110.328797], 12);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);
      mapInitializedRef.current = true;
      console.log('Map initialized successfully');

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
    } catch (error) {
      console.error('Error initializing map:', error);
      mapInitializedRef.current = false;
    }
  }, [locations, map, cleanupMapContainer]);

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

      {/* Location List with Search */}
      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-semibold text-gray-800">Daftar Lokasi:</h4>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Horizontal Scrollable Location List */}
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
            {filteredLocations.map((location) => (
              <div 
                key={location.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors flex-shrink-0 ${
                  selectedLocation?.id === location.id 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                style={{ minWidth: '200px' }}
                onClick={() => navigateToLocation(location)}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${location.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">{location.name}</p>
                    <p className="text-sm text-black">{location.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Search Results Info */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Menampilkan {filteredLocations.length} dari {locations.length} lokasi
          </p>
        )}
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

