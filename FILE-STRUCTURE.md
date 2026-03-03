# 📂 FILE ORGANIZATION GUIDE

## Where to Put Each File

```
your-nextjs-project/
│
├── app/
│   ├── 📄 page.js                 ← REPLACE with new page.js
│   ├── 📄 layout.js               ← Keep your existing one (no changes needed)
│   └── 📄 globals.css             ← REPLACE with new globals.css
│
├── components/                     ← CREATE this folder if it doesn't exist
│   ├── 📄 StormWeather.js         ← ADD this file
│   └── 📄 CalmWeather.js          ← ADD this file
│
└── lib/                           ← CREATE this folder if it doesn't exist
    └── 📄 weatherService.js       ← ADD this file
```

## Step-by-Step Setup

### STEP 1: Create folders (if they don't exist)
```bash
cd your-project-folder
mkdir components
mkdir lib
```

### STEP 2: Add the files
```
1. Copy weatherService.js → lib/weatherService.js
2. Copy StormWeather.js → components/StormWeather.js
3. Copy CalmWeather.js → components/CalmWeather.js
4. Copy new page.js → app/page.js (REPLACE existing)
5. Copy new globals.css → app/globals.css (REPLACE existing)
```

### STEP 3: Install dependencies
```bash
npm install framer-motion react-tsparticles
```

### STEP 4: Run the app
```bash
npm run dev
```

### STEP 5: Test
1. Open http://localhost:3000
2. Allow location access when prompted
3. See storm or calm view based on real weather!

## Import Paths Explained

The files use these import paths:

```javascript
// In page.js:
import StormWeather from "@/components/StormWeather";
import CalmWeather from "@/components/CalmWeather";
import { getUserLocation, ... } from "@/lib/weatherService";
```

**`@/` means "start from project root"**
- `@/components/` → looks in `components/` folder
- `@/lib/` → looks in `lib/` folder
- `@/app/` → looks in `app/` folder

This is configured automatically by Next.js!

## File Dependencies

```
page.js
  ├─ imports → StormWeather.js (needs components folder)
  ├─ imports → CalmWeather.js (needs components folder)
  └─ imports → weatherService.js (needs lib folder)

StormWeather.js
  ├─ imports → framer-motion (npm package)
  ├─ imports → react-tsparticles (npm package)
  └─ uses → globals.css (for storm animations)

CalmWeather.js
  └─ imports → framer-motion (npm package)

weatherService.js
  └─ uses → browser's geolocation API (built-in)
```

## Checklist

Before running, make sure:

- [ ] ✅ `components/` folder exists
- [ ] ✅ `lib/` folder exists
- [ ] ✅ `StormWeather.js` is in components/
- [ ] ✅ `CalmWeather.js` is in components/
- [ ] ✅ `weatherService.js` is in lib/
- [ ] ✅ `page.js` is in app/ (replaced old one)
- [ ] ✅ `globals.css` is in app/ (replaced old one)
- [ ] ✅ Ran `npm install framer-motion react-tsparticles`
- [ ] ✅ `layout.js` imports globals.css

## Common Issues

### ❌ Error: "Cannot find module '@/components/StormWeather'"
**Fix:** Create `components/` folder and add `StormWeather.js` there

### ❌ Error: "Cannot find module '@/lib/weatherService'"
**Fix:** Create `lib/` folder and add `weatherService.js` there

### ❌ Error: "Module not found: Can't resolve 'framer-motion'"
**Fix:** Run `npm install framer-motion react-tsparticles`

### ❌ Storm animations not showing
**Fix:** Make sure you replaced `globals.css` with the new version

### ❌ Always shows loading screen
**Fix:** Check browser console for errors, might be location permission issue
