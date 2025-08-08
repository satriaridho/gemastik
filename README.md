# Website Lomba - Sistem Analisis Sampah Aerial

Aplikasi web untuk analisis sampah menggunakan teknologi AI dan drone untuk deteksi sampah dari udara.

## 🚀 Fitur Utama

- **Dashboard Interaktif**: Visualisasi data sampah dengan grafik dan peta
- **Analisis AI**: Upload dan analisis video aerial untuk deteksi sampah
- **Data Laporan**: Manajemen dan visualisasi laporan sampah
- **Filter Lokasi**: Filter data berdasarkan lokasi geografis
- **Responsive Design**: Antarmuka yang responsif untuk berbagai perangkat

## 📋 Requirements

### Node.js & NPM
- Node.js >= 18.0.0
- NPM >= 9.0.0

### Dependencies Utama
```json
{
  "react": "19.1.0",
  "react-dom": "19.1.0", 
  "next": "15.4.6",
  "lucide-react": "^0.263.1",
  "recharts": "^2.8.0",
  "framer-motion": "^10.16.4",
  "react-dropzone": "^14.2.3",
  "date-fns": "^2.30.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0"
}
```

### Dev Dependencies
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^8",
  "eslint-config-next": "15.4.6",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "prettier": "^3.0.0",
  "prettier-plugin-tailwindcss": "^0.5.0"
}
```

## 🛠️ Setup & Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd website-lomba
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Proyek

```
website-lomba/
├── app/
│   ├── analisis/          # Halaman analisis AI
│   ├── api/               # API routes
│   │   └── chart-data/    # Endpoint data grafik
│   ├── data/              # Halaman data laporan
│   ├── section/           # Komponen UI
│   │   ├── ChartSection.tsx
│   │   ├── HeaderImage.tsx
│   │   ├── LocationFilter.tsx
│   │   ├── MapCard.tsx
│   │   └── Sidebar.tsx
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── public/                # Static assets
├── package.json           # Dependencies
├── next.config.ts         # Next.js config
├── tsconfig.json          # TypeScript config
└── tailwind.config.js     # Tailwind CSS config
```

## 🎯 Fitur Detail

### 1. Dashboard (`/`)
- Header dengan gambar
- Filter lokasi
- Peta interaktif
- Grafik data sampah dengan filter:
  - Tanggal awal/akhir
  - Satuan waktu (hari/minggu/bulan/tahun)
  - Sorting berdasarkan berbagai metrik

### 2. Analisis AI (`/analisis`)
- Upload video aerial
- Kontrol play/pause video
- Deteksi sampah dengan bounding box
- Hasil analisis:
  - Koordinat lokasi
  - Jumlah sampah terdeteksi
  - Tingkat keparahan
  - Akurasi deteksi

### 3. Data Laporan (`/data`)
- Tabel data laporan sampah
- Filter dan pencarian
- Export data

## 🎨 Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components dengan Tailwind
- **Charts**: Recharts untuk visualisasi data
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **File Upload**: React Dropzone
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge

## 📊 Data Structure

### Chart Data Interface
```typescript
interface ChartData {
  year: string;
  period: string;
  sampahTertangani: number;
  produksiSampah: number;
  peningkatanPengelolaan: number;
  date: Date;
  unit: "hari" | "minggu" | "bulan" | "tahun";
}
```

## 🚀 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript type checking
```

## 🔧 Configuration Files

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🎯 Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 📱 Responsive Design

Aplikasi dirancang responsif dengan breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security

- Input validation untuk file upload
- Sanitasi data sebelum render
- CORS configuration untuk API routes
- Environment variables untuk sensitive data

## 📈 Performance

- Image optimization dengan Next.js
- Code splitting otomatis
- Lazy loading untuk komponen
- Bundle analysis dengan `@next/bundle-analyzer`

## 🧪 Testing

Untuk menambahkan testing:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 📝 License

MIT License - lihat file LICENSE untuk detail.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.
