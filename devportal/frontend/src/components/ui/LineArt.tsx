import { useEffect, useRef } from 'react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface LineArtProps {
  className?: string;
  opacity?: number;
}

// ─── Human thinking figure ────────────────────────────────────────────────────
interface ThinkingFigureProps extends LineArtProps {
  /** When true, thought bubbles animate faster and glow — use during validation */
  isThinking?: boolean;
  /** When true, figure leans back / arm recoils — use during error state */
  hasError?: boolean;
}

export function ThinkingFigure({ className = '', opacity = 0.18, isThinking = false, hasError = false }: ThinkingFigureProps) {
  const bubbleDur   = isThinking ? '1.4s' : '3s';
  const breatheDur  = isThinking ? '1.8s' : '4s';
  const armD        = hasError
    ? 'M58 90 C45 108, 55 126, 70 134'
    : 'M58 90 C50 110, 62 128, 78 132';
  const armVariants = hasError
    ? 'M58 90 C45 108, 55 126, 70 134;M58 90 C48 104, 58 124, 72 132;M58 90 C45 108, 55 126, 70 134'
    : 'M58 90 C50 110, 62 128, 78 132;M58 90 C52 106, 64 126, 80 130;M58 90 C50 110, 62 128, 78 132';

  return (
    <svg
      viewBox="0 -15 200 295"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="100" cy="38" r="22" stroke="currentColor" strokeWidth="1.2">
        <animate attributeName="r" values="22;23;22" dur={breatheDur} repeatCount="indefinite" />
      </circle>

      {/* Thought bubble dots */}
      <circle cx="126" cy="20" r="3" stroke="currentColor" strokeWidth="1"
        fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.3 : 0}>
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0s" repeatCount="indefinite" />
      </circle>
      <circle cx="134" cy="12" r="4.5" stroke="currentColor" strokeWidth="1"
        fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.2 : 0}>
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="146" cy="5" r="6" stroke="currentColor" strokeWidth="1"
        fill={isThinking ? 'currentColor' : 'none'} fillOpacity={isThinking ? 0.15 : 0}>
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="0.8s" repeatCount="indefinite" />
      </circle>

      {/* Thought bubble cloud */}
      <ellipse cx="166" cy="5" rx="18" ry="14" stroke="currentColor" strokeWidth={isThinking ? '1.4' : '1'}>
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.2s" repeatCount="indefinite" />
      </ellipse>

      {/* Thought lines inside bubble */}
      <line x1="153" y1="5" x2="178" y2="5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.5s" repeatCount="indefinite" />
      </line>
      <line x1="155" y1="9" x2="175" y2="9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;0" dur={bubbleDur} begin="1.7s" repeatCount="indefinite" />
      </line>

      {/* Neck */}
      <line x1="100" y1="60" x2="100" y2="72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Torso */}
      <line x1="100" y1="72" x2="100" y2="150" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Shoulders */}
      <line x1="100" y1="80" x2="58" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="100" y1="80" x2="142" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Left arm — raised to chin (thinking pose) / recoils on error */}
      <path d={armD} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <animate attributeName="d" values={armVariants} dur="5s" repeatCount="indefinite" />
      </path>
      {/* Right arm — relaxed */}
      <path d="M142 90 C150 112, 148 130, 140 145" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Hips */}
      <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Left leg */}
      <path d="M80 150 L72 210 L68 270" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Right leg */}
      <path d="M120 150 L128 210 L132 270" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Left foot */}
      <line x1="68" y1="270" x2="52" y2="272" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Right foot */}
      <line x1="132" y1="270" x2="148" y2="272" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Neural network / brain art ───────────────────────────────────────────────
