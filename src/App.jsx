import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiGithub,
  SiInstagram,
  SiX,
  SiCounterstrike,
  SiSoundcloud
} from 'react-icons/si';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import Cursor from './components/Cursor';
import Player from './components/Player';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const links = [
    {
      label: 'GitHub',
      handle: '@augdev1',
      url: 'https://github.com/augdev1',
      icon: <SiGithub className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#18181b] border border-zinc-700/80 shadow-inner',
      accentColor: '#ffffff',
      glowClass: 'hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:border-zinc-500/50'
    },
    {
      label: 'Instagram',
      handle: '@augrocky',
      url: 'https://www.instagram.com/augrocky/',
      icon: <SiInstagram className="w-5 h-5 text-white" />,
      iconBg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-sm',
      accentColor: '#E1306C',
      glowClass: 'hover:shadow-[0_0_24px_rgba(225,48,108,0.22)] hover:border-pink-500/40'
    },
    {
      label: 'X',
      handle: '@augrockyy',
      url: 'https://x.com/augrockyy',
      icon: <SiX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />,
      iconBg: 'bg-black border border-white/20 shadow-inner',
      accentColor: '#ffffff',
      glowClass: 'hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:border-zinc-400/50'
    },
    {
      label: 'Counter-Strike',
      handle: 'Allstar â€¢ extr3myz',
      url: 'https://allstar.gg/u/extr3myz',
      icon: <SiCounterstrike className="w-5 h-5 text-zinc-950" />,
      iconBg: 'bg-gradient-to-br from-[#F5A623] to-[#C97B00] shadow-sm',
      accentColor: '#DE9B35',
      glowClass: 'hover:shadow-[0_0_24px_rgba(222,155,53,0.22)] hover:border-amber-500/40'
    },
    {
      label: 'SoundCloud',
      handle: '@augustorockyy',
      url: 'https://soundcloud.com/augustorockyy',
      icon: <SiSoundcloud className="w-5 h-5 text-white" />,
      iconBg: 'bg-gradient-to-r from-[#FF5500] to-[#FF3300] shadow-sm',
      accentColor: '#FF5500',
      glowClass: 'hover:shadow-[0_0_24px_rgba(255,85,0,0.22)] hover:border-orange-500/40'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <Cursor />

      {/* Responsive Fullscreen Fixed Cosmic Background */}
      <div
        onClick={() => {
          if (!isCardVisible) setIsCardVisible(true);
        }}
        className={`fixed inset-0 z-0 overflow-hidden bg-black transition-all ${
          !isCardVisible ? 'cursor-pointer' : 'pointer-events-none'
        }`}
        title={!isCardVisible ? "Clique em qualquer lugar para reexibir o card" : undefined}
      >
        <picture className="w-full h-full block">
          {/* Desktop & Tablet Widescreen: Native High-Res 16:9 Landscape Artwork */}
          <source media="(min-width: 768px)" srcSet="/images/bg-desktop.jpg" />
          {/* Mobile Portrait: Native Vertical Wallpaper */}
          <img
            src="/images/bg-mobile.jpg"
            alt="Cosmic Vortex Horizon"
            className="w-full h-full object-cover object-center select-none"
          />
        </picture>
        {/* Subtle dark tint and vignette for enhanced contrast */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.75)_100%)]" />
      </div>


      {/* Main Content Container - Fixed & 100% Static */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed inset-0 z-10 flex flex-col items-center justify-start sm:justify-center px-3.5 sm:px-6 lg:px-8 py-2 sm:py-6 overflow-y-auto select-none"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center my-auto"
        >
          {/* Top Floating Toggle Button - "Saindo do card" */}
          <motion.button
            variants={itemVariants}
            onClick={() => setIsCardVisible(!isCardVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mb-2 sm:mb-2.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full glass-morphism border flex items-center gap-1.5 transition-all duration-300 shadow-xl cursor-pointer select-none group ${
              isCardVisible
                ? 'border-white/15 bg-black/60 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-black/80'
                : 'border-emerald-500/40 bg-black/85 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
            }`}
            title={isCardVisible ? "Ocultar card (Ver imagem de fundo)" : "Mostrar card"}
          >
            {isCardVisible ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-[11px] font-mono tracking-wider">Ocultar card</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider font-medium">Mostrar card</span>
              </>
            )}
          </motion.button>

          {/* Card & Player Container with smooth opacity fade */}
          <motion.div
            animate={{
              opacity: isCardVisible ? 1 : 0,
              scale: isCardVisible ? 1 : 0.96,
              filter: isCardVisible ? 'blur(0px)' : 'blur(4px)',
              pointerEvents: isCardVisible ? 'auto' : 'none'
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full flex flex-col gap-2 sm:gap-2.5"
          >
            {/* Main Card */}
            <motion.div
              variants={itemVariants}
              className="glass-morphism rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl relative border border-white/10"
            >
            {/* Profile Section */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-3 sm:mb-4"
            >
              {/* Avatar with authentic glowing border */}
              <motion.div
                variants={itemVariants}
                className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-2.5"
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 opacity-50 blur-sm" />
                <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black/40">
                    <img
                      src="/images/aug1.jpg"
                      alt="Augusto Sousa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="text-lg sm:text-2xl font-extrabold tracking-tight mb-1 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
              >
                Augusto Sousa
              </motion.h1>

              {/* Subtitle / Tags */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-zinc-400"
              >
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-zinc-300 font-medium">
                  MÃºsica
                </span>
                <span className="text-zinc-600">â€¢</span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-zinc-300 font-medium">
                  Tecnologia
                </span>
                <span className="text-zinc-600">â€¢</span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-zinc-300 font-medium">
                  IA
                </span>
                <span className="text-zinc-600">â€¢</span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-zinc-300 font-medium">
                  CS
                </span>
              </motion.div>
            </motion.div>

            {/* Links Section with Authentic Brand Logos */}
            <motion.div
              variants={itemVariants}
              className="space-y-1.5 sm:space-y-2.5"
            >
              {links.map((link, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(link.url, '_blank')}
                  className={`w-full glass-morphism-card rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center space-x-2.5 sm:space-x-3.5 border border-white/[0.06] transition-all duration-300 group cursor-pointer text-left ${link.glowClass}`}
                >
                  {/* Authentic Logo Container */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${link.iconBg}`}
                  >
                    {link.icon}
                  </div>

                  {/* Brand & Handle Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base group-hover:text-white transition-colors truncate">
                      {link.label}
                    </h3>
                    <p className="text-zinc-400 text-xs truncate font-mono mt-0.5 group-hover:text-zinc-300 transition-colors">
                      {link.handle}
                    </p>
                  </div>

                  {/* External Indicator */}
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-300 flex-shrink-0">
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="mt-4 pt-3 border-t border-white/[0.06] text-center text-[11px] sm:text-xs text-zinc-500 font-mono"
            >
              <span>Â© 2026 augrocky</span>
            </motion.div>
          </motion.div>

          {/* Audio Player directly docked below the main card */}
          <motion.div variants={itemVariants} className="w-full">
            <Player />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
);
}

export default App;

