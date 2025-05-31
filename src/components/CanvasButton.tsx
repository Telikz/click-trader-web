import { useEffect, useRef, useState } from "react";

interface CanvasButtonProps {
   onClick: () => void;
   text?: string;
   size?: number;
   clicksRequired?: number;
   timeLimitMs?: number;
}

export default function CanvasButton({
   onClick,
   text = "Click",
   size = 150,
   clicksRequired = 10,
   timeLimitMs = 1000,
}: CanvasButtonProps) {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [scale, setScale] = useState(1);
   const [clicks, setClicks] = useState(0);
   const clickRef = useRef(0);
   const timerRef = useRef<NodeJS.Timeout | null>(null);
   const progress = Math.min(clicks / clicksRequired, 1);

   const animateBounce = () => {
      let start: number | null = null;
      const duration = 150;
      const maxScale = 1.01;

      const step = (timestamp: number) => {
         if (!start) start = timestamp;
         const elapsed = timestamp - start;
         const t = elapsed / duration;

         const s =
            t < 0.5
               ? 1 + (maxScale - 1) * (2 * t)
               : maxScale - (maxScale - 1) * (2 * (t - 0.5));

         setScale(s);

         if (elapsed < duration) {
            requestAnimationFrame(step);
         } else {
            setScale(1);
         }
      };

      requestAnimationFrame(step);
   };

   const reset = () => {
      setClicks(0);
      clickRef.current = 0;
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = null;
      }
   };

   const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const center = size / 2;
      const dx = x - center;
      const dy = y - center;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > radius()) return;

      animateBounce();

      setClicks((prev) => {
         const next = prev + 1;
         clickRef.current = next;

         if (next === 1) {
            timerRef.current = setTimeout(() => {
               if (clickRef.current >= clicksRequired) {
                  onClick();
               }
               reset();
            }, timeLimitMs);
         }

         return next;
      });
   };

   const radius = () => size / 2 - 10;

   useEffect(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = size;
      canvas.height = size;

      const center = size / 2;
      const r = radius();

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(center, center);
      ctx.scale(scale, scale);
      ctx.translate(-center, -center);

      // Progress arc
      ctx.beginPath();
      ctx.arc(
         center,
         center,
         r,
         -Math.PI / 2,
         -Math.PI / 2 + progress * 2 * Math.PI
      );
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      // Button circle
      ctx.beginPath();
      ctx.arc(center, center, r - 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#0af";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 15;
      ctx.fill();

      // Text
      ctx.shadowBlur = 0;
      ctx.fillStyle = "white";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, center, center);

      ctx.restore();
   }, [progress, text, size, scale]);

   return (
      <canvas
         ref={canvasRef}
         onClick={handleClick}
         className="cursor-pointer"
         style={{ borderRadius: "50%" }}
      />
   );
}
