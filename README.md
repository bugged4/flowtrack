# 🌩️ Weather-Aware Storm Dashboard

This Next.js app shows a **Storm Dashboard** only when the weather is actually stormy in your location, and a **Calm Weather** view when it's nice outside.

## 📁 Project Structure

```
your-app/
├── app/
│   ├── page.js                    # Main page (checks weather & routes)
│   ├── layout.js                  # Root layout (already exists)
│   └── globals.css                # Storm animations & styles
├── components/
│   ├── StormWeather.js            # Storm dashboard component
│   └── CalmWeather.js             # Calm weather component
└── lib/
    └── weatherService.js          # Weather API utilities
```

## 🚀 Setup Instructions

### 1. **Create the folder structure**

```bash
# In your Next.js project root
mkdir -p components
mkdir -p lib
```

### 2. **Place files in correct locations**

Copy the files I generated into these exact locations:

**`app/page.js`** ← Main page (weather checker & router)
**`app/globals.css`** ← Replace existing with new one (has storm animations)
**`components/StormWeather.js`** ← Storm dashboard view
**`components/CalmWeather.js`** ← Calm weather view
**`lib/weatherService.js`** ← Weather API service

### 3. **Install required dependencies**

```bash
npm install framer-motion react-tsparticles
```

### 4. **Update your layout.js** (if needed)

Make sure your `app/layout.js` imports the globals.css:

```javascript
import "./globals.css";
```

### 5. **Run the app**

```bash
npm run dev
```

## 🎯 How It Works

### **Flow Diagram:**

```
User visits page
    ↓
Browser requests location permission
    ↓
Get user's coordinates (latitude, longitude)
    ↓
Fetch current weather from Open-Meteo API
    ↓
Check if weather is stormy:
    - Weather code (rain, thunderstorm, snow)
    - Precipitation > 2.5 mm/h
    - Wind speed > 30 km/h
    ↓
    ├─→ YES (Stormy) → Show StormWeather.js
    │                    - Animated rain
    │                    - Lightning flashes
    │                    - Thunder shake
    │                    - Dark storm clouds
    │
    └─→ NO (Calm) → Show CalmWeather.js
                     - Sunny sky
                     - Fluffy clouds
                     - Outdoor activities suggestions
```

### **Key Components:**

1. **`page.js`** (Main orchestrator)
   - Requests user location
   - Fetches weather data
   - Decides which view to show
   - Updates every 10 minutes
   - Handles loading & error states

2. **`weatherService.js`** (Weather logic)
   - `getUserLocation()` - Gets GPS coordinates
   - `getCurrentWeather()` - Calls Open-Meteo API
   - `isStormyWeather()` - Determines if conditions are stormy
   - Uses WMO weather codes to identify storms

3. **`StormWeather.js`** (Storm view)
   - Shows when weather is stormy
   - Animated rain (CSS + particles)
   - Random lightning flashes
   - Thunder shake effect
   - Real weather data display

4. **`CalmWeather.js`** (Calm view)
   - Shows when weather is nice
   - Sunny with clouds
   - Outdoor activity suggestions
   - Current weather display

## 🌦️ Weather Detection Logic

The app considers weather "stormy" if ANY of these conditions are met:

### Weather Codes (WMO standard):
- **51-57**: Drizzle
- **61-67**: Rain
- **80-82**: Rain showers
- **85-86**: Snow showers
- **95-99**: Thunderstorms

### Or Severe Conditions:
- Precipitation > 2.5 mm/hour
- Wind speed > 30 km/h

## 🔧 Customization

### **Change storm detection sensitivity:**

Edit `lib/weatherService.js`:

```javascript
const hasHeavyPrecipitation = precipitation > 1.0; // More sensitive
const hasStrongWind = wind_speed_10m > 20; // More sensitive
```

### **Change refresh interval:**

Edit `app/page.js`:

```javascript
// Currently: 10 minutes
const interval = setInterval(fetchWeather, 5 * 60 * 1000); // 5 minutes
```

### **Test storm view without waiting for weather:**

In `app/page.js`, temporarily force storm mode:

```javascript
setIsStormy(true); // Force storm view
// setIsStormy(isStormyWeather(weather)); // Normal logic
```

## 📍 Location Permissions

The app requires location access to work:

1. **First visit**: Browser will ask for permission
2. **If denied**: Shows error screen with retry button
3. **If blocked**: User needs to enable in browser settings

### How to enable location:

**Chrome:** Settings → Privacy → Site Settings → Location
**Firefox:** Address bar → 🔒 icon → Permissions
**Safari:** Settings → Websites → Location

## 🌐 API Usage

Uses **Open-Meteo API** (free, no key required):
- No rate limits for reasonable use
- Returns current weather conditions
- Global coverage
- Updates every 15 minutes

**API URL format:**
```
https://api.open-meteo.com/v1/forecast?
  latitude={lat}&
  longitude={lon}&
  current=temperature_2m,weather_code,precipitation,wind_speed_10m
```

## 🐛 Troubleshooting

### **"Location access required" error**
- User denied location permission
- Browser doesn't support geolocation
- **Fix:** Allow location in browser settings

### **Weather not updating**
- API might be temporarily down
- **Fix:** Check console logs, refresh page

### **Storm view not showing during rain**
- Weather codes might not match your region's rain type
- **Fix:** Lower thresholds in `isStormyWeather()`

### **Always shows loading**
- API request failed
- **Fix:** Check network tab in browser dev tools

## 🎨 Styling Notes

- All storm animations in `globals.css`
- Uses Tailwind for layout
- Framer Motion for smooth transitions
- react-tsparticles for rain effects

## 📝 Next Steps

Want to enhance the app? Here are ideas:

1. **Add more weather views:**
   - Snowy weather dashboard
   - Foggy weather theme
   - Extreme heat theme

2. **Add weather-based features:**
   - Recommend indoor/outdoor tasks
   - Adjust music based on weather
   - Show weather forecast

3. **Store location:**
   - Save to localStorage (avoid repeat prompts)
   - Manual location override
   - Multiple location support

4. **Add actual dashboard features:**
   - Task management (from your original components)
   - AI assistant integration
   - Music player

## ⚡ Quick Test

To quickly test if everything works:

1. Allow location when prompted
2. Check browser console for weather log
3. Should see: `"Current Weather: { description: '...', isStormy: true/false }"`
4. View will switch based on actual weather

---

**Made with ⚡ by your friendly weather-aware dashboard**
