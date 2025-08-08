
"use client";

import { useState } from "react";

interface Location {
  id: string;
  name: string;
  date: string;
  isActive: boolean;
}

const initialLocations: Location[] = [
  { id: '1', name: 'Kasihan', date: '12/8/2025', isActive: true },
  { id: '2', name: 'Blunyah Gede', date: '12/8/2025', isActive: true },
  { id: '3', name: 'Banguntapan', date: '12/8/2025', isActive: true },
];

export default function LocationFilter() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialLocations.map(loc => loc.id)
  );

  const handleLocationToggle = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleRemoveLocation = (locationId: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    setSelectedLocations(prev => prev.filter(id => id !== locationId));
  };

  const handleResetFilters = () => {
    setSelectedLocations(locations.map(loc => loc.id));
  };

  const activeCount = selectedLocations.length;
  const totalCount = locations.length;

  return (
    <div className="w-full">
      {/* Control Panel */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {activeCount} dari {totalCount} lokasi dipilih
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleResetFilters}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Pilih Semua
          </button>
          <button
            onClick={() => setSelectedLocations([])}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Kosongkan
          </button>
        </div>
      </div>

      {/* Location Cards */}
      <div className="flex gap-6 mb-6 flex-wrap w-full">
        {locations.map((loc) => {
          const isSelected = selectedLocations.includes(loc.id);
          return (
            <div 
              key={loc.id} 
              className={`relative rounded-xl shadow-lg px-6 py-4 flex flex-col w-[220px] border cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-green-50 border-green-300 shadow-green-100' 
                  : 'bg-gray-50 border-gray-300 opacity-60'
              }`}
              onClick={() => handleLocationToggle(loc.id)}
            >
              <button 
                className="absolute top-3 right-3 text-gray-400 text-xl hover:text-red-500 font-bold z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveLocation(loc.id);
                }}
              >
                ×
              </button>
              <div className="flex items-center gap-2 mb-2">
                <img src="/location.svg" alt="Location" className="w-6 h-6" />
                <span className={`font-bold text-lg ${isSelected ? 'text-green-700' : 'text-gray-500'}`}>
                  {loc.name}
                </span>
                {isSelected && (
                  <div className="ml-auto w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <span className={`text-base mt-1 ${isSelected ? 'text-green-600' : 'text-gray-400'}`}>
                {loc.date}
              </span>
              <div className="mt-2 text-xs text-gray-500">
                Klik untuk {isSelected ? 'menonaktifkan' : 'mengaktifkan'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Information */}
      {activeCount === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <span className="text-yellow-800">
            ⚠️ Tidak ada lokasi yang dipilih. Data tidak akan ditampilkan.
          </span>
        </div>
      )}
    </div>
  );
}
