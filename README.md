# Website Lomba - Sistem Pengelolaan Data Sampah

## Cara Melakukan Sorting Data dari Database

### 1. Sorting di Level Database (Recommended)

Ini adalah pendekatan yang paling efisien karena sorting dilakukan di database:

#### MySQL/PostgreSQL
```sql
SELECT 
  year,
  period,
  sampah_tertangani as sampahTertangani,
  produksi_sampah as produksiSampah,
  peningkatan_pengelolaan as peningkatanPengelolaan,
  date,
  unit
FROM chart_data 
WHERE 1=1
  AND unit = 'tahun'
  AND date >= '2020-01-01'
  AND date <= '2024-12-31'
ORDER BY 
  period ASC  -- atau DESC untuk descending
LIMIT 100
OFFSET 0;
```

#### MongoDB
```javascript
const filter = {
  unit: 'tahun',
  date: { 
    $gte: new Date('2020-01-01'),
    $lte: new Date('2024-12-31')
  }
};

const sort = {
  period: 1  // 1 untuk ASC, -1 untuk DESC
};

const data = await collection
  .find(filter)
  .sort(sort)
  .limit(100)
  .toArray();
```

#### Prisma ORM
```typescript
const data = await prisma.chartData.findMany({
  where: {
    unit: 'tahun',
    date: {
      gte: new Date('2020-01-01'),
      lte: new Date('2024-12-31')
    }
  },
  orderBy: {
    period: 'asc'  // atau 'desc'
  },
  take: 100,
  skip: 0
});
```

### 2. Sorting di Client-Side (Fallback)

Jika database tidak mendukung sorting atau untuk data yang sudah di-cache:

```typescript
const sortDataClientSide = (data: ChartData[], sortBy: SortBy, sortOrder: SortOrder) => {
  return [...data].sort((a, b) => {
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
};
```

### 3. Implementasi API Route

Buat file `app/api/chart-data/route.ts`:

```typescript
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

export async function POST(request: NextRequest) {
  try {
    const params: DatabaseQueryParams = await request.json();
    
    // Implementasi query database sesuai dengan database yang digunakan
    // Contoh untuk MySQL/PostgreSQL:
    
    const query = `
      SELECT 
        year,
        period,
        sampah_tertangani as sampahTertangani,
        produksi_sampah as produksiSampah,
        peningkatan_pengelolaan as peningkatanPengelolaan,
        date,
        unit
      FROM chart_data 
      WHERE 1=1
        ${params.startDate ? `AND date >= '${params.startDate}'` : ''}
        ${params.endDate ? `AND date <= '${params.endDate}'` : ''}
        ${params.unit ? `AND unit = '${params.unit}'` : ''}
      ORDER BY 
        ${params.sortBy === 'year' ? 'period' : params.sortBy} 
        ${params.sortOrder || 'ASC'}
      ${params.limit ? `LIMIT ${params.limit}` : ''}
      ${params.offset ? `OFFSET ${params.offset}` : ''}
    `;
    
    // Execute query dan return hasil
    const data = await executeQuery(query);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in chart-data API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
```

### 4. Frontend Implementation

Di komponen React, gunakan `useEffect` untuk mengambil data dari database:

```typescript
const [chartData, setChartData] = useState<ChartData[]>([]);
const [loading, setLoading] = useState(false);

const fetchDataFromDatabase = async (params: DatabaseQueryParams) => {
  setLoading(true);
  try {
    const response = await fetch('/api/chart-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    setChartData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback ke data statis jika database error
    setChartData(rawChartData);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const params: DatabaseQueryParams = {
    startDate,
    endDate,
    unit,
    sortBy,
    sortOrder: sortOrder.toUpperCase() as "ASC" | "DESC"
  };
  
  fetchDataFromDatabase(params);
}, [startDate, endDate, unit, sortBy, sortOrder]);
```

### 5. Keuntungan dan Kerugian

#### Sorting di Database:
**Keuntungan:**
- Performa lebih baik untuk dataset besar
- Mengurangi transfer data
- Memanfaatkan index database
- Mendukung pagination yang efisien

**Kerugian:**
- Bergantung pada kemampuan database
- Lebih kompleks untuk implementasi
- Perlu optimasi query

#### Sorting di Client-Side:
**Keuntungan:**
- Implementasi lebih sederhana
- Fleksibel untuk berbagai jenis sorting
- Tidak bergantung pada database

**Kerugian:**
- Performa buruk untuk dataset besar
- Transfer data lebih banyak
- Tidak efisien untuk pagination

### 6. Best Practices

1. **Gunakan Index Database**: Pastikan kolom yang sering di-sort memiliki index
2. **Implementasi Pagination**: Untuk dataset besar, gunakan LIMIT dan OFFSET
3. **Caching**: Cache hasil query yang sering digunakan
4. **Error Handling**: Selalu sediakan fallback untuk data statis
5. **Loading State**: Tampilkan loading indicator saat mengambil data
6. **Optimasi Query**: Gunakan EXPLAIN untuk menganalisis performa query

### 7. Contoh Implementasi Lengkap

Lihat file `app/section/ChartSection.tsx` dan `app/api/chart-data/route.ts` untuk implementasi lengkap dengan:
- Sorting di database
- Client-side fallback
- Loading states
- Error handling
- Pagination support
