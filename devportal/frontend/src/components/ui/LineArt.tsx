import { useEffect, useRef } from 'react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface LineArtProps {
  className?: string;
  opacity?: number;
}

export function useInteractiveFigure() {
  const containerRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    containerRef.current?.style.setProperty('--mouse-x', `${x}`);
    containerRef.current?.style.setProperty('--mouse-y', `${y}`);
  };

  const handleMouseLeave = () => {
    containerRef.current?.style.setProperty('--mouse-x', '0');
    containerRef.current?.style.setProperty('--mouse-y', '0');
  };

  return {
    ref: containerRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

// ─── Human thinking figure ────────────────────────────────────────────────────
interface ThinkingFigureProps extends LineArtProps {
  /** When true, thought bubbles animate faster and glow — use during validation */
  isThinking?: boolean;
  /** When true, figure leans back / arm recoils — use during error state */
  hasError?: boolean;
  /** When true, figure covers eyes/face — use when password field is focused */
  isHiding?: boolean;
}

export function ThinkingFigure({ className = '', opacity = 0.85, isThinking = false, hasError = false, isHiding = false }: ThinkingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const bubbleDur   = isThinking ? '1.4s' : '3s';
  const breatheDur  = isThinking ? '1.8s' : '4s';
  
  // Left arm paths: normal, error, or shy/hiding
  const armD = hasError
    ? 'M58 90 C45 108, 55 126, 70 134'
    : isHiding
    ? 'M58 90 C62 70, 75 42, 90 38'
    : 'M58 90 C50 110, 62 128, 78 132';

  const armVariants = hasError
    ? 'M58 90 C45 108, 55 126, 70 134;M58 90 C48 104, 58 124, 72 132;M58 90 C45 108, 55 126, 70 134'
    : isHiding
    ? 'M58 90 C62 70, 75 42, 90 38;M58 90 C62 68, 75 40, 90 36;M58 90 C62 70, 75 42, 90 38'
    : 'M58 90 C50 110, 62 128, 78 132;M58 90 C52 106, 64 126, 80 130;M58 90 C50 110, 62 128, 78 132';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 -15 200 295"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 12px), calc(var(--mouse-y, 0) * 12px))',
          transformOrigin: '100px 38px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="100" cy="38" r="22" stroke="currentColor" strokeWidth="1.8">
          <animate attributeName="r" values="22;23;22" dur={breatheDur} repeatCount="indefinite" />
        </circle>
      </g>

      {/* Thought bubble dots (only show when not hiding face) */}
      {!isHiding && (
        <>
          <circle cx="126" cy="20" r="3" stroke="currentColor" strokeWidth="1.5"
            fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.35 : 0}>
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="134" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"
            fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.25 : 0}>
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="146" cy="5" r="6" stroke="currentColor" strokeWidth="1.5"
            fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.2 : 0}>
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0.8s" repeatCount="indefinite" />
          </circle>

          {/* Thought bubble cloud */}
          <ellipse cx="166" cy="5" rx="18" ry="14" stroke="currentColor" strokeWidth={isThinking ? '2.0' : '1.5'}>
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.2s" repeatCount="indefinite" />
          </ellipse>

          {/* Thought lines inside bubble */}
          <line x1="153" y1="5" x2="178" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="155" y1="9" x2="175" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.7s" repeatCount="indefinite" />
          </line>
        </>
      )}

      {/* Neck */}
      <line x1="100" y1="60" x2="100" y2="72" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Torso */}
      <line x1="100" y1="72" x2="100" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Shoulders */}
      <line x1="100" y1="80" x2="58" y2="90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="100" y1="80" x2="142" y2="90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Left arm — raised to chin (thinking pose) / recoils on error / covers face when hiding */}
      <path d={armD} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <animate attributeName="d" values={armVariants} dur="5s" repeatCount="indefinite" />
      </path>
      
      {/* Right arm — relaxed / covers face when hiding */}
      <path
        d={isHiding ? 'M142 90 C138 70, 125 42, 110 38' : 'M142 90 C150 112, 148 130, 140 145'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      >
        {isHiding && (
          <animate
            attributeName="d"
            values="M142 90 C138 70, 125 42, 110 38;M142 90 C138 68, 125 40, 110 36;M142 90 C138 70, 125 42, 110 38"
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Hips */}
      <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Left leg */}
      <path d="M80 150 L72 210 L68 270" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Right leg */}
      <path d="M120 150 L128 210 L132 270" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Left foot */}
      <line x1="68" y1="270" x2="52" y2="272" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right foot */}
      <line x1="132" y1="270" x2="148" y2="272" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Neural network / brain art ───────────────────────────────────────────────
