import { useState, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const togglePlay = () => {
    if (playerRef.current) {
      if (playing) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setPlaying(!playing);
    }
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    playerRef.current = event.target;
    console.log("Player ready");
    // Try to play immediately if user has interacted
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    // 1 = Playing, 2 = Paused
    if (event.data === 1) setPlaying(true);
    if (event.data === 2) setPlaying(false);
  };

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0, // No autoplay to respect policies
      controls: 0,
      modestbranding: 1,
      loop: 1,
      playlist: "GD6OzOx3Tqs" // Required for loop
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="fixed -bottom-10 -right-10 opacity-0 pointer-events-none">
        <YouTube 
          videoId="GD6OzOx3Tqs" 
          opts={opts} 
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          onError={(e) => console.error("YouTube Error:", e)}
        />
      </div>
      
      <button
        onClick={togglePlay}
        className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 transition-transform hover:scale-110 active:scale-95 flex items-center gap-2"
        title={playing ? "Pausar música" : "Reproducir música"}
      >
        {playing ? (
          <>
            <span className="text-2xl animate-spin-slow">💿</span>
            <span className="text-xs font-bold text-pink-600 hidden md:block">Sonando...</span>
          </>
        ) : (
          <>
            <span className="text-2xl animate-pulse">▶️</span>
            <span className="text-xs font-bold text-pink-600 hidden md:block">¡Dale Play!</span>
          </>
        )}
      </button>
      
      {!playing && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white/90 text-pink-600 px-3 py-1 rounded-lg text-sm font-bold shadow animate-bounce">
          ¡Pon la canción! 🎵
        </div>
      )}
    </div>
  );
}