export function NeuralArt({ className = '', opacity = 0.12 }: LineArtProps) {
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
      style={{ opacity }}
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
          strokeWidth="0.8"
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
        <circle key={i} cx={n.x} cy={n.y} r="4" stroke="currentColor" strokeWidth="1.2">
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

export function WalkingFigures({ className = '', opacity = 0.12, searchActive = false }: WalkingFiguresProps) {
  const dur = searchActive ? '0.8s' : '1.8s';
  const dur2 = searchActive ? '0.9s' : '2s';

  return (
    <svg
      viewBox="0 0 400 160"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Figure 1 */}
      <g transform="translate(60, 10)">
        <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 0 42;15 0 42;0 0 42;-15 0 42;0 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 0 42;-15 0 42;0 0 42;15 0 42;0 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 -12 80;20 -12 80;0 -12 80;-20 -12 80;0 -12 80" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 12 80;-20 12 80;0 12 80;20 12 80;0 12 80" dur={dur} repeatCount="indefinite" />
        </line>
      </g>
      {/* Figure 2 */}
      <g transform="translate(180, 10)">
        <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-15 0 42;0 0 42;15 0 42;0 0 42;-15 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="15 0 42;0 0 42;-15 0 42;0 0 42;15 0 42" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-20 -12 80;0 -12 80;20 -12 80;0 -12 80;-20 -12 80" dur={dur} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="20 12 80;0 12 80;-20 12 80;0 12 80;20 12 80" dur={dur} repeatCount="indefinite" />
        </line>
      </g>
      {/* Figure 3 */}
      <g transform="translate(300, 10)">
        <circle cx="0" cy="18" r="12" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="30" x2="0" y2="80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1="42" x2="-22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="10 0 42;-10 0 42;10 0 42" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="0" y1="42" x2="22" y2="62" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-10 0 42;10 0 42;-10 0 42" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="-12" y1="80" x2="-18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="15 -12 80;-15 -12 80;15 -12 80" dur={dur2} repeatCount="indefinite" />
        </line>
        <line x1="12" y1="80" x2="18" y2="120" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-15 12 80;15 12 80;-15 12 80" dur={dur2} repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

// ─── Floating data nodes / particle field ─────────────────────────────────────
export function DataParticles({ className = '', opacity = 0.1 }: LineArtProps) {
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
      r: Math.random() * 2 + 1,
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
        ctx.fillStyle = `rgba(${color},0.5)`;
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
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
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
export function SignalWaves({ className = '', opacity = 0.08 }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 800 120"
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 20, 40].map((offset, i) => (
        <path
          key={i}
          stroke="currentColor"
          strokeWidth="1"
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

export function CodingFigure({ className = '', opacity = 0.18, isTyping = false, hasError = false }: CodingFigureProps) {
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
      viewBox="0 0 200 240"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Monitor */}
      <rect x="50" y="20" width="100" height="68" rx="4" stroke="currentColor" strokeWidth="1.2" />
      {/* Monitor stand */}
      <line x1="100" y1="88" x2="100" y2="105" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="105" x2="120" y2="105" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Code lines on screen — more animate when typing */}
      <line x1="62" y1="38" x2="95" y2="38" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="95;88;102;90;95" dur="1.8s" repeatCount="indefinite" />}
      </line>
      <line x1="62" y1="48" x2="110" y2="48" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="68" y1="58" x2="105" y2="58" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="105;112;98;105" dur="2.2s" repeatCount="indefinite" />}
      </line>
      <line x1="68" y1="68" x2="88" y2="68" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {isTyping && <animate attributeName="x2" values="88;96;82;88" dur="1.5s" repeatCount="indefinite" />}
      </line>

      {/* Blinking cursor — fast when typing */}
      <line x1="90" y1="63" x2="90" y2="74" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
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

      {/* Head */}
      <circle cx="148" cy={headCy} r="16" stroke="currentColor" strokeWidth="1.2">
        <animate attributeName="cy" values={headBounce} dur={breatheDur} repeatCount="indefinite" />
      </circle>

      {/* Neck */}
      <line x1="148" y1="138" x2="145" y2="150" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Torso — hunched or slumped */}
      <path d={torsoD} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Arms on desk — fingers tap when typing */}
      <path d="M142 160 C128 165, 115 168, 100 170" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {isTyping && (
          <animate attributeName="d"
            values="M142 160 C128 165, 115 168, 100 170;M142 158 C128 163, 115 166, 100 168;M142 160 C128 165, 115 168, 100 170"
            dur="0.4s" repeatCount="indefinite" />
        )}
      </path>
      <path d="M145 160 C155 163, 162 166, 168 168" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {isTyping && (
          <animate attributeName="d"
            values="M145 160 C155 163, 162 166, 168 168;M145 158 C155 161, 162 164, 168 166;M145 160 C155 163, 162 166, 168 168"
            dur="0.4s" begin="0.2s" repeatCount="indefinite" />
        )}
      </path>

      {/* Keyboard */}
      <rect x="88" y="170" width="84" height="14" rx="3" stroke="currentColor" strokeWidth="1" />
      {[96,104,112,120,128,136,144,152,160].map((x, i) => (
        <line key={i} x1={x} y1="175" x2={x} y2="179" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      ))}

      {/* Chair legs */}
      <line x1="132" y1="195" x2="122" y2="235" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="132" y1="195" x2="148" y2="230" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Feet */}
      <line x1="122" y1="235" x2="108" y2="237" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="148" y1="230" x2="162" y2="233" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

