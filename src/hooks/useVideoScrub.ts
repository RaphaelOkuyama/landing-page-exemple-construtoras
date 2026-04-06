"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 124;
const FOLDER = "/frames";
const PREFIX = "frame_";
const DIGITS = 3;
const EXT = "webp"; // ← corrigido

function frameSrc(i: number): string {
  return `${FOLDER}/${PREFIX}${String(i + 1).padStart(DIGITS, "0")}.${EXT}`;
}

interface UseVideoScrubReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoaded: boolean;
  loadedCount: number;
  drawFrame: (progress: number) => void;
}

export function useVideoScrub(): UseVideoScrubReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const drawFrameIndex = useCallback(
    (index: number, images?: HTMLImageElement[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const imgs = images ?? imagesRef.current;
      const img = imgs[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Contain — sem corte, qualidade máxima
      const scale = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [],
  );

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const onDone = (i: number, success: boolean) => {
      loaded++;
      if (success) setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsLoaded(true);
        drawFrameIndex(0, images);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => onDone(i, true);
      img.onerror = () => onDone(i, false);
      images[i] = img;
    }
  }, [drawFrameIndex]);

  const drawFrame = useCallback(
    (progress: number) => {
      const index = Math.round(progress * (TOTAL_FRAMES - 1));
      const clamped = Math.min(Math.max(index, 0), TOTAL_FRAMES - 1);
      drawFrameIndex(clamped);
    },
    [drawFrameIndex],
  );

  return { canvasRef, isLoaded, loadedCount, drawFrame };
}
