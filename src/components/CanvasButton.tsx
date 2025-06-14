import React, { useEffect, useRef, useState, useCallback } from "react";

interface CanvasButtonProps {
   onClick: () => void;
   text?: string;
   size?: number;
   clicksRequired?: number;
   timeLimitMs?: number;
   disabled?: boolean;
   currentClicks?: number;
   currentTimeLeftMs?: number;
}

export default function CanvasButton({
   onClick,
   text = "Click",
   size = 150,
   clicksRequired = 10,
   timeLimitMs = 1000,
   disabled = false,
   currentClicks,
   currentTimeLeftMs,
}: CanvasButtonProps) {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [scale, setScale] = useState(1);

   const [internalClicks, setInternalClicks] = useState(0);
   const [internalTimeLeft, setInternalTimeLeft] = useState(timeLimitMs);

   const actualClicks =
      currentClicks !== undefined ? currentClicks : internalClicks;
   const actualTimeLeft =
      currentTimeLeftMs !== undefined ? currentTimeLeftMs : internalTimeLeft;

   const clickRef = useRef(actualClicks);
   const mainTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
   const displayTimerIdRef = useRef<NodeJS.Timeout | null>(null);
   const firstClickTimeRef = useRef<number | null>(null);

   const progress = Math.min(actualClicks / clicksRequired, 1);
   const isTimerActive =
      firstClickTimeRef.current !== null && mainTimeoutIdRef.current !== null;

   const buttonRadius = useCallback(() => size / 2 - 10, [size]);

   const animateBounce = useCallback(() => {
      let start: number | null = null;
      const duration = 120;
      const maxScale = 1.03;

      const step = (timestamp: number) => {
         if (!start) start = timestamp;
         const elapsed = timestamp - start;
         const t = Math.min(elapsed / duration, 1);
         const easeFactor =
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

         const s = 1 + (maxScale - 1) * (t < 0.5 ? easeFactor : 1 - easeFactor);

         setScale(s);

         if (elapsed < duration) {
            requestAnimationFrame(step);
         } else {
            setScale(1);
         }
      };
      requestAnimationFrame(step);
   }, []);

   const reset = useCallback(() => {
      if (currentClicks === undefined) setInternalClicks(0);
      if (currentTimeLeftMs === undefined) setInternalTimeLeft(timeLimitMs);

      clickRef.current = 0;
      firstClickTimeRef.current = null;

      if (mainTimeoutIdRef.current) {
         clearTimeout(mainTimeoutIdRef.current);
         mainTimeoutIdRef.current = null;
      }
      if (displayTimerIdRef.current) {
         clearInterval(displayTimerIdRef.current);
         displayTimerIdRef.current = null;
      }
   }, [currentClicks, currentTimeLeftMs, timeLimitMs]);

   const handleClick = useCallback(
      (e: React.MouseEvent<HTMLCanvasElement>) => {
         if (disabled) return;

         const rect = canvasRef.current!.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;
         const center = size / 2;
         const dx = x - center;
         const dy = y - center;
         const distance = Math.sqrt(dx * dx + dy * dy);

         if (distance > buttonRadius()) return;

         animateBounce();

         const newClicks = actualClicks + 1;
         if (currentClicks === undefined) {
            setInternalClicks(newClicks);
         }
         clickRef.current = newClicks;

         if (newClicks === 1) {
            firstClickTimeRef.current = Date.now();

            if (mainTimeoutIdRef.current)
               clearTimeout(mainTimeoutIdRef.current);
            if (displayTimerIdRef.current)
               clearInterval(displayTimerIdRef.current);

            mainTimeoutIdRef.current = setTimeout(() => {
               if (clickRef.current >= clicksRequired) {
                  onClick();
               }
               reset();
            }, timeLimitMs);

            if (currentTimeLeftMs === undefined) {
               displayTimerIdRef.current = setInterval(() => {
                  if (firstClickTimeRef.current === null) {
                     clearInterval(displayTimerIdRef.current!);
                     displayTimerIdRef.current = null;
                     return;
                  }
                  const elapsedTime = Date.now() - firstClickTimeRef.current;
                  const remaining = Math.max(0, timeLimitMs - elapsedTime);
                  setInternalTimeLeft(remaining);

                  if (remaining <= 0) {
                     clearInterval(displayTimerIdRef.current!);
                     displayTimerIdRef.current = null;
                  }
               }, 100);
            }
         }
      },
      [
         disabled,
         size,
         buttonRadius,
         animateBounce,
         actualClicks,
         currentClicks,
         clicksRequired,
         timeLimitMs,
         onClick,
         reset,
         currentTimeLeftMs,
      ]
   );

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size;
      canvas.height = size;

      const center = size / 2;
      const r = buttonRadius();

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(center, center);
      ctx.scale(scale, scale);
      ctx.translate(-center, -center);

      if (isTimerActive) {
         ctx.beginPath();
         ctx.arc(
            center,
            center,
            r,
            -Math.PI / 2,
            -Math.PI / 2 + progress * 2 * Math.PI
         );
         ctx.strokeStyle = "#3d0aaa";
         ctx.lineWidth = 10;
         ctx.lineCap = "round";
         ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(center, center, r - 10, 0, 2 * Math.PI);
      ctx.fillStyle = disabled ? "#4a5568" : "#5232c9";
      ctx.shadowColor = disabled ? "transparent" : "#5925c8";
      ctx.shadowBlur = disabled ? 0 : 15;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "white";
      ctx.font = `bold ${size / 7.5}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (isTimerActive && actualTimeLeft > 0) {
         const timeLeftSeconds = (actualTimeLeft / 1000).toFixed(1);
         ctx.fillText(
            `${actualClicks}/${clicksRequired}`,
            center,
            center - size / 15
         );
         ctx.fillText(`${timeLeftSeconds}s`, center, center + size / 15);
      } else {
         ctx.fillText(text, center, center);
      }

      ctx.restore();
   }, [
      progress,
      text,
      size,
      scale,
      buttonRadius,
      actualClicks,
      clicksRequired,
      actualTimeLeft,
      isTimerActive,
      disabled,
   ]);

   useEffect(() => {
      return () => {
         if (mainTimeoutIdRef.current) {
            clearTimeout(mainTimeoutIdRef.current);
            mainTimeoutIdRef.current = null;
         }
         if (displayTimerIdRef.current) {
            clearInterval(displayTimerIdRef.current);
            displayTimerIdRef.current = null;
         }
      };
   }, []);

   return (
      <canvas
         ref={canvasRef}
         onClick={handleClick}
         className={`cursor-pointer transition-opacity duration-300${disabled ? "opacity-70" : ""}`}
         style={{ borderRadius: "50%" }}
      />
   );
}
