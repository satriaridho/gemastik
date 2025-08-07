
const locations = [
  { name: 'Kasihan', date: '12/8/2025' },
  { name: 'Blunyah Gede', date: '12/8/2025' },
  { name: 'Banguntapan', date: '12/8/2025' },
];

export default function LocationFilter() {
  return (
    <div className="flex gap-6 mb-6 flex-wrap w-full">
      {locations.map((loc) => (
        <div key={loc.name} className="relative bg-white rounded-xl shadow-lg px-6 py-4 flex flex-col w-[220px] border border-[#e0e0e0]">
          <button className="absolute top-3 right-3 text-black text-xl hover:text-red-500 font-bold">×</button>
          <div className="flex items-center gap-2 mb-2">
            <img src="/location.svg" alt="Location" className="w-6 h-6" />
            <span className="font-bold text-lg text-black">{loc.name}</span>
          </div>
          <span className="text-[#222] text-base mt-1">{loc.date}</span>
        </div>
      ))}
    </div>
  );
}
