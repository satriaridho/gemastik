import Sidebar from "./section/Sidebar";
import HeaderImage from "./section/HeaderImage";
import LocationFilter from "./section/LocationFilter";
import MapCard from "./section/MapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6fae6] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderImage />
        <main className="flex-1 flex flex-col items-center p-8">
          <LocationFilter />
          <MapCard />
        </main>
      </div>
    </div>
  );
}
