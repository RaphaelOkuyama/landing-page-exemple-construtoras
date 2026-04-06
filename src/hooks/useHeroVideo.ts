"use client";

import { useEffect, useRef, useState } from "react";

export function useHeroVideo(src: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const direction = useRef<number>(1);
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    videoRef.current = video;

    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    window.addEventListener("resize", resize);
    resize();

    const drawLoop = () => {
      if (video.readyState >= 2) {
        const W = canvas.width;
        const H = canvas.height;
        const vw = video.videoWidth;
        const vh = video.videoHeight;

        ctx.clearRect(0, 0, W, H);

        // Zoom de 1.08 para esconder a logo da Veo
        const scale = Math.max(W / vw, H / vh) * 1.08;
        const dw = vw * scale;
        const dh = vh * scale;
        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;

        ctx.drawImage(video, dx, dy, dw, dh);

        // Ping-pong lógico
        if (direction.current === 1 && video.currentTime >= video.duration - 0.1) {
          direction.current = -1;
          video.pause();
        } else if (direction.current === -1 && video.currentTime <= 0.1) {
          direction.current = 1;
          video.play();
        }

        if (direction.current === -1) {
          video.currentTime -= 0.03;
        }
      }
      reqRef.current = requestAnimationFrame(drawLoop);
    };

    reqRef.current = requestAnimationFrame(drawLoop);

    return () => {
      window.removeEventListener("resize", resize);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isLoaded]);

  return { canvasRef, isLoaded };
}