export function PresentingFigure({ className = '', opacity = 0.16, isActive = false, isDone = false }: PresentingFigureProps) {
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
      viewBox="0 0 200 310"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="72" cy="38" r="20" stroke="currentColor" strokeWidth="1.2">
        <animate attributeName="r" values="20;21;20" dur={breatheDur} repeatCount="indefinite" />
      </circle>

      {/* Neck */}
      <line x1="72" y1="58" x2="72" y2="70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Torso — leans forward when active */}
      <line
        x1="72" y1="70" x2={isActive ? '74' : '72'} y2="155"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
      />

      {/* Shoulders */}
      <line x1="72" y1="80" x2="36" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="72" y1="80" x2="108" y2="90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Right arm — pointing / gesturing */}
      <path d={armD} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <animate attributeName="d" values={armVariants} dur={armDur} repeatCount="indefinite" />
      </path>

      {/* Pointer tip */}
      <circle cx="165" cy={tipCy} r={isActive ? '3.5' : '2.5'} stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values={isActive ? '1;0.2;1' : '1;0.4;1'} dur={boardPulseDur} repeatCount="indefinite" />
        {isActive && <animate attributeName="r" values="3.5;5;3.5" dur={boardPulseDur} repeatCount="indefinite" />}
      </circle>

      {/* Left arm — relaxed at side */}
      <path d="M36 90 C28 112, 30 132, 34 148" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Hips */}
      <line x1="54" y1="155" x2="90" y2="155" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Legs */}
      <path d="M90 155 L96 220 L98 290" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M54 155 L50 220 L46 290" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Feet */}
      <line x1="98" y1="290" x2="115" y2="292" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="46" y1="290" x2="30" y2="292" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Board */}
      <rect x="168" y={isActive ? '52' : '62'} width="26" height="60" rx="2" stroke="currentColor" strokeWidth={isActive ? '1.3' : '1'}>
        {isActive && <animate attributeName="y" values="52;50;52" dur="1.6s" repeatCount="indefinite" />}
      </rect>
      {/* Lines on board */}
      <line x1="172" y1="74" x2="190" y2="74" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="172" y1="82" x2="187" y2="82" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="172" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="172" y1="98" x2="184" y2="98" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Dot accent */}
      <circle cx="181" cy="110" r={isActive ? '4' : '3'} stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values={isActive ? '1;0.1;1' : '0.4;1;0.4'} dur={boardPulseDur} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── Collaborating figures (two figures working together) ─────────────────────
