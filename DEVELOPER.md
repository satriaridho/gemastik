# Developer Guide - Website Lomba

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- NPM >= 9.0.0
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd website-lomba

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
website-lomba/
├── app/                          # Next.js App Router
│   ├── analisis/                 # AI Analysis page
│   │   └── page.tsx             # Main analysis component
│   ├── api/                      # API routes
│   │   └── chart-data/
│   │       └── route.ts         # Chart data API endpoint
│   ├── data/                     # Data reports page
│   │   └── page.tsx             # Reports component
│   ├── section/                  # Reusable components
│   │   ├── ChartSection.tsx     # Chart visualization
│   │   ├── HeaderImage.tsx      # Header component
│   │   ├── LocationFilter.tsx   # Location filter
│   │   ├── MapCard.tsx          # Map component
│   │   └── Sidebar.tsx          # Navigation sidebar
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── public/                       # Static assets
│   ├── *.svg                    # SVG icons
│   └── favicon.ico              # Favicon
├── package.json                  # Dependencies & scripts
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── README.md                    # Project documentation
```

## 🎨 Component Architecture

### Page Components
- **Homepage** (`app/page.tsx`): Dashboard with charts and maps
- **Analysis** (`app/analisis/page.tsx`): AI video analysis
- **Data** (`app/data/page.tsx`): Data reports and tables

### Reusable Components
- **Sidebar** (`app/section/Sidebar.tsx`): Navigation component
- **ChartSection** (`app/section/ChartSection.tsx`): Data visualization
- **MapCard** (`app/section/MapCard.tsx`): Interactive map
- **LocationFilter** (`app/section/LocationFilter.tsx`): Location selection
- **HeaderImage** (`app/section/HeaderImage.tsx`): Header with image

## 🎯 Key Features Implementation

### 1. Video Analysis (`app/analisis/page.tsx`)
```typescript
// Video upload and playback
const [videoUrl, setVideoUrl] = useState<string | null>(null);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// File handling
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  setVideoUrl(url);
};
```

### 2. Chart Visualization (`app/section/ChartSection.tsx`)
```typescript
// Data filtering and sorting
const chartData = useMemo(() => {
  let filtered = [...rawChartData];
  
  // Filter by unit
  filtered = filtered.filter(item => item.unit === unit);
  
  // Sort data
  filtered.sort((a, b) => {
    // Sorting logic
  });
  
  return filtered;
}, [startDate, endDate, sortBy, sortOrder, unit]);
```

### 3. API Integration (`app/api/chart-data/route.ts`)
```typescript
// Database query simulation
export async function POST(request: NextRequest) {
  try {
    const params: DatabaseQueryParams = await request.json();
    
    // Filter and sort data
    let filteredData = [...mockDatabaseData];
    
    // Apply filters and sorting
    // Return JSON response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes
```typescript
// Color scheme
const colors = {
  primary: '#3a7c3a',      // Green
  secondary: '#b6e6b6',    // Light green
  background: '#e6fae6',   // Very light green
  text: '#000000',         // Black
  gray: '#6b7280'          // Gray
};

// Common class patterns
const commonClasses = {
  button: 'bg-[#b6e6b6] border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#a3d6a3] transition-colors',
  card: 'bg-white rounded-lg shadow-lg p-6',
  input: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
};
```

### Responsive Design
```typescript
// Mobile first approach
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  {/* Title */}
</h1>
```

## 🔧 Development Scripts

### Available Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality
```bash
# Format code
npx prettier --write .

# Check types
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📊 Data Management

### Chart Data Structure
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

### API Response Format
```typescript
interface ApiResponse {
  data: ChartData[];
  error?: string;
  status: number;
}
```

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Example test for ChartSection component
import { render, screen } from '@testing-library/react';
import ChartSection from '../app/section/ChartSection';

describe('ChartSection', () => {
  it('renders chart with data', () => {
    render(<ChartSection />);
    expect(screen.getByText('Hasil Analisis')).toBeInTheDocument();
  });
});
```

### Integration Testing
```typescript
// Example API test
describe('Chart Data API', () => {
  it('returns filtered data', async () => {
    const response = await fetch('/api/chart-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unit: 'tahun' })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeInstanceOf(Array);
  });
});
```

## 🔒 Security Considerations

### Input Validation
```typescript
// File upload validation
const validateFile = (file: File): boolean => {
  const allowedTypes = ['video/mp4', 'video/avi', 'video/mov'];
  const maxSize = 100 * 1024 * 1024; // 100MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize;
};
```

### XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input);
};
```

## 📈 Performance Optimization

### Code Splitting
```typescript
// Lazy load components
import dynamic from 'next/dynamic';

const ChartSection = dynamic(() => import('./ChartSection'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false
});
```

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.svg"
  alt="Logo"
  width={100}
  height={50}
  priority
/>
```

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NODE_ENV=production
```

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🔄 State Management

### React Hooks Pattern
```typescript
// Custom hook for chart data
const useChartData = (filters: ChartFilters) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/chart-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters)
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  return { data, loading };
};
```

## 🐛 Debugging

### Development Tools
```typescript
// Debug logging
const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}`, data);
  }
};

// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

### Browser DevTools
- React Developer Tools
- Network tab for API calls
- Console for errors and logs
- Performance tab for optimization

## 📚 Best Practices

### Code Organization
1. **Component Structure**: One component per file
2. **Naming Convention**: PascalCase for components, camelCase for functions
3. **File Organization**: Group related components in folders
4. **Import Order**: External libraries first, then internal imports

### TypeScript Usage
```typescript
// Strict typing
interface Props {
  title: string;
  data: ChartData[];
  onFilterChange: (filters: FilterOptions) => void;
}

// Generic types
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  return [storedValue, setStoredValue] as const;
};
```

### Error Handling
```typescript
// Try-catch pattern
const handleApiCall = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    // Show user-friendly error message
    return null;
  }
};
```

## 🤝 Contributing

### Git Workflow
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push branch: `git push origin feature/new-feature`
4. Create pull request

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] No console.log in production code
- [ ] Error handling is implemented
- [ ] Responsive design is maintained
- [ ] Performance is considered
- [ ] Tests are added/updated

## 📞 Support

### Getting Help
1. Check existing documentation
2. Search GitHub issues
3. Create new issue with detailed description
4. Contact maintainers

### Common Issues
- **Build errors**: Check Node.js version and dependencies
- **TypeScript errors**: Run `npm run type-check`
- **Styling issues**: Check Tailwind CSS classes
- **API errors**: Verify environment variables

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
