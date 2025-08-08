# Requirements - Website Lomba Sistem Analisis Sampah Aerial

## 📋 Overview
Aplikasi web untuk analisis sampah menggunakan teknologi AI dan drone untuk deteksi sampah dari udara.

## 🎯 Functional Requirements

### 1. Dashboard (`/`)
- **Header Section**
  - Logo aplikasi
  - Judul aplikasi
  - Background image yang menarik

- **Location Filter**
  - Dropdown untuk memilih lokasi
  - Filter berdasarkan provinsi/kota
  - Real-time update data berdasarkan lokasi

- **Map Card**
  - Peta interaktif menampilkan lokasi sampah
  - Marker untuk setiap titik sampah
  - Popup informasi detail sampah
  - Zoom dan pan controls

- **Chart Section**
  - Grafik line chart untuk data sampah
  - Filter berdasarkan:
    - Tanggal awal dan akhir
    - Satuan waktu (hari/minggu/bulan/tahun)
    - Sorting berdasarkan metrik
  - Legend untuk setiap jenis data
  - Responsive chart design

### 2. Analisis AI (`/analisis`)
- **Video Upload**
  - Drag & drop file video
  - Support format: MP4, AVI, MOV
  - File size limit: 100MB
  - Progress indicator

- **Video Player**
  - Custom video controls
  - Play/pause functionality
  - Video timeline
  - Fullscreen support

- **AI Analysis**
  - Real-time object detection
  - Bounding box overlay
  - Confidence score display
  - Multiple object detection

- **Analysis Results**
  - Koordinat GPS lokasi
  - Jumlah sampah terdeteksi
  - Tingkat keparahan (Rendah/Sedang/Tinggi)
  - Akurasi deteksi (%)
  - Ukuran area (m²)
  - Status deteksi

### 3. Data Laporan (`/data`)
- **Data Table**
  - Tabel data laporan sampah
  - Pagination
  - Search functionality
  - Sort by columns
  - Filter by date range

- **Export Features**
  - Export to PDF
  - Export to Excel
  - Export to CSV

## 🛠️ Technical Requirements

### Frontend
- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Routing**: Next.js App Router
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **File Upload**: React Dropzone

### Backend
- **Runtime**: Node.js >= 18.0.0
- **API**: Next.js API Routes
- **Database**: (Optional) PostgreSQL/MongoDB
- **File Storage**: Local storage / Cloud storage

### Development Tools
- **Package Manager**: NPM >= 9.0.0
- **Linting**: ESLint + TypeScript ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in

## 📊 Data Models

### Chart Data
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

### Analysis Result
```typescript
interface AnalysisResult {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: string;
  detectedCount: number;
  severity: "Rendah" | "Sedang" | "Tinggi";
  accuracy: number;
  areaSize: number;
  status: "Terdeteksi" | "Tidak Terdeteksi";
  timestamp: Date;
}
```

### Report Data
```typescript
interface ReportData {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  detectedItems: number;
  severity: string;
  accuracy: number;
  createdAt: Date;
  updatedAt: Date;
  status: "Pending" | "Processed" | "Completed";
}
```

## 🎨 UI/UX Requirements

### Design System
- **Color Palette**:
  - Primary: Green (#3a7c3a)
  - Secondary: Light Green (#b6e6b6)
  - Background: Light Green (#e6fae6)
  - Text: Black (#000000)
  - Gray: (#6b7280)

- **Typography**:
  - Font Family: Inter
  - Headings: Bold, 24px-48px
  - Body: Regular, 14px-16px
  - Captions: Regular, 12px

- **Spacing**:
  - Base unit: 4px
  - Container padding: 24px
  - Component spacing: 16px-32px

### Responsive Design
- **Mobile**: < 768px
  - Single column layout
  - Stacked components
  - Touch-friendly buttons

- **Tablet**: 768px - 1024px
  - Two-column layout
  - Sidebar navigation
  - Medium-sized charts

- **Desktop**: > 1024px
  - Multi-column layout
  - Full sidebar
  - Large charts and maps

### Accessibility
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**
- **Screen Reader Support**
- **High Contrast Mode**
- **Focus Indicators**

## 🔒 Security Requirements

### Input Validation
- File upload validation
- File type restrictions
- File size limits
- XSS prevention
- SQL injection prevention

### Data Protection
- Environment variables for sensitive data
- HTTPS enforcement
- CORS configuration
- Input sanitization

### Authentication (Future)
- User login/logout
- Role-based access control
- Session management
- Password security

## 📈 Performance Requirements

### Loading Times
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Bundle Size**: < 500KB initial load
- **Caching**: Browser and CDN caching

### Scalability
- **Concurrent Users**: 100+ users
- **Data Volume**: 10,000+ records
- **File Storage**: 1GB+ video files
- **API Response**: < 200ms

## 🧪 Testing Requirements

### Unit Testing
- Component testing
- Hook testing
- Utility function testing
- API route testing

### Integration Testing
- User flow testing
- API integration testing
- Database integration testing

### E2E Testing
- Critical user journeys
- Cross-browser testing
- Mobile responsiveness testing

## 📱 Browser Support

### Required
- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### Optional
- Internet Explorer 11 (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Requirements

### Environment
- **Production**: Vercel/Netlify
- **Staging**: Vercel Preview
- **Development**: Local development

### CI/CD
- **GitHub Actions** or **Vercel Git Integration**
- **Automated testing**
- **Automated deployment**
- **Environment management**

### Monitoring
- **Error tracking**: Sentry
- **Performance monitoring**: Vercel Analytics
- **Uptime monitoring**: Status page

## 📋 Non-Functional Requirements

### Reliability
- **Uptime**: 99.9%
- **Error Rate**: < 0.1%
- **Data Backup**: Daily automated backups
- **Disaster Recovery**: 24-hour recovery time

### Maintainability
- **Code Quality**: ESLint + Prettier
- **Documentation**: Comprehensive README
- **Code Reviews**: Required for all changes
- **Version Control**: Git with conventional commits

### Usability
- **User Training**: Minimal required
- **Help System**: Inline help and tooltips
- **Error Messages**: Clear and actionable
- **Loading States**: Clear feedback

## 🔄 Future Enhancements

### Phase 2
- User authentication
- Real-time notifications
- Advanced analytics
- Mobile app

### Phase 3
- Machine learning improvements
- Real-time video processing
- Advanced reporting
- Integration with external systems

## 📞 Support & Maintenance

### Documentation
- **User Manual**: Step-by-step guides
- **API Documentation**: OpenAPI/Swagger
- **Developer Guide**: Setup and contribution
- **Troubleshooting**: Common issues and solutions

### Support
- **Issue Tracking**: GitHub Issues
- **Feature Requests**: GitHub Discussions
- **Bug Reports**: Detailed templates
- **Response Time**: 24 hours for critical issues