interface CollaboratingFigureProps extends LineArtProps {
  /** When true: figures gesture more and lean in */
  isActive?: boolean;
}

export function CollaboratingFigure({ className = '', opacity = 0.14, isActive = false }: CollaboratingFigureProps) {
  const armDur = isActive ? '2s' : '4s';
  const breatheDur = isActive ? '2.2s' : '4.5s';
  const headR = isActive ? '13' : '12';

  return (
    <svg
      viewBox="0 0 240 200"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Figure A (left) */}
      <g transform="translate(40, 10)">
        <circle cx="30" cy="20" r={headR} stroke="currentColor" strokeWidth="1.2">
          <animate attributeName="r" values={`${headR};${+headR + 1};${headR}`} dur={breatheDur} repeatCount="indefinite" />
        </circle>
        <line x1="30" y1="32" x2="30" y2="70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="40" x2="8" y2="55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="40" x2="52" y2="55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M52 55 C58 58, 65 60, 72 60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
          {isActive && <animate attributeName="d" values="M52 55 C58 58, 65 60, 72 60;M52 55 C58 56, 65 58, 74 58;M52 55 C58 58, 65 60, 72 60" dur={armDur} repeatCount="indefinite" />}
        </path>
        <line x1="15" y1="70" x2="10" y2="115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          {isActive && <animate attributeName="x1" values="15;13;15" dur={armDur} repeatCount="indefinite" />}
        </line>
        <line x1="45" y1="70" x2="50" y2="115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          {isActive && <animate attributeName="x1" values="45;47;45" dur={armDur} repeatCount="indefinite" />}
        </line>
        <line x1="10" y1="115" x2="5" y2="138" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="115" x2="55" y2="138" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="5" y1="138" x2="0" y2="140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="55" y1="138" x2="60" y2="140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Figure B (right) */}
      <g transform="translate(120, 10)">
        <circle cx="30" cy="20" r={headR} stroke="currentColor" strokeWidth="1.2">
          <animate attributeName="r" values={`${headR};${+headR + 1};${headR}`} dur={breatheDur} begin="0.5s" repeatCount="indefinite" />
        </circle>
        <line x1="30" y1="32" x2="30" y2="70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="40" x2="8" y2="55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="40" x2="52" y2="55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 55 C2 58, -5 60, -12 60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
          {isActive && <animate attributeName="d" values="M8 55 C2 58, -5 60, -12 60;M8 55 C2 56, -5 58, -14 58;M8 55 C2 58, -5 60, -12 60" dur={armDur} begin="0.5s" repeatCount="indefinite" />}
        </path>
        <line x1="15" y1="70" x2="10" y2="115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="45" y1="70" x2="50" y2="115" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="115" x2="5" y2="138" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="115" x2="55" y2="138" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="5" y1="138" x2="0" y2="140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="55" y1="138" x2="60" y2="140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <circle cx="160" cy="70" r="3" stroke="currentColor" strokeWidth="1">
        {isActive && <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />}
        {isActive && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />}
      </circle>
      <line x1="160" y1="73" x2="160" y2="90" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="155" y1="82" x2="165" y2="82" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Reviewing figure with clipboard ──────────────────────────────────────────
interface ReviewingFigureProps extends LineArtProps {
  /** When true: clipboard pulses, figure leans in */
  isReviewing?: boolean;
  /** When true: checkmark appears on clipboard */
  isComplete?: boolean;
}

