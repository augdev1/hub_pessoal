import React, { useState, useRef, useEffect, useCallback } from 'react';

const TRACKS = [
  {
    title: '2AM IN MANAUS PROD BY AUG',
    src: '/audio/2AM IN MANAUS PROD BY AUG.wav'
  },
  {
    title: 'CALL THE PLUG PROD BY AUG',
    src: '/audio/CALL THE PLUG PROD BY AUG.wav'
  },
  {
    title: 'CAOS PROD BY AUG',
    src: '/audio/CAOS PROD BY AUG.wav'
  },
  {
    title: 'IM ON ONE PROD BY AUG',
    src: '/audio/IM ON ONE PROD BY AUG.wav'
  },
  {
    title: 'MISSED CALLS PROD BY AUG',
    src: '/audio/MISSED CALLS PROD BY AUG.wav'
  },
  {
    title: 'REAL1TY PROD BY AUG',
    src: '/audio/REAL1TY PROD BY AUG.wav'
  },
  {
    title: 'MIDNIGHT PROD BY AUG',
    src: '/audio/ambient-music.wav'
  }
];

const Player = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Keep ref synchronized with state for callbacks
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Volume & Mute control
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playTrack = useCallback((trackIndex) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrackIndex(trackIndex);
    audio.src = encodeURI(TRACKS[trackIndex].src);
    audio.load();

    if (isPlayingRef.current) {
      setIsBuffering(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsBuffering(false);
          })
          .catch(error => {
            console.log('Mobile audio playback postponed or blocked:', error);
            setIsBuffering(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    } else {
      setIsBuffering(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch(error => {
            console.log('Audio playback failed:', error);
            setIsBuffering(false);
          });
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    playTrack(nextIndex);
  };

  const handlePrev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      const prevIndex = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
      playTrack(prevIndex);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(currentTrack.src)}
        onEnded={handleNext}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        preload="metadata"
      />

      {/* Volume & Track Control Panel */}
      <div className="w-full glass-morphism rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl border border-white/10">
        <div className="w-full flex flex-col items-start gap-1.5">
          {/* Now Playing Header */}
          <div className="flex items-center justify-between w-full text-[10px] sm:text-xs text-zinc-400 font-mono tracking-wider uppercase select-none">
            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                isBuffering
                  ? 'bg-amber-400 animate-ping'
                  : isPlaying
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-zinc-500'
              }`}></span>
              <span className="truncate">
                {isBuffering ? 'Carregando...' : `Tocando agora: ${currentTrack.title}`}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono flex-shrink-0 ml-2">
              {currentTrackIndex + 1}/{TRACKS.length}
            </span>
          </div>

          {/* Unified Integrated Controls Bar */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 w-full">
            {/* Action Buttons: Prev, Play/Pause, Next, Mute */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              {/* Previous Button (Voltar) */}
              <button
                onClick={handlePrev}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer touch-manipulation"
                title="Faixa anterior"
              >
                <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer touch-manipulation relative"
                title={isPlaying ? "Pausar" : "Tocar"}
              >
                {isBuffering ? (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next Button (Avançar / Skip) */}
              <button
                onClick={handleNext}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer touch-manipulation"
                title="Próxima faixa"
              >
                <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all duration-200 text-white cursor-pointer touch-manipulation"
                title={isMuted ? "Ativar som" : "Mutar"}
              >
                {isMuted ? (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Connected Volume Capsule */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0 bg-white/[0.05] rounded-full px-2 py-1 border border-white/[0.08]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full flex-1 h-1.5 bg-zinc-700/60 rounded-full appearance-none cursor-pointer touch-manipulation"
                style={{
                  background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume * 100}%, #3f3f46 ${volume * 100}%, #3f3f46 100%)`
                }}
              />
              <span className="text-zinc-400 text-[10px] sm:text-xs font-mono w-6 text-right flex-shrink-0">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
