import Sidebar from "./section/Sidebar";
import HeaderImage from "./section/HeaderImage";
import MapCard from "./section/MapCard";
import ChartSection from "./section/ChartSection";
import { LocationProvider } from "./context/LocationContext";

export default function Home() {
  return (
    <LocationProvider>
      <div className="min-h-screen bg-[#e6fae6] flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <HeaderImage />
          <main className="flex-1 flex flex-col items-center p-8 space-y-8">
            <MapCard />
            <ChartSection />
          </main>
        </div>
      </div>
    </LocationProvider>
  );
}
