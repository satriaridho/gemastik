"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Dashboard", href: "/", icon: "/dashboard.svg" },
  { name: "Data Laporan", href: "/data", icon: "/folder.svg" },
  { name: "Analisis AI", href: "/analisis", icon: "/drone.svg" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#d2f5d2] flex flex-col items-center py-6 px-4 min-h-screen shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <span className="font-bold text-lg text-[#3a7c3a]"><img src="/logo.svg" alt="" /></span>
      </div>
      <nav className="flex flex-col gap-2 w-full mb-8 text-black">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            className={`flex items-center gap-2 text-left px-4 py-2 rounded font-medium transition-colors ${pathname === menu.href ? "bg-[#c8eac8]" : " hover:bg-[#c8eac8]"}`}
          >
            <img src={menu.icon} alt={menu.name + " icon"} className="w-5 h-5" />
            {menu.name}
          </Link>
        ))}
      </nav>
      <div className="flex-grow" />
      <button className="w-full bg-[#b6e6b6] text-[#3a7c3a] py-2 rounded font-semibold hover:bg-[#a3d6a3]">Logout</button>
    </aside>
  );
}
