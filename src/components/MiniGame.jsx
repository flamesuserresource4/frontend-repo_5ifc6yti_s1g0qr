import React, { useEffect, useRef, useState } from 'react';

// A lightweight, neon mini-game: steer the ship with your mouse to collect light orbs
// and dodge void rings. Pure canvas, no external libs.
export default function MiniGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // Player state
    const player = { x: w / 2, y: h * 0.8, r: 10 };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      player.x = e.clientX - rect.left;
      player.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', onMove);

    // Particles
    const orbs = [];
    const voids = [];
    const rnd = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < 36; i++) {
      orbs.push({ x: rnd(0, w), y: rnd(-h, 0), r: rnd(3, 5), s: rnd(1.2, 2.4) });
    }
    for (let i = 0; i < 16; i++) {
      voids.push({ x: rnd(0, w), y: rnd(-h, 0), r: rnd(8, 14), s: rnd(1.4, 2.2) });
    }

    let anim;
    let last = performance.now();
    let localScore = 0;

    const glow = (c, blur, color) => {
      c.shadowBlur = blur;
      c.shadowColor = color;
      c.strokeStyle = color;
      c.fillStyle = color;
    };

    const loop = (t) => {
      if (!playing) return; // pause if not playing

      const dt = Math.min(32, t - last) / 16.6667; // normalize frames
      last = t;

      ctx.clearRect(0, 0, w, h);

      // Starfield
      for (let i = 0; i < 120; i++) {
        const sx = (i * 23) % w;
        const sy = (i * 97 + t * 0.05) % h;
        ctx.globalAlpha = 0.25 + ((i % 5) / 20);
        glow(ctx, 4, '#38ef7d');
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7 + (i % 3) * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Orbs (collect)
      orbs.forEach((o) => {
        o.y += o.s * dt * 1.2;
        if (o.y - o.r > h) {
          o.x = rnd(0, w);
          o.y = -10;
        }
        glow(ctx, 12, 'rgba(34,197,94,0.9)');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        // collision
        const dx = o.x - player.x;
        const dy = o.y - player.y;
        const dist = Math.hypot(dx, dy);
        if (dist < o.r + player.r) {
          localScore += 1;
          o.x = rnd(0, w);
          o.y = -10;
        }
      });

      // Voids (avoid)
      ctx.lineWidth = 2;
      voids.forEach((v) => {
        v.y += v.s * dt * 1.1;
        if (v.y - v.r > h) {
          v.x = rnd(0, w);
          v.y = -10;
        }
        glow(ctx, 10, 'rgba(52,211,153,0.6)');
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
        ctx.stroke();

        const dx = v.x - player.x;
        const dy = v.y - player.y;
        const dist = Math.hypot(dx, dy);
        if (dist < v.r + player.r) {
          // brief penalty flash
          localScore = Math.max(0, localScore - 2);
          v.x = rnd(0, w);
          v.y = -10;
        }
      });

      // Player ship
      glow(ctx, 18, 'rgba(34,197,94,0.9)');
      ctx.beginPath();
      ctx.moveTo(player.x, player.y - player.r - 4);
      ctx.lineTo(player.x - player.r, player.y + player.r);
      ctx.lineTo(player.x + player.r, player.y + player.r);
      ctx.closePath();
      ctx.fill();

      // HUD
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.font = '600 14px Inter, ui-sans-serif, system-ui';
      ctx.fillText(`Score: ${localScore}`, 16, 24);

      setScore(localScore);
      anim = requestAnimationFrame(loop);
    };

    resize();
    anim = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, [playing]);

  return (
    <section id="play" className="relative bg-black py-16 text-green-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold sm:text-4xl">HyperTunnel Mini‑Game</h2>
          <p className="mt-3 max-w-prose text-green-300/80">
            Steer your neon ship with the mouse. Collect glowing orbs, dodge void rings, and chase a flow state.
          </p>
          <div className="mt-4 inline-flex items-center gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full border border-green-400/40 bg-green-500/10 px-4 py-2 text-sm hover:bg-green-500/20"
            >
              {playing ? 'Pause' : 'Resume'}
            </button>
            <span className="text-sm text-green-300/80">Score: {score}</span>
          </div>
        </div>
        <div className="relative flex-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-green-500/20 bg-black/60 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
            <canvas ref={canvasRef} className="h-full w-full" />

            {/* Edge glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-green-400/10" />
            <div className="pointer-events-none absolute -inset-16 -z-[1] rounded-[2rem] bg-gradient-to-tr from-green-500/0 via-green-500/10 to-green-500/0 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
