#!/bin/bash

# Website Lomba - Setup Script
# Sistem Analisis Sampah Aerial

echo "🚀 Setting up Website Lomba project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be >= 18.0.0. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm >= 9.0.0"
    exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -lt 9 ]; then
    echo "❌ npm version must be >= 9.0.0. Current version: $(npm -v)"
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Development
NODE_ENV=development
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Run type check
echo "🔍 Running TypeScript type check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript errors found. Please fix them before continuing."
else
    echo "✅ TypeScript type check passed"
fi

# Run linting
echo "🔍 Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  ESLint errors found. Please fix them before continuing."
else
    echo "✅ ESLint check passed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Check the README.md file for more information"
echo ""
echo "📁 Project structure:"
echo "- app/ - Next.js app directory"
echo "- app/analisis/ - AI Analysis page"
echo "- app/data/ - Data Reports page"
echo "- app/section/ - Reusable components"
echo "- public/ - Static assets"
echo ""
echo "🔧 Available scripts:"
echo "- npm run dev - Start development server"
echo "- npm run build - Build for production"
echo "- npm run start - Start production server"
echo "- npm run lint - Run ESLint"
echo "- npm run type-check - Run TypeScript check"
echo ""
echo "📚 Documentation:"
echo "- README.md - Project overview and setup"
echo "- REQUIREMENTS.md - Detailed requirements"
echo "- package.json - Dependencies and scripts"
