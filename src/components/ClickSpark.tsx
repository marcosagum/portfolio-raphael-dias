import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSpark({
  sparkColor = '#ffffff',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 400,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;
    function draw(timestamp: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 2);
        const distance = eased * sparkRadius;
        const lineLength = sparkSize * (1 - progress);
        const x1 = spark.x + Math.cos(spark.angle) * distance;
        const y1 = spark.y + Math.sin(spark.angle) * distance;
        const x2 = spark.x + Math.cos(spark.angle) * (distance + lineLength);
        const y2 = spark.y + Math.sin(spark.angle) * (distance + lineLength);

        ctx!.strokeStyle = sparkColor;
        ctx!.globalAlpha = 1 - progress;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();

        return true;
      });
      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    function handleClick(event: MouseEvent) {
      const now = performance.now();
      const newSparks: Spark[] = [];
      for (let i = 0; i < sparkCount; i++) {
        newSparks.push({
          x: event.clientX,
          y: event.clientY,
          angle: (i / sparkCount) * Math.PI * 2,
          startTime: now,
        });
      }
      sparksRef.current = sparksRef.current.concat(newSparks);
    }
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion, sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
      {children}
    </>
  );
}
