import { NextRequest, NextResponse } from 'next/server';

interface DatabaseQueryParams {
  startDate?: string;
  endDate?: string;
  unit?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
}

// Simulasi data dari database
const mockDatabaseData = [
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
  // Data bulanan
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
];

export async function POST(request: NextRequest) {
  try {
    const params: DatabaseQueryParams = await request.json();
    
    // Simulasi query database dengan filtering dan sorting
    let filteredData = [...mockDatabaseData];

    // Filter by unit
    if (params.unit) {
      filteredData = filteredData.filter(item => item.unit === params.unit);
    }

    // Filter by date range
    if (params.startDate) {
      const start = new Date(params.startDate);
      filteredData = filteredData.filter(item => item.date >= start);
    }
    if (params.endDate) {
      const end = new Date(params.endDate);
      filteredData = filteredData.filter(item => item.date <= end);
    }

    // Sort data
    if (params.sortBy) {
      const sortField = params.sortBy === 'year' ? 'period' : params.sortBy;
      const sortOrder = params.sortOrder || 'ASC';
      
      filteredData.sort((a, b) => {
        let aValue: any = a[sortField as keyof typeof a];
        let bValue: any = b[sortField as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "ASC" 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortOrder === "ASC"
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }

    // Apply pagination
    if (params.offset) {
      filteredData = filteredData.slice(params.offset);
    }
    if (params.limit) {
      filteredData = filteredData.slice(0, params.limit);
    }

    // Simulasi delay database
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error in chart-data API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Contoh implementasi dengan database yang sebenarnya
export async function GET(request: NextRequest) {
  try {
    // Contoh dengan Prisma ORM
    /*
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();
    
    const { searchParams } = new URL(request.url);
    const unit = searchParams.get('unit');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';
    
    const data = await prisma.chartData.findMany({
      where: {
        ...(unit && { unit }),
        ...(startDate && { date: { gte: new Date(startDate) } }),
        ...(endDate && { date: { lte: new Date(endDate) } }),
      },
      orderBy: {
        [sortBy === 'year' ? 'period' : sortBy]: sortOrder,
      },
    });
    
    return NextResponse.json(data);
    */

    // Contoh dengan MongoDB
    /*
    import { MongoClient } from 'mongodb';
    
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('your-database');
    const collection = db.collection('chart_data');
    
    const filter: any = {};
    if (unit) filter.unit = unit;
    if (startDate) filter.date = { $gte: new Date(startDate) };
    if (endDate) filter.date = { $lte: new Date(endDate) };
    
    const sortField = sortBy === 'year' ? 'period' : sortBy;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    
    const data = await collection
      .find(filter)
      .sort({ [sortField]: sortDirection })
      .toArray();
    
    return NextResponse.json(data);
    */

    // Contoh dengan MySQL/PostgreSQL
    /*
    import { sql } from '@vercel/postgres';
    
    const { rows } = await sql`
      SELECT 
        year,
        period,
        sampah_tertangani as "sampahTertangani",
        produksi_sampah as "produksiSampah",
        peningkatan_pengelolaan as "peningkatanPengelolaan",
        date,
        unit
      FROM chart_data 
      WHERE 1=1
        ${unit ? sql`AND unit = ${unit}` : sql``}
        ${startDate ? sql`AND date >= ${startDate}` : sql``}
        ${endDate ? sql`AND date <= ${endDate}` : sql``}
      ORDER BY 
        ${sortBy === 'year' ? sql`period` : sql`${sortBy}`} 
        ${sortOrder === 'desc' ? sql`DESC` : sql`ASC`}
    `;
    
    return NextResponse.json(rows);
    */

    return NextResponse.json(mockDatabaseData);
  } catch (error) {
    console.error('Error in chart-data API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
