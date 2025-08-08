"use client";

import { useState, useMemo } from "react";

interface ChartData {
  year: string;
  period: string;
  sampahTertangani: number;
  produksiSampah: number;
  peningkatanPengelolaan: number;
  date: Date;
  unit: "hari" | "minggu" | "bulan" | "tahun";
}

type SortBy = "year" | "sampahTertangani" | "produksiSampah" | "peningkatanPengelolaan";
type SortOrder = "asc" | "desc";

const ChartSection = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unit, setUnit] = useState("tahun");
  const [sortBy, setSortBy] = useState<SortBy>("year");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Data untuk berbagai satuan waktu
  const rawChartData: ChartData[] = [
    // Data tahunan (existing)
    {
      year: "2020",
      period: "2020",
      sampahTertangani: 772.72,
      produksiSampah: 1366.79,
      peningkatanPengelolaan: 573.97,
      date: new Date("2020-01-01"),
      unit: "tahun",
    },
    {
      year: "2021",
      period: "2021",
      sampahTertangani: 893.53,
      produksiSampah: 1133.94,
      peningkatanPengelolaan: 794.09,
      date: new Date("2021-01-01"),
      unit: "tahun",
    },
    {
      year: "2022",
      period: "2022",
      sampahTertangani: 757.72,
      produksiSampah: 1231.35,
      peningkatanPengelolaan: 740,
      date: new Date("2022-01-01"),
      unit: "tahun",
    },
    {
      year: "2023",
      period: "2023",
      sampahTertangani: 756,
      produksiSampah: 1231.35,
      peningkatanPengelolaan: 499.6,
      date: new Date("2023-01-01"),
      unit: "tahun",
    },
    {
      year: "2024",
      period: "2024",
      sampahTertangani: 820.45,
      produksiSampah: 1280.20,
      peningkatanPengelolaan: 650.30,
      date: new Date("2024-01-01"),
      unit: "tahun",
    },

    // Data bulanan untuk 2024
    {
      year: "2024",
      period: "Jan",
      sampahTertangani: 68.37,
      produksiSampah: 106.68,
      peningkatanPengelolaan: 54.19,
      date: new Date("2024-01-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Feb",
      sampahTertangani: 65.42,
      produksiSampah: 102.45,
      peningkatanPengelolaan: 51.23,
      date: new Date("2024-02-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Mar",
      sampahTertangani: 70.15,
      produksiSampah: 108.92,
      peningkatanPengelolaan: 55.67,
      date: new Date("2024-03-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Apr",
      sampahTertangani: 72.88,
      produksiSampah: 112.34,
      peningkatanPengelolaan: 58.45,
      date: new Date("2024-04-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Mei",
      sampahTertangani: 75.61,
      produksiSampah: 115.76,
      peningkatanPengelolaan: 61.23,
      date: new Date("2024-05-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Jun",
      sampahTertangani: 78.34,
      produksiSampah: 119.18,
      peningkatanPengelolaan: 64.01,
      date: new Date("2024-06-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Jul",
      sampahTertangani: 81.07,
      produksiSampah: 122.60,
      peningkatanPengelolaan: 66.79,
      date: new Date("2024-07-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Ags",
      sampahTertangani: 83.80,
      produksiSampah: 126.02,
      peningkatanPengelolaan: 69.57,
      date: new Date("2024-08-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Sep",
      sampahTertangani: 86.53,
      produksiSampah: 129.44,
      peningkatanPengelolaan: 72.35,
      date: new Date("2024-09-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Okt",
      sampahTertangani: 89.26,
      produksiSampah: 132.86,
      peningkatanPengelolaan: 75.13,
      date: new Date("2024-10-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Nov",
      sampahTertangani: 91.99,
      produksiSampah: 136.28,
      peningkatanPengelolaan: 77.91,
      date: new Date("2024-11-01"),
      unit: "bulan",
    },
    {
      year: "2024",
      period: "Des",
      sampahTertangani: 94.72,
      produksiSampah: 139.70,
      peningkatanPengelolaan: 80.69,
      date: new Date("2024-12-01"),
      unit: "bulan",
    },

    // Data mingguan untuk Januari 2024
    {
      year: "2024",
      period: "M1",
      sampahTertangani: 17.09,
      produksiSampah: 26.67,
      peningkatanPengelolaan: 13.55,
      date: new Date("2024-01-01"),
      unit: "minggu",
    },
    {
      year: "2024",
      period: "M2",
      sampahTertangani: 16.36,
      produksiSampah: 25.61,
      peningkatanPengelolaan: 12.81,
      date: new Date("2024-01-08"),
      unit: "minggu",
    },
    {
      year: "2024",
      period: "M3",
      sampahTertangani: 17.54,
      produksiSampah: 27.23,
      peningkatanPengelolaan: 13.92,
      date: new Date("2024-01-15"),
      unit: "minggu",
    },
    {
      year: "2024",
      period: "M4",
      sampahTertangani: 17.38,
      produksiSampah: 27.17,
      peningkatanPengelolaan: 13.92,
      date: new Date("2024-01-22"),
      unit: "minggu",
    },

    // Data harian untuk minggu pertama Januari 2024
    {
      year: "2024",
      period: "Sen",
      sampahTertangani: 2.44,
      produksiSampah: 3.81,
      peningkatanPengelolaan: 1.94,
      date: new Date("2024-01-01"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Sel",
      sampahTertangani: 2.56,
      produksiSampah: 3.99,
      peningkatanPengelolaan: 2.03,
      date: new Date("2024-01-02"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Rab",
      sampahTertangani: 2.68,
      produksiSampah: 4.17,
      peningkatanPengelolaan: 2.12,
      date: new Date("2024-01-03"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Kam",
      sampahTertangani: 2.80,
      produksiSampah: 4.35,
      peningkatanPengelolaan: 2.21,
      date: new Date("2024-01-04"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Jum",
      sampahTertangani: 2.92,
      produksiSampah: 4.53,
      peningkatanPengelolaan: 2.30,
      date: new Date("2024-01-05"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Sab",
      sampahTertangani: 3.04,
      produksiSampah: 4.71,
      peningkatanPengelolaan: 2.39,
      date: new Date("2024-01-06"),
      unit: "hari",
    },
    {
      year: "2024",
      period: "Min",
      sampahTertangani: 3.16,
      produksiSampah: 4.89,
      peningkatanPengelolaan: 2.48,
      date: new Date("2024-01-07"),
      unit: "hari",
    },
  ];

  // Filter and sort data based on user selections
  const chartData = useMemo(() => {
    let filtered = [...rawChartData];

    // Filter by unit
    filtered = filtered.filter(item => item.unit === unit);

    // Filter by date range
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(item => item.date >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      filtered = filtered.filter(item => item.date <= end);
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (sortBy === "year") {
        aValue = a.period;
        bValue = b.period;
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [startDate, endDate, sortBy, sortOrder, unit, rawChartData]);

  const maxValue = Math.max(
    ...chartData.flatMap((d) => [
      d.sampahTertangani,
      d.produksiSampah,
      d.peningkatanPengelolaan,
    ])
  );

  const getYPosition = (value: number) => {
    return 350 - (value / maxValue) * 280;
  };

  const getXPosition = (index: number) => {
    return 100 + (index * (1000 / Math.max(chartData.length - 1, 1)));
  };

  const createPath = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = getXPosition(index);
        const y = getYPosition(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      {/* Filter Controls */}
      <div className="space-y-4 mb-6">
        {/* Date and Unit Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-black">
              Tanggal Awal:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-black">
              Tanggal Akhir:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-black">Satuan:</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            >
              <option value="hari">Hari</option>
              <option value="minggu">Minggu</option>
              <option value="bulan">Bulan</option>
              <option value="tahun">Tahun</option>
            </select>
          </div>
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setSortBy("year");
              setSortOrder("asc");
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset Filter
          </button>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-black">Urutkan berdasarkan:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("year")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "year"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {unit === "tahun" ? "Tahun" : unit === "bulan" ? "Bulan" : unit === "minggu" ? "Minggu" : "Hari"}
            </button>
            <button
              onClick={() => setSortBy("sampahTertangani")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "sampahTertangani"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Sampah Tertangani
            </button>
            <button
              onClick={() => setSortBy("produksiSampah")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "produksiSampah"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Produksi Sampah
            </button>
            <button
              onClick={() => setSortBy("peningkatanPengelolaan")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "peningkatanPengelolaan"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Peningkatan Pengelolaan
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortOrder === "asc"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              ↑ Naik
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortOrder === "desc"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              ↓ Turun
            </button>
          </div>
        </div>

        {/* Data Info */}
        <div className="text-sm text-gray-600">
          Menampilkan {chartData.length} dari {rawChartData.filter(d => d.unit === unit).length} data
          {startDate && ` | Dari: ${startDate}`}
          {endDate && ` | Sampai: ${endDate}`}
          {` | Satuan: ${unit === "tahun" ? "Tahun" : unit === "bulan" ? "Bulan" : unit === "minggu" ? "Minggu" : "Hari"}`}
          {` | Diurutkan berdasarkan: ${
            sortBy === "year" ? (unit === "tahun" ? "Tahun" : unit === "bulan" ? "Bulan" : unit === "minggu" ? "Minggu" : "Hari") :
            sortBy === "sampahTertangani" ? "Sampah Tertangani" :
            sortBy === "produksiSampah" ? "Produksi Sampah" :
            "Peningkatan Pengelolaan"
          } (${sortOrder === "asc" ? "Naik" : "Turun"})`}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-green-50 rounded-lg p-6">
        <svg width="100%" height="400" viewBox="0 0 1100 400">
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1="80"
              y1={70 + i * 56}
              x2="1020"
              y2={70 + i * 56}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {(() => {
            const maxVal = Math.max(...chartData.flatMap(d => [d.sampahTertangani, d.produksiSampah, d.peningkatanPengelolaan]));
            const step = maxVal / 5;
            return Array.from({length: 6}, (_, i) => Math.round(maxVal - i * step)).map((value, i) => (
              <text
                key={i}
                x="70"
                y={75 + i * 56}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {value}
              </text>
            ));
          })()}

          {/* Chart Lines */}
          {/* Sampah Tertangani (Blue) */}
          <path
            d={createPath(chartData.map((d) => d.sampahTertangani))}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          
          {/* Produksi Sampah (Red) */}
          <path
            d={createPath(chartData.map((d) => d.produksiSampah))}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
          
          {/* Peningkatan Pengelolaan (Green) */}
          <path
            d={createPath(chartData.map((d) => d.peningkatanPengelolaan))}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />

          {/* Data Points and Labels */}
          {chartData.map((data, index) => {
            const x = getXPosition(index);
            return (
              <g key={index}>
                {/* Sampah Tertangani Point */}
                <circle
                  cx={x}
                  cy={getYPosition(data.sampahTertangani)}
                  r="4"
                  fill="#60a5fa"
                />
                <text
                  x={x}
                  y={getYPosition(data.sampahTertangani) - 10}
                  textAnchor="middle"
                  className="text-xs fill-blue-600 font-medium"
                >
                  {data.sampahTertangani.toFixed(2)}
                </text>

                {/* Produksi Sampah Point */}
                <circle
                  cx={x}
                  cy={getYPosition(data.produksiSampah)}
                  r="4"
                  fill="#ef4444"
                />
                <text
                  x={x}
                  y={getYPosition(data.produksiSampah) - 10}
                  textAnchor="middle"
                  className="text-xs fill-red-600 font-medium"
                >
                  {data.produksiSampah.toFixed(2)}
                </text>

                {/* Peningkatan Pengelolaan Point */}
                <circle
                  cx={x}
                  cy={getYPosition(data.peningkatanPengelolaan)}
                  r="4"
                  fill="#22c55e"
                />
                <text
                  x={x}
                  y={getYPosition(data.peningkatanPengelolaan) - 10}
                  textAnchor="middle"
                  className="text-xs fill-green-600 font-medium"
                >
                  {data.peningkatanPengelolaan.toFixed(2)}
                </text>

                {/* X-axis labels */}
                <text
                  x={x}
                  y="385"
                  textAnchor="middle"
                  className="text-sm fill-black font-medium"
                >
                  {data.period}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-400"></div>
            <span className="text-sm text-black">Sampah tertangani</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500"></div>
            <span className="text-sm text-black">Produksi sampah</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-500"></div>
            <span className="text-sm text-black">
              Peningkatan pengelolaan sampah regional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
