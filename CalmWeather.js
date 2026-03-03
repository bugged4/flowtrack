"use client";

import { motion } from "framer-motion";

export default function CalmWeather({ weatherData }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-400 to-blue-300 overflow-hidden">
      {/* Sun */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: 360 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full shadow-2xl"
        style={{
          boxShadow: '0 0 60px 20px rgba(253, 224, 71, 0.5)'
        }}
      />

      {/* Fluffy clouds */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 w-64 h-24 bg-white rounded-full opacity-80"
        style={{ filter: 'blur(2px)' }}
      />
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-48 w-48 h-20 bg-white rounded-full opacity-70"
        style={{ filter: 'blur(2px)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
              ☀️
            </h1>
          </motion.div>
          
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-md">
            It's a Beautiful Day!
          </h2>
          
          <p className="text-2xl text-blue-100 mb-8">
            The storm dashboard only appears during stormy weather
          </p>

          {/* Weather info card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 max-w-lg mx-auto shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Current Weather
            </h3>
            
            {weatherData && (
              <div className="text-white space-y-2">
                <p className="text-lg">
                  🌡️ Temperature: {Math.round(weatherData.temperature_2m)}°C
                </p>
                <p className="text-lg">
                  💨 Wind Speed: {Math.round(weatherData.wind_speed_10m)} km/h
                </p>
                <p className="text-lg">
                  💧 Precipitation: {weatherData.precipitation} mm
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
              <p className="text-white text-sm">
                💡 The storm dashboard will automatically activate when there's rain, 
                thunderstorms, or strong winds in your area.
              </p>
            </div>
          </motion.div>

          {/* Activities suggestion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-5xl mb-3">🏃</div>
              <h3 className="text-white font-semibold text-lg">Go Outside</h3>
              <p className="text-blue-100 text-sm mt-2">Perfect weather for a walk!</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-5xl mb-3">📚</div>
              <h3 className="text-white font-semibold text-lg">Read Outside</h3>
              <p className="text-blue-100 text-sm mt-2">Find a nice sunny spot</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-5xl mb-3">🌳</div>
              <h3 className="text-white font-semibold text-lg">Nature Time</h3>
              <p className="text-blue-100 text-sm mt-2">Enjoy the sunshine</p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-lg border border-white/40 backdrop-blur-sm transition-all shadow-lg"
          >
            🔄 Refresh Weather
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
