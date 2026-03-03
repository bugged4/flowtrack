"use client";

import Particles from "react-tsparticles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StormWeather({ weatherData }) {
  const [lightningFlash, setLightningFlash] = useState(false);
  const [shake, setShake] = useState(false);

  // Thunder and lightning effect
  useEffect(() => {
    const triggerStorm = () => {
      const randomDelay = Math.random() * 15000 + 8000; // 8-23 seconds
      
      setTimeout(() => {
        // Lightning flash
        setLightningFlash(true);
        
        // Thunder shake after lightning (sound travels slower than light)
        setTimeout(() => {
          setShake(true);
          setTimeout(() => setShake(false), 300);
        }, 200);
        
        setTimeout(() => {
          setLightningFlash(false);
          triggerStorm(); // Schedule next storm
        }, 400);
      }, randomDelay);
    };

    triggerStorm();
  }, []);

  const rainConfig = {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#9fb7d6"
      },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1
        }
      },
      size: {
        value: { min: 1, max: 3 }
      },
      move: {
        enable: true,
        speed: { min: 8, max: 15 },
        direction: "bottom",
        straight: false,
        outModes: {
          default: "out"
        },
        attract: {
          enable: false
        }
      },
      shape: {
        type: "line"
      },
      line: {
        width: 2,
        height: 40
      }
    },
    detectRetina: true
  };

  // Create rain drops using CSS
  const rainDrops = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${0.5 + Math.random() * 1}s`,
    opacity: 0.3 + Math.random() * 0.4
  }));

  return (
    <div className={`relative min-h-screen storm-bg overflow-hidden ${shake ? 'thunder-shake' : ''}`}>
      {/* Multiple lightning flash effects */}
      <motion.div
        animate={{ 
          opacity: lightningFlash ? [0, 0.4, 0.2, 0.5, 0] : 0 
        }}
        transition={{ duration: 0.4 }}
        className="lightning-flash bg-white z-50"
      />
      
      {/* Subtle continuous lightning */}
      <motion.div
        animate={{ opacity: [0, 0.08, 0, 0.12, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatDelay: 10,
          times: [0, 0.1, 0.2, 0.3, 1]
        }}
        className="lightning-flash bg-blue-100 z-40"
      />

      {/* Fog layers */}
      <div className="fog" style={{ top: 0, opacity: 0.4 }} />
      <div className="fog" style={{ top: '30%', opacity: 0.3, animationDelay: '-10s' }} />
      
      {/* Heavy CSS rain drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className={`rain rain-layer-${(drop.id % 3) + 1}`}
            style={{
              left: drop.left,
              animationDelay: drop.animationDelay,
              animationDuration: drop.animationDuration,
              opacity: drop.opacity
            }}
          />
        ))}
      </div>

      {/* Particle rain */}
      <Particles 
        options={rainConfig} 
        className="absolute inset-0 z-10" 
      />
      
      {/* Dark storm clouds */}
      <div 
        className="cloud cloud-heavy" 
        style={{ 
          top: '5%', 
          left: '-10%', 
          animationDelay: '0s',
          background: 'rgba(30, 40, 60, 0.3)',
          filter: 'blur(100px)'
        }} 
      />
      <div 
        className="cloud cloud-heavy" 
        style={{ 
          top: '15%', 
          left: '30%', 
          animationDelay: '-15s',
          width: '800px',
          background: 'rgba(20, 30, 50, 0.4)',
          filter: 'blur(120px)'
        }} 
      />
      <div 
        className="cloud" 
        style={{ 
          top: '25%', 
          right: '-5%', 
          animationDelay: '-30s',
          background: 'rgba(40, 50, 70, 0.25)',
          filter: 'blur(90px)'
        }} 
      />
      
      {/* Main content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center wind-gust"
        >
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Storm Dashboard
          </h1>
          <p className="text-xl text-blue-200 mb-8 drop-shadow-lg">
            Embrace the storm, master productivity
          </p>
          
          {/* Glassmorphic card */}
          <motion.div 
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-2xl shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              ⚡ Storm Status: Active
            </h2>
            <div className="text-blue-100 space-y-3">
              {weatherData && (
                <>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🌡️</span>
                    <span>Temperature: {Math.round(weatherData.temperature_2m)}°C</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">💧</span>
                    <span>Precipitation: {weatherData.precipitation} mm/h</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">💨</span>
                    <span>Wind Speed: {Math.round(weatherData.wind_speed_10m)} km/h</span>
                  </p>
                </>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg border border-blue-400/30 backdrop-blur-sm transition-all"
            >
              Enter Dashboard
            </motion.button>
          </motion.div>

          {/* Additional info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-4xl mb-2">📋</div>
              <h3 className="text-white font-semibold">Tasks</h3>
              <p className="text-blue-200 text-sm">Manage your work</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <p className="text-blue-200 text-sm">Get help instantly</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-4xl mb-2">🎵</div>
              <h3 className="text-white font-semibold">Rain Sounds</h3>
              <p className="text-blue-200 text-sm">Focus music</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Storm intensity overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-5" />
    </div>
  );
}
