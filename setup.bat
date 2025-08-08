@echo off
REM Website Lomba - Setup Script for Windows
REM Sistem Analisis Sampah Aerial

echo 🚀 Setting up Website Lomba project...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js ^>= 18.0.0
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version must be ^>= 18.0.0. Current version: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm ^>= 9.0.0
    pause
    exit /b 1
)

REM Check npm version
for /f "tokens=1 delims=." %%a in ('npm --version') do set NPM_VERSION=%%a
if %NPM_VERSION% lss 9 (
    echo ❌ npm version must be ^>= 9.0.0. Current version: 
    npm --version
    pause
    exit /b 1
)

echo ✅ npm version: 
npm --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create environment file if it doesn't exist
if not exist .env.local (
    echo 🔧 Creating .env.local file...
    (
        echo # API Configuration
        echo NEXT_PUBLIC_API_URL=http://localhost:3000/api
        echo.
        echo # Development
        echo NODE_ENV=development
    ) > .env.local
    echo ✅ .env.local created
) else (
    echo ✅ .env.local already exists
)

REM Run type check
echo 🔍 Running TypeScript type check...
npm run type-check

if %errorlevel% neq 0 (
    echo ⚠️  TypeScript errors found. Please fix them before continuing.
) else (
    echo ✅ TypeScript type check passed
)

REM Run linting
echo 🔍 Running ESLint...
npm run lint

if %errorlevel% neq 0 (
    echo ⚠️  ESLint errors found. Please fix them before continuing.
) else (
    echo ✅ ESLint check passed
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Run 'npm run dev' to start the development server
echo 2. Open http://localhost:3000 in your browser
echo 3. Check the README.md file for more information
echo.
echo 📁 Project structure:
echo - app/ - Next.js app directory
echo - app/analisis/ - AI Analysis page
echo - app/data/ - Data Reports page
echo - app/section/ - Reusable components
echo - public/ - Static assets
echo.
echo 🔧 Available scripts:
echo - npm run dev - Start development server
echo - npm run build - Build for production
echo - npm run start - Start production server
echo - npm run lint - Run ESLint
echo - npm run type-check - Run TypeScript check
echo.
echo 📚 Documentation:
echo - README.md - Project overview and setup
echo - REQUIREMENTS.md - Detailed requirements
echo - package.json - Dependencies and scripts
echo.
pause
