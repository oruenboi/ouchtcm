import React, { useEffect, useRef } from 'react';

interface LetterGlitchProps {
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  glitchColors?: string[];
}

const LetterGlitch: React.FC<LetterGlitchProps> = ({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
  glitchColors = ['#1D2A4D', '#00CABA', '#3A3A3A']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / (fontSize * window.devicePixelRatio));
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      if (!ctx || !canvas) return;

      // Semi-transparent background for trail effect
      ctx.fillStyle = smooth ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Random color from glitchColors
        const color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
        ctx.fillStyle = color;

        // Add some transparency for smoother effect
        if (smooth) {
          const alpha = Math.random() * 0.7 + 0.3;
          ctx.globalAlpha = alpha;
        }

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset alpha
        ctx.globalAlpha = 1;

        // Move drop down
        if (y > (canvas.height / window.devicePixelRatio) && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += Math.random() * 0.5 + 0.5;
      }
    };

    const animate = () => {
      draw();
      animationRef.current = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 100 - glitchSpeed);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [glitchSpeed, smooth, glitchColors]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0.3
        }}
      />
      
      {/* Center vignette */}
      {centerVignette && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
      )}
      
      {/* Outer vignette */}
      {outerVignette && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      )}
      
      {/* Glitch overlay effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(90deg, ${glitchColors.join(', ')})`,
          animation: 'glitch-slide 3s infinite linear'
        }}
      />
      
      <style jsx>{`
        @keyframes glitch-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LetterGlitch;