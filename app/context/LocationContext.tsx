"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  id: string;
  name: string;
  date: string;
  isActive: boolean;
  lat: number;
  lng: number;
}

interface LocationContextType {
  locations: Location[];
  selectedLocations: string[];
  setLocations: (locations: Location[]) => void;
  setSelectedLocations: (selected: string[]) => void;
  addLocation: (location: Location) => void;
  removeLocation: (locationId: string) => void;
  toggleLocation: (locationId: string) => void;
  resetFilters: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const initialLocations: Location[] = [
  { id: '1', name: 'Kasihan', date: '12/8/2025', isActive: true, lat: -7.795579, lng: 110.328797 },
  { id: '2', name: 'Blunyah Gede', date: '12/8/2025', isActive: true, lat: -7.782333, lng: 110.367083 },
  { id: '3', name: 'Banguntapan', date: '12/8/2025', isActive: true, lat: -7.789456, lng: 110.345678 },
  { id: '4', name: 'Nglurup', date: '12/8/2025', isActive: true, lat: -7.78945, lng: 111.34568 },
];

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    initialLocations.map(loc => loc.id)
  );

  const addLocation = (location: Location) => {
    setLocations(prev => [...prev, location]);
    setSelectedLocations(prev => [...prev, location.id]);
  };

  const removeLocation = (locationId: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    setSelectedLocations(prev => prev.filter(id => id !== locationId));
  };

  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const resetFilters = () => {
    setSelectedLocations(locations.map(loc => loc.id));
  };

  return (
    <LocationContext.Provider value={{
      locations,
      selectedLocations,
      setLocations,
      setSelectedLocations,
      addLocation,
      removeLocation,
      toggleLocation,
      resetFilters,
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
