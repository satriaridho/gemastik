# NPM Requirements - Website Lomba

## 📦 Package.json Summary

### Core Dependencies
```json
{
  "name": "website-lomba",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Production Dependencies
```json
{
  "dependencies": {
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
}
```

### Development Dependencies
```json
{
  "devDependencies": {
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
}
```

## 🚀 Installation Commands

### Quick Setup
```bash
# Clone repository
git clone <repository-url>
cd website-lomba

# Install dependencies
npm install

# Start development server
npm run dev
```

### Manual Installation
```bash
# Install core dependencies
npm install react@19.1.0 react-dom@19.1.0 next@15.4.6

# Install UI libraries
npm install lucide-react@^0.263.1 recharts@^2.8.0 framer-motion@^10.16.4

# Install utility libraries
npm install react-dropzone@^14.2.3 date-fns@^2.30.0 clsx@^2.0.0 tailwind-merge@^1.14.0

# Install development dependencies
npm install --save-dev typescript@^5 @types/node@^20 @types/react@^19 @types/react-dom@^19

# Install styling dependencies
npm install --save-dev @tailwindcss/postcss@^4 tailwindcss@^4

# Install code quality tools
npm install --save-dev eslint@^8 eslint-config-next@15.4.6 @typescript-eslint/eslint-plugin@^6.0.0 @typescript-eslint/parser@^6.0.0 prettier@^3.0.0 prettier-plugin-tailwindcss@^0.5.0
```

## 📋 Scripts

### Available Commands
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Usage
```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Additional Commands
npx prettier --write .    # Format code
npm run lint -- --fix     # Fix linting issues
```

## 🔧 Configuration Files

### TypeScript (tsconfig.json)
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
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint (.eslintrc.json)
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier (.prettierrc)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Tailwind CSS (tailwind.config.ts)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f0",
          100: "#d2f5d2",
          200: "#c8eac8",
          300: "#b6e6b6",
          400: "#a3d6a3",
          500: "#3a7c3a",
          600: "#22c55e",
          700: "#16a34a",
          800: "#15803d",
          900: "#166534",
        },
        background: "#e6fae6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

### PostCSS (postcss.config.mjs)
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

## 📦 Dependencies Explanation

### Core Framework
- **Next.js 15.4.6**: React framework with App Router
- **React 19.1.0**: UI library
- **React DOM 19.1.0**: React DOM rendering

### UI & Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **clsx & tailwind-merge**: Utility for conditional classes

### Data Visualization
- **Recharts**: Chart library for React
- **date-fns**: Date utility library

### File Handling
- **react-dropzone**: File upload component

### Development Tools
- **TypeScript**: Type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Type definitions**: @types/* packages

## 🔍 Version Compatibility

### Node.js Requirements
- **Minimum**: 18.0.0
- **Recommended**: 20.x.x
- **Maximum**: Latest LTS

### NPM Requirements
- **Minimum**: 9.0.0
- **Recommended**: Latest stable

### Browser Support
- **Chrome**: >= 90
- **Firefox**: >= 88
- **Safari**: >= 14
- **Edge**: >= 90

## 🚀 Deployment Requirements

### Production Build
```bash
# Build application
npm run build

# Start production server
npm run start
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Vercel Deployment
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 📊 Bundle Analysis

### Expected Bundle Sizes
- **Initial Load**: < 500KB
- **JavaScript**: ~300KB
- **CSS**: ~50KB
- **Images**: ~100KB

### Optimization Features
- **Code Splitting**: Automatic with Next.js
- **Tree Shaking**: Enabled
- **Minification**: Production builds
- **Image Optimization**: Next.js Image component

## 🔧 Troubleshooting

### Common Issues
```bash
# Clear cache
rm -rf .next node_modules/.cache
npm install

# Reset TypeScript
rm -rf .next
npm run type-check

# Fix ESLint issues
npm run lint -- --fix

# Update dependencies
npm update
```

### Version Conflicts
```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update <package-name>

# Install specific version
npm install <package-name>@<version>
```

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

### Useful Commands
```bash
# Check package versions
npm list

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix

# View package info
npm info <package-name>

# Search packages
npm search <package-name>
```

## 🎯 Performance Metrics

### Build Performance
- **Development Build**: < 30s
- **Production Build**: < 60s
- **Hot Reload**: < 2s

### Runtime Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔄 Maintenance

### Regular Updates
```bash
# Check for updates monthly
npm outdated

# Update dependencies quarterly
npm update

# Major version updates annually
npm install <package-name>@latest
```

### Security
```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

## 📋 Checklist

### Pre-Installation
- [ ] Node.js >= 18.0.0 installed
- [ ] NPM >= 9.0.0 installed
- [ ] Git installed
- [ ] Code editor configured

### Installation
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Development server running

### Post-Installation
- [ ] TypeScript compilation successful
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Application loads correctly

### Development
- [ ] Hot reload working
- [ ] Type checking enabled
- [ ] Linting on save
- [ ] Formatting on save