export function NeuralArt({ className = '', opacity = 0.8 }: LineArtProps) {
  const nodes = [
    { x: 30, y: 60 }, { x: 30, y: 120 }, { x: 30, y: 180 },
    { x: 100, y: 30 }, { x: 100, y: 90 }, { x: 100, y: 150 }, { x: 100, y: 210 },
    { x: 170, y: 60 }, { x: 170, y: 120 }, { x: 170, y: 180 },
    { x: 240, y: 90 }, { x: 240, y: 150 },
  ];
  const edges = [
    [0,3],[0,4],[1,4],[1,5],[2,5],[2,6],
    [3,7],[4,7],[4,8],[5,8],[5,9],[6,9],
    [7,10],[8,10],[8,11],[9,11],
  ];

  return (
    <svg
      viewBox="0 0 270 240"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur={`${2.5 + (i % 5) * 0.6}s`}
            begin={`${(i * 0.2) % 3}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="4" stroke="currentColor" strokeWidth="1.8">
          <animate
            attributeName="r"
            values="3.5;5;3.5"
            dur={`${2 + (i % 4) * 0.8}s`}
            begin={`${(i * 0.3) % 2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur={`${2 + (i % 4) * 0.8}s`}
            begin={`${(i * 0.3) % 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

// ─── Walking figures — reacts to search/filter activity ──────────────────────
interface WalkingFiguresProps extends LineArtProps {
  /** When true, figures walk faster — use during search/filter activity */
  searchActive?: boolean;
}

export function WalkingFigures({ className = '', opacity = 0.8, searchActive = false }: WalkingFiguresProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const dur = searchActive ? '0.8s' : '1.8s';
  const dur2 = searchActive ? '0.9s' : '2s';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 400 160"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Figure 1 */}
      <g transform="translate(60, 10)">
        <g
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))',
            transformOrigin: '0px 18px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1.6" />
        </g>
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 0 42;15 0 42;0 0 42;-15 0 42;0 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 0 42;-15 0 42;0 0 42;15 0 42;0 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 -12 80;20 -12 80;0 -12 80;-20 -12 80;0 -12 80" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 12 80;-20 12 80;0 12 80;20 12 80;0 12 80" dur={dur} repeatCount="indefinite" />
        </line>
      </g>
      {/* Figure 2 */}
      <g transform="translate(180, 10)">
        <g
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))',
            transformOrigin: '0px 18px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1.6" />
        </g>
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-15 0 42;0 0 42;15 0 42;0 0 42;-15 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="15 0 42;0 0 42;-15 0 42;0 0 42;15 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-20 -12 80;0 -12 80;20 -12 80;0 -12 80;-20 -12 80" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="20 12 80;0 12 80;-20 12 80;0 12 80;20 12 80" dur={dur} repeatCount="indefinite" />
        </line>
      </g>
      {/* Figure 3 */}
      <g transform="translate(300, 10)">
        <g
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))',
            transformOrigin: '0px 18px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1.6" />
        </g>
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="10 0 42;-10 0 42;10 0 42" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-10 0 42;10 0 42;-10 0 42" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="15 -12 80;-15 -12 80;15 -12 80" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-15 12 80;15 12 80;-15 12 80" dur={dur2} repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

// ─── Floating data nodes / particle field ─────────────────────────────────────
export function DataParticles({ className = '', opacity = 0.75 }: LineArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const color = isDark ? '255,255,255' : '0,0,0';

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.2,
    }));

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.75)`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${0.35 * (1 - dist / 100)})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none w-full h-full absolute inset-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

// ─── Flowing lines / signal waves ─────────────────────────────────────────────
export function SignalWaves({ className = '', opacity = 0.75 }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 800 120"
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 20, 40].map((offset, i) => (
        <path
          key={i}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          d={`M0,${60 + offset} C100,${20 + offset} 200,${100 + offset} 300,${60 + offset} S500,${20 + offset} 600,${60 + offset} S750,${100 + offset} 800,${60 + offset}`}
        >
          <animate
            attributeName="d"
            values={
              `M0,${60 + offset} C100,${20 + offset} 200,${100 + offset} 300,${60 + offset} S500,${20 + offset} 600,${60 + offset} S750,${100 + offset} 800,${60 + offset};` +
              `M0,${60 + offset} C100,${100 + offset} 200,${20 + offset} 300,${60 + offset} S500,${100 + offset} 600,${60 + offset} S750,${20 + offset} 800,${60 + offset};` +
              `M0,${60 + offset} C100,${20 + offset} 200,${100 + offset} 300,${60 + offset} S500,${20 + offset} 600,${60 + offset} S750,${100 + offset} 800,${60 + offset}`
            }
            dur={`${6 + i * 1.5}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </svg>
  );
}

// ─── Coding at desk figure — reactive to typing & error state ─────────────────
interface CodingFigureProps extends LineArtProps {
  /** When true: cursor blinks faster, head leans in more eagerly */
  isTyping?: boolean;
  /** When true: figure slumps / leans back in dismay */
  hasError?: boolean;
}

export function CodingFigure({ className = '', opacity = 0.85, isTyping = false, hasError = false }: CodingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const cursorDur  = isTyping ? '0.5s' : '1.1s';
  const headCy     = hasError ? '126' : '122';
  const headBounce = hasError
    ? `${headCy};${+headCy - 1};${headCy}`
    : `${headCy};${+headCy - 2};${headCy}`;
  const breatheDur = isTyping ? '2s' : '5s';
  // Torso path leans forward when typing, slumps when error
  const torsoD = hasError
    ? 'M145 150 C138 168, 130 182, 125 200'
    : 'M145 150 C140 165, 135 178, 132 195';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 200 240"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Monitor */}
      <rect x="50" y="20" width="100" height="68" rx="4" stroke="currentColor" strokeWidth="1.8" />
      {/* Monitor stand */}
      <line x1="100" y1="88" x2="100" y2="105" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="80" y1="105" x2="120" y2="105" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Code lines on screen — more animate when typing */}
      <line x1="62" y1="38" x2="95" y2="38" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="95;88;102;90;95" dur="1.8s" repeatCount="indefinite" />}
      </line>
      <line x1="62" y1="48" x2="110" y2="48" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="68" y1="58" x2="105" y2="58" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="105;112;98;105" dur="2.2s" repeatCount="indefinite" />}
      </line>
      <line x1="68" y1="68" x2="88" y2="68" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="88;96;82;88" dur="1.5s" repeatCount="indefinite" />}
      </line>

      {/* Blinking cursor — fast when typing */}
      <line x1="90" y1="63" x2="90" y2="74" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <animate attributeName="opacity" values="1;0;1" dur={cursorDur} repeatCount="indefinite" />
        {isTyping && <animate attributeName="x1" values="90;90;97;90" dur="1.5s" repeatCount="indefinite" />}
        {isTyping && <animate attributeName="x2" values="90;90;97;90" dur="1.5s" repeatCount="indefinite" />}
      </line>

      {/* Error flash on screen */}
      {hasError && (
        <rect x="52" y="22" width="96" height="64" rx="3" fill="currentColor" fillOpacity="0.06">
          <animate attributeName="fill-opacity" values="0.06;0.14;0.06" dur="1.8s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 10px))',
          transformOrigin: '148px 122px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="148" cy={headCy} r="16" stroke="currentColor" strokeWidth="1.8">
          <animate attributeName="cy" values={headBounce} dur={breatheDur} repeatCount="indefinite" />
        </circle>
      </g>

      {/* Neck */}
      <line x1="148" y1="138" x2="145" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Torso — hunched or slumped */}
      <path d={torsoD} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Arms on desk — fingers tap when typing */}
      <path d="M142 160 C128 165, 115 168, 100 170" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {isTyping && (
          <animate attributeName="d"
            values="M142 160 C128 165, 115 168, 100 170;M142 158 C128 163, 115 166, 100 168;M142 160 C128 165, 115 168, 100 170"
            dur="0.4s" repeatCount="indefinite" />
        )}
      </path>
      <path d="M145 160 C155 163, 162 166, 168 168" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {isTyping && (
          <animate attributeName="d"
            values="M145 160 C155 163, 162 166, 168 168;M145 158 C155 161, 162 164, 168 166;M145 160 C155 163, 162 166, 168 168"
            dur="0.4s" begin="0.2s" repeatCount="indefinite" />
        )}
      </path>

      {/* Keyboard */}
      <rect x="88" y="170" width="84" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {[96,104,112,120,128,136,144,152,160].map((x, i) => (
        <line key={i} x1={x} y1="175" x2={x} y2="179" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      ))}

      {/* Chair legs */}
      <line x1="132" y1="195" x2="122" y2="235" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="132" y1="195" x2="148" y2="230" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Feet */}
      <line x1="122" y1="235" x2="108" y2="237" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="148" y1="230" x2="162" y2="233" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Presenting / pointing figure — reactive to sandbox/active state ──────────
interface PresentingFigureProps extends LineArtProps {
  /** When true: arm gestures more eagerly, board pulses, figure leans forward */
  isActive?: boolean;
  /** When true: figure droops / arm lowers — submission complete */
  isDone?: boolean;
}

export function PresentingFigure({ className = '', opacity = 0.85, isActive = false, isDone = false }: PresentingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const armVariants = isActive
    ? 'M108 90 C128 88, 148 86, 165 82;M108 90 C128 85, 148 82, 165 78;M108 90 C128 88, 148 86, 165 82'
    : isDone
    ? 'M108 90 C128 100, 148 108, 165 110;M108 90 C128 102, 148 110, 165 112;M108 90 C128 100, 148 108, 165 110'
    : 'M108 90 C128 95, 148 98, 165 95;M108 90 C128 92, 148 94, 165 90;M108 90 C128 95, 148 98, 165 95';

  const armD = isActive ? 'M108 90 C128 88, 148 86, 165 82'
    : isDone ? 'M108 90 C128 100, 148 108, 165 110'
    : 'M108 90 C128 95, 148 98, 165 95';

  const armDur  = isActive ? '1.6s' : '3.5s';
  const breatheDur = isActive ? '2s' : '4s';
  const boardPulseDur = isActive ? '0.8s' : '2s';
  const tipCy = isActive ? '82' : isDone ? '110' : '95';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 200 310"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 12px), calc(var(--mouse-y, 0) * 12px))',
          transformOrigin: '72px 38px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="72" cy="38" r="20" stroke="currentColor" strokeWidth="1.8">
          <animate attributeName="r" values="20;21;20" dur={breatheDur} repeatCount="indefinite" />
        </circle>
      </g>

      {/* Neck */}
      <line x1="72" y1="58" x2="72" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Torso — leans forward when active */}
      <line
        x1="72" y1="70" x2={isActive ? '74' : '72'} y2="155"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />

      {/* Shoulders */}
      <line x1="72" y1="80" x2="36" y2="90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="72" y1="80" x2="108" y2="90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Right arm — pointing / gesturing */}
      <path d={armD} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <animate attributeName="d" values={armVariants} dur={armDur} repeatCount="indefinite" />
      </path>

      {/* Pointer tip */}
      <circle cx="165" cy={tipCy} r={isActive ? '3.5' : '2.5'} stroke="currentColor" strokeWidth="1.5">
        <animate attributeName="opacity" values={isActive ? '1;0.2;1' : '1;0.4;1'} dur={boardPulseDur} repeatCount="indefinite" />
        {isActive && <animate attributeName="r" values="3.5;5;3.5" dur={boardPulseDur} repeatCount="indefinite" />}
      </circle>

      {/* Left arm — relaxed at side */}
      <path d="M36 90 C28 112, 30 132, 34 148" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Hips */}
      <line x1="54" y1="155" x2="90" y2="155" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Legs */}
      <path d="M90 155 L96 220 L98 290" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M54 155 L50 220 L46 290" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Feet */}
      <line x1="98" y1="290" x2="115" y2="292" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="46" y1="290" x2="30" y2="292" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Board */}
      <rect x="168" y={isActive ? '52' : '62'} width="26" height="60" rx="2" stroke="currentColor" strokeWidth={isActive ? '2.0' : '1.5'}>
        {isActive && <animate attributeName="y" values="52;50;52" dur="1.6s" repeatCount="indefinite" />}
      </rect>
      {/* Lines on board */}
      <line x1="172" y1="74" x2="190" y2="74" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="172" y1="82" x2="187" y2="82" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="172" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="172" y1="98" x2="184" y2="98" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Dot accent */}
      <circle cx="181" cy="110" r={isActive ? '4' : '3'} stroke="currentColor" strokeWidth="1.5">
        <animate attributeName="opacity" values={isActive ? '1;0.1;1' : '0.4;1;0.4'} dur={boardPulseDur} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── Collaborating figures (two figures working together) ─────────────────────
interface CollaboratingFigureProps extends LineArtProps {
  /** When true: figures gesture more and lean in */
  isActive?: boolean;
  /** When true: XML validation errors exist, figures look confused and scratch their heads */
  hasError?: boolean;
}

export function CollaboratingFigure({ className = '', opacity = 0.85, isActive = false, hasError = false }: CollaboratingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const armDur = isActive ? '2s' : '4s';
  const breatheDur = isActive ? '2.2s' : '4.5s';
  const headR = isActive ? '13' : '12';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 240 200"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2050/svg"
      aria-hidden="true"
    >
      {/* Figure A (left) */}
      <g transform="translate(40, 10)">
        <g
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))',
            transformOrigin: '30px 20px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <circle cx="30" cy="20" r={headR} stroke="currentColor" strokeWidth="1.8">
            <animate attributeName="r" values={`${headR};${+headR + 1};${headR}`} dur={breatheDur} repeatCount="indefinite" />
          </circle>
        </g>
        <line x1="30" y1="32" x2="30" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Left arm — standard or scratching head in confusion on error */}
        {hasError ? (
          <path d="M30 40 C20 35, 15 20, 25 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
            <animate attributeName="d"
              values="M30 40 C20 35, 15 20, 25 15;M30 40 C20 35, 15 22, 23 18;M30 40 C20 35, 15 20, 25 15"
              dur="0.8s" repeatCount="indefinite" />
          </path>
        ) : (
          <line x1="30" y1="40" x2="8" y2="55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
        
        <line x1="30" y1="40" x2="52" y2="55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M52 55 C58 58, 65 60, 72 60" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
          {isActive && <animate attributeName="d" values="M52 55 C58 58, 65 60, 72 60;M52 55 C58 56, 65 58, 74 58;M52 55 C58 58, 65 60, 72 60" dur={armDur} repeatCount="indefinite" />}
        </path>
        <line x1="15" y1="70" x2="10" y2="115" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {isActive && <animate attributeName="x1" values="15;13;15" dur={armDur} repeatCount="indefinite" />}
        </line>
        <line x1="45" y1="70" x2="50" y2="115" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {isActive && <animate attributeName="x1" values="45;47;45" dur={armDur} repeatCount="indefinite" />}
        </line>
        <line x1="10" y1="115" x2="5" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="115" x2="55" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5" y1="138" x2="0" y2="140" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="55" y1="138" x2="60" y2="140" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Figure B (right) */}
      <g transform="translate(120, 10)">
        <g
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))',
            transformOrigin: '30px 20px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <circle cx="30" cy="20" r={headR} stroke="currentColor" strokeWidth="1.8">
            <animate attributeName="r" values={`${headR};${+headR + 1};${headR}`} dur={breatheDur} begin="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
        <line x1="30" y1="32" x2="30" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="30" y1="40" x2="8" y2="55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Right arm — standard or scratching head in confusion on error */}
        {hasError ? (
          <path d="M30 40 C40 35, 45 20, 35 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
            <animate attributeName="d"
              values="M30 40 C40 35, 45 20, 35 15;M30 40 C40 35, 45 22, 37 18;M30 40 C40 35, 45 20, 35 15"
              dur="0.8s" begin="0.2s" repeatCount="indefinite" />
          </path>
        ) : (
          <line x1="30" y1="40" x2="52" y2="55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
        
        <path d="M8 55 C2 58, -5 60, -12 60" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
          {isActive && <animate attributeName="d" values="M8 55 C2 58, -5 60, -12 60;M8 55 C2 56, -5 58, -14 58;M8 55 C2 58, -5 60, -12 60" dur={armDur} begin="0.5s" repeatCount="indefinite" />}
        </path>
        <line x1="15" y1="70" x2="10" y2="115" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="45" y1="70" x2="50" y2="115" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="10" y1="115" x2="5" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="115" x2="55" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5" y1="138" x2="0" y2="140" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="55" y1="138" x2="60" y2="140" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <circle cx="160" cy="70" r="3" stroke="currentColor" strokeWidth="1.5">
        {isActive && <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />}
        {isActive && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />}
      </circle>
      <line x1="160" y1="73" x2="160" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="155" y1="82" x2="165" y2="82" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Reviewing figure with clipboard ──────────────────────────────────────────
interface ReviewingFigureProps extends LineArtProps {
  /** When true: clipboard pulses, figure leans in */
  isReviewing?: boolean;
  /** When true: checkmark appears on clipboard */
  isComplete?: boolean;
  /** When true: user is actively searching in search box, holds magnifying glass up to eyes */
  isSearching?: boolean;
  /** When true: no tickets/results exist, shrugs and drops clipboard on floor */
  isEmpty?: boolean;
}

export function ReviewingFigure({ className = '', opacity = 0.85, isReviewing = false, isComplete = false, isSearching = false, isEmpty = false }: ReviewingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const breatheDur = isReviewing ? '2s' : '4s';
  const clipR = isReviewing ? 2.0 : 1.5;

  // Shrug shoulders slightly by changing right and left anchor height on Y
  const shoulderY = isEmpty ? 60 : 72;

  const rightArmD = isEmpty
    ? 'M40 60 C30 52, 22 45, 26 40'
    : 'M40 72 L30 100 L28 130';

  const leftArmD = isEmpty
    ? 'M120 60 C130 52, 138 45, 134 40'
    : isSearching
    ? 'M120 72 C115 52, 105 38, 92 34'
    : 'M120 72 C110 90, 100 100, 90 105';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 160 240"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 10px))',
          transformOrigin: '80px 30px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="80" cy="30" r="16" stroke="currentColor" strokeWidth="1.8">
          <animate attributeName="r" values="16;17;16" dur={breatheDur} repeatCount="indefinite" />
        </circle>

        {/* Eyes peek circle detailing when searching or reviewing */}
        {isReviewing && !isEmpty && !isSearching && (
          <>
            <circle cx="73" cy="30" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="87" cy="30" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <line x1="78" y1="30" x2="82" y2="30" stroke="currentColor" strokeWidth="1.2" />
          </>
        )}
      </g>

      {/* Neck */}
      <line x1="80" y1="46" x2="80" y2="56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Torso */}
      <line x1="80" y1="56" x2="80" y2="130" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Shoulders */}
      <line x1="80" y1="64" x2="40" y2={shoulderY} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="80" y1="64" x2="120" y2={shoulderY} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Right arm */}
      <path d={rightArmD} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      
      {/* Left arm */}
      <path d={leftArmD} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {isReviewing && !isEmpty && !isSearching && (
          <animate attributeName="d" values="M120 72 C110 90, 100 100, 90 105;M120 72 C108 88, 98 98, 88 103;M120 72 C110 90, 100 100, 90 105" dur="2.5s" repeatCount="indefinite" />
        )}
      </path>

      {/* Magnifying Glass (Search mode) */}
      {isSearching && (
        <>
          <line x1="92" y1="34" x2="86" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="x1" values="92;91;92" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="34;33;34" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="86;85;86" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="28;27;28" dur="2s" repeatCount="indefinite" />
          </line>
          <circle cx="83" cy="25" r="5" stroke="currentColor" strokeWidth="1.5">
            <animate attributeName="cx" values="83;82;83" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="25;24;25" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Clipboard representation */}
      {isEmpty ? (
        /* Dropped clipboard on floor */
        <g transform="translate(100, 165) rotate(70)">
          <rect x="0" y="0" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="5" y1="8" x2="19" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5" y1="20" x2="19" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="8" y="-3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </g>
      ) : (
        /* Normal clipboard in hand */
        <>
          <rect x="22" y="110" width="24" height="32" rx="2" stroke="currentColor" strokeWidth={clipR}>
            {isReviewing && <animate attributeName="y" values="110;108;110" dur="2s" repeatCount="indefinite" />}
          </rect>
          <line x1="27" y1="118" x2="41" y2="118" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="27" y1="124" x2="39" y2="124" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="27" y1="130" x2="41" y2="130" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          
          {isComplete && (
            <path d="M27 136 L32 140 L41 132" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <animate attributeName="opacity" values="0;1;0.5;1" dur="1s" repeatCount="indefinite" />
            </path>
          )}

          <rect x="30" y="107" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}

      {/* Legs */}
      <line x1="80" y1="130" x2="68" y2="180" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="80" y1="130" x2="92" y2="180" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="68" y1="180" x2="58" y2="182" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="92" y1="180" x2="102" y2="182" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Deploying figure with box ────────────────────────────────────────────────
interface DeployingFigureProps extends LineArtProps {
  /** When true: box moves up/down excitedly, figure more animated */
  isDeploying?: boolean;
  /** When true: checkmark appears, figure relaxes */
  isDone?: boolean;
}

export function DeployingFigure({ className = '', opacity = 0.75, isDeploying = false, isDone = false }: DeployingFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const breatheDur = isDeploying ? '2.2s' : '4.5s';
  const boxPulseDur = isDeploying ? '0.6s' : '2s';

  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 160 240"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 10px))',
          transformOrigin: '72px 28px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="72" cy="28" r="15" stroke="currentColor" strokeWidth="1.8">
          <animate attributeName="r" values="15;16;15" dur={breatheDur} repeatCount="indefinite" />
        </circle>
      </g>
      <line x1="72" y1="43" x2="72" y2="54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="72" y1="54" x2="72" y2="120" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="72" y1="62" x2="36" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="72" y1="62" x2="108" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      <path d="M36 70 C28 100, 50 120, 48 130" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {isDeploying && <animate attributeName="d" values="M36 70 C28 100, 50 120, 48 130;M36 70 C30 98, 52 118, 50 128;M36 70 C28 100, 50 120, 48 130" dur="1.5s" repeatCount="indefinite" />}
      </path>
      <path d="M108 70 C116 90, 112 110, 108 125" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      <rect x="38" y="122" width="30" height="26" rx="2" stroke="currentColor" strokeWidth="1.8">
        {isDeploying && <animate attributeName="y" values="122;118;122" dur={boxPulseDur} repeatCount="indefinite" />}
        {isDeploying && <animate attributeName="stroke-width" values="1.8;2.6;1.8" dur={boxPulseDur} repeatCount="indefinite" />}
      </rect>
      <line x1="38" y1="132" x2="68" y2="132" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M53 126 L53 144 M47 138 L53 144 L59 138" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {isDeploying && <animate attributeName="opacity" values="0.3;1;0.3" dur={boxPulseDur} repeatCount="indefinite" />}
      </path>

      {isDone && (
        <path d="M42 135 L50 142 L64 126" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <animate attributeName="opacity" values="0;1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </path>
      )}

      <line x1="56" y1="120" x2="88" y2="120" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="56" y1="120" x2="50" y2="170" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="88" y1="120" x2="94" y2="170" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="50" y1="170" x2="40" y2="172" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="94" y1="170" x2="104" y2="172" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Manifest Builder Figure (Module Block Builder / Dependency Graph) ─────────────────
interface ManifestBuilderFigureProps extends LineArtProps {
  isActive?: boolean;
  hasError?: boolean;
}

export function ManifestBuilderFigure({ className = '', opacity = 0.85, isActive = false, hasError = false }: ManifestBuilderFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const lineDash = hasError ? "4,4" : "none";
  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 220 160"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 10px))',
          transformOrigin: '40px 30px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="40" cy="30" r="14" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <line x1="40" y1="44" x2="40" y2="95" stroke="currentColor" strokeWidth="1.8" />
      <line x1="40" y1="52" x2="16" y2="65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right arm stretching to block */}
      <path d={hasError ? "M40 52 C50 48, 62 38, 76 42" : "M40 52 C55 56, 65 65, 78 62"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Legs */}
      <line x1="40" y1="95" x2="25" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="40" y1="95" x2="55" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="25" y1="138" x2="15" y2="139" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="55" y1="138" x2="65" y2="139" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Modules (Dependency Blocks) */}
      {/* Module A */}
      <rect x="90" y="20" width="50" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" strokeDasharray={lineDash} />
      <line x1="98" y1="30" x2="132" y2="30" stroke="currentColor" strokeWidth="1.2" />
      {/* Module B */}
      <rect x="155" y="55" width="50" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" strokeDasharray={lineDash} />
      <line x1="163" y1="65" x2="197" y2="65" stroke="currentColor" strokeWidth="1.2" />
      {/* Module C */}
      <rect x="90" y="90" width="50" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" strokeDasharray={lineDash} />
      <line x1="98" y1="100" x2="132" y2="100" stroke="currentColor" strokeWidth="1.2" />

      {/* Dependency Links */}
      <path d="M140 30 C150 30, 145 65, 155 65" stroke={hasError ? "#ef4444" : "currentColor"} strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M140 100 C150 100, 145 65, 155 65" stroke={hasError ? "#ef4444" : "currentColor"} strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Confused scratch animation indicator / Error exclamation */}
      {hasError ? (
        <g transform="translate(48, 10)">
          <circle cx="0" cy="0" r="7" fill="#ef4444" />
          <text x="-2" y="3" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">!</text>
        </g>
      ) : isActive ? (
        <circle cx="180" cy="30" r="3" fill="#06b6d4">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
        </circle>
      ) : null}
    </svg>
  );
}

// ─── Submission Portal Figure (Server Rack & Console Deploy) ─────────────────────
interface SubmissionPortalFigureProps extends LineArtProps {
  isActive?: boolean;
  isDone?: boolean;
  hasError?: boolean;
}

export function SubmissionPortalFigure({ className = '', opacity = 0.85, isActive = false, isDone = false, hasError = false }: SubmissionPortalFigureProps) {
  const { ref, onMouseMove, onMouseLeave } = useInteractiveFigure();
  const ledColor = hasError ? "#ef4444" : isDone ? "#10b981" : isActive ? "#06b6d4" : "currentColor";
  return (
    <svg
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      viewBox="0 0 200 160"
      className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:text-cyan-500 dark:hover:text-cyan-400 hover:drop-shadow-[0_0_8px_currentColor] active:scale-[0.97] active:translate-y-[1px] ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Server Rack cabinet */}
      <rect x="120" y="20" width="55" height="115" rx="4" stroke="currentColor" strokeWidth="1.8" />
      {/* Server Blade 1 */}
      <rect x="126" y="30" width="43" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="134" cy="37.5" r="2" fill={ledColor}>
        {isActive && <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite" />}
      </circle>
      <line x1="142" y1="37" x2="160" y2="37" stroke="currentColor" strokeWidth="1" />
      {/* Server Blade 2 */}
      <rect x="126" y="55" width="43" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="134" cy="62.5" r="2" fill={ledColor}>
        {isActive && <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" begin="0.2s" repeatCount="indefinite" />}
      </circle>
      <line x1="142" y1="62" x2="160" y2="62" stroke="currentColor" strokeWidth="1" />
      {/* Server Blade 3 */}
      <rect x="126" y="80" width="43" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="134" cy="87.5" r="2" fill={ledColor}>
        {isActive && <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" begin="0.4s" repeatCount="indefinite" />}
      </circle>
      <line x1="142" y1="87" x2="160" y2="87" stroke="currentColor" strokeWidth="1" />
      {/* Server Blade 4 */}
      <rect x="126" y="105" width="43" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="134" cy="112.5" r="2" fill={ledColor}>
        {isActive && <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" begin="0.6s" repeatCount="indefinite" />}
      </circle>
      <line x1="142" y1="112" x2="160" y2="112" stroke="currentColor" strokeWidth="1" />

      {/* Head Group */}
      <g
        style={{
          transform: 'translate(calc(var(--mouse-x, 0) * 10px), calc(var(--mouse-y, 0) * 10px))',
          transformOrigin: '40px 30px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <circle cx="40" cy="30" r="14" stroke="currentColor" strokeWidth="1.8" />
      </g>
      <line x1="40" y1="44" x2="40" y2="95" stroke="currentColor" strokeWidth="1.8" />
      <line x1="40" y1="52" x2="16" y2="65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right arm reaching server console to deploy */}
      <path d={isActive ? "M40 52 Q75 42, 115 50" : "M40 52 Q70 65, 115 70"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {isActive && <animate attributeName="d" values="M40 52 Q75 42, 115 50;M40 52 Q75 46, 115 50;M40 52 Q75 42, 115 50" dur="1.5s" repeatCount="indefinite" />}
      </path>
      {/* Legs */}
      <line x1="40" y1="95" x2="25" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="40" y1="95" x2="55" y2="138" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="25" y1="138" x2="15" y2="139" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="55" y1="138" x2="65" y2="139" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      {/* Status indicator badge bubble on top of rack */}
      {hasError ? (
        <g transform="translate(148, 5)">
          <circle cx="0" cy="0" r="8" fill="#ef4444" />
          <text x="-2" y="3" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">!</text>
        </g>
      ) : isDone ? (
        <g transform="translate(148, 5)">
          <circle cx="0" cy="0" r="8" fill="#10b981" />
          <path d="M-4 0 L-1 3 L4 -3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ) : null}
    </svg>
  );
}

// ─── Technical Blueprint Grid Accent ──────────────────────────────────────────
export function BlueprintGrid({ className = '', opacity = 0.15 }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, overflow: 'visible' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid pattern lines */}
      <defs>
        <pattern id="blueprint-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M 20 0 L 20 40 M 0 20 L 40 20" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2,2" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#blueprint-pattern)" />
      
      {/* Technical coordinate markings */}
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="380" cy="20" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="180" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="380" cy="180" r="2" fill="currentColor" opacity="0.4" />

      {/* Blueprint crosshairs and corner tags */}
      <path d="M12 20 H28 M20 12 V28" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M372 180 H388 M380 172 V188" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      
      {/* Small tech text accents */}
      <text x="32" y="24" fill="currentColor" opacity="0.3" fontSize="8" fontFamily="monospace">REF_001</text>
      <text x="335" y="184" fill="currentColor" opacity="0.3" fontSize="8" fontFamily="monospace">SYS_GRID_v2.0</text>
    </svg>
  );
}
