"use client";

import { Music2, Pause } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const START_OFFSET_SECONDS = 25;

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAppliedStartOffsetRef = useRef(false);
  const hasUserPausedRef = useRef(false);
  const hasAutoStartedAfterInteractionRef = useRef(false);

  const applyStartOffset = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || hasAppliedStartOffsetRef.current) {
      return;
    }

    const canSeek = audio.readyState >= 1;

    if (canSeek) {
      audio.currentTime = START_OFFSET_SECONDS;
      hasAppliedStartOffsetRef.current = true;
      return;
    }

    audio.addEventListener(
      "loadedmetadata",
      () => {
        if (!hasAppliedStartOffsetRef.current && audioRef.current) {
          audioRef.current.currentTime = START_OFFSET_SECONDS;
          hasAppliedStartOffsetRef.current = true;
        }
      },
      { once: true },
    );
  }, []);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || hasUserPausedRef.current) {
      return;
    }

    applyStartOffset();
    audio.play().catch((error) => {
      console.warn("Background audio play() was blocked:", error);
    });
  }, [applyStartOffset]);

  const pausePlayback = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
  };

  useEffect(() => {
    const audio = new Audio("/audio/2Baba-aka-2Face-Idibia-African-Queen.mp3");
    audio.loop = false;
    audio.volume = 0.55;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      hasUserPausedRef.current = true;
      pausePlayback();
      return;
    }

    hasUserPausedRef.current = false;
    startPlayback();
  };

  useEffect(() => {
    const removeFirstInteractionListeners = () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("wheel", handleFirstInteraction);
    };

    const handleFirstInteraction = () => {
      if (hasAutoStartedAfterInteractionRef.current) {
        return;
      }

      removeFirstInteractionListeners();

      if (hasUserPausedRef.current) {
        return;
      }

      hasAutoStartedAfterInteractionRef.current = true;
      startPlayback();
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("wheel", handleFirstInteraction, {
      passive: true,
    });

    return () => {
      removeFirstInteractionListeners();
    };
  }, [startPlayback]);

  return (
    <button
      type="button"
      onClick={togglePlayback}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)] backdrop-blur-md transition hover:bg-black/50"
      aria-label="Toggle background music"
      aria-pressed={isPlaying}
    >
      {isPlaying ? <Pause size={14} /> : <Music2 size={14} />}
      {isPlaying ? "Pause Our Song" : "Play Our Song"}
    </button>
  );
}