export function ReviewingFigure({ className = '', opacity = 0.14, isReviewing = false, isComplete = false }: ReviewingFigureProps) {
  const breatheDur = isReviewing ? '2s' : '4s';
  const clipR = isReviewing ? '1.4' : '1';

  return (
    <svg
      viewBox="0 0 160 240"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="80" cy="30" r="16" stroke="currentColor" strokeWidth="1.2">
        <animate attributeName="r" values="16;17;16" dur={breatheDur} repeatCount="indefinite" />
      </circle>

      {isReviewing && (
        <>
          <circle cx="73" cy="30" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="87" cy="30" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <line x1="78" y1="30" x2="82" y2="30" stroke="currentColor" strokeWidth="0.8" />
        </>
      )}

      <line x1="80" y1="46" x2="80" y2="56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="56" x2="80" y2="130" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="64" x2="40" y2="72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="64" x2="120" y2="72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      <path d="M40 72 L30 100 L28 130" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M120 72 C110 90, 100 100, 90 105" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {isReviewing && <animate attributeName="d" values="M120 72 C110 90, 100 100, 90 105;M120 72 C108 88, 98 98, 88 103;M120 72 C110 90, 100 100, 90 105" dur="2.5s" repeatCount="indefinite" />}
      </path>

      <rect x="22" y="110" width="24" height="32" rx="2" stroke="currentColor" strokeWidth={clipR}>
        {isReviewing && <animate attributeName="y" values="110;108;110" dur="2s" repeatCount="indefinite" />}
      </rect>
      <line x1="27" y1="118" x2="41" y2="118" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="27" y1="124" x2="39" y2="124" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="27" y1="130" x2="41" y2="130" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />

      {isComplete && (
        <path d="M27 136 L32 140 L41 132" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <animate attributeName="opacity" values="0;1;0.5;1" dur="1s" repeatCount="indefinite" />
        </path>
      )}

      <rect x="30" y="107" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1" />

      <line x1="80" y1="130" x2="68" y2="180" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="130" x2="92" y2="180" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="68" y1="180" x2="58" y2="182" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="92" y1="180" x2="102" y2="182" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

export function DeployingFigure({ className = '', opacity = 0.14, isDeploying = false, isDone = false }: DeployingFigureProps) {
  const breatheDur = isDeploying ? '2.2s' : '4.5s';
  const boxPulseDur = isDeploying ? '0.6s' : '2s';

  return (
    <svg
      viewBox="0 0 160 240"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="72" cy="28" r="15" stroke="currentColor" strokeWidth="1.2">
        <animate attributeName="r" values="15;16;15" dur={breatheDur} repeatCount="indefinite" />
      </circle>
      <line x1="72" y1="43" x2="72" y2="54" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="72" y1="54" x2="72" y2="120" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="72" y1="62" x2="36" y2="70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="72" y1="62" x2="108" y2="70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      <path d="M36 70 C28 100, 50 120, 48 130" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {isDeploying && <animate attributeName="d" values="M36 70 C28 100, 50 120, 48 130;M36 70 C30 98, 52 118, 50 128;M36 70 C28 100, 50 120, 48 130" dur="1.5s" repeatCount="indefinite" />}
      </path>
      <path d="M108 70 C116 90, 112 110, 108 125" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      <rect x="38" y="122" width="30" height="26" rx="2" stroke="currentColor" strokeWidth="1.2">
        {isDeploying && <animate attributeName="y" values="122;118;122" dur={boxPulseDur} repeatCount="indefinite" />}
        {isDeploying && <animate attributeName="stroke-width" values="1.2;1.8;1.2" dur={boxPulseDur} repeatCount="indefinite" />}
      </rect>
      <line x1="38" y1="132" x2="68" y2="132" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M53 126 L53 144 M47 138 L53 144 L59 138" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {isDeploying && <animate attributeName="opacity" values="0.3;1;0.3" dur={boxPulseDur} repeatCount="indefinite" />}
      </path>

      {isDone && (
        <path d="M42 135 L50 142 L64 126" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <animate attributeName="opacity" values="0;1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </path>
      )}

      <line x1="56" y1="120" x2="88" y2="120" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="56" y1="120" x2="50" y2="170" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="88" y1="120" x2="94" y2="170" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="170" x2="40" y2="172" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="94" y1="170" x2="104" y2="172" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
