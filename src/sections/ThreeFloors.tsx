import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { floors, type Floor } from '../content';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../components/Button';
import { ImageSlot } from '../components/ImageSlot';
import { SectionHead } from '../components/SectionHead';
import { springValues } from '../lib/motion';
import { Building } from './Building';

const DIAL_LABELS = ['G', '1', 'R'];

export function ThreeFloors() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, springValues.scroll);

  const pub = useTransform(p, [0, 0.26, 0.4], [1, 1, 0]);
  const dining = useTransform(p, [0.26, 0.4, 0.6, 0.74], [0, 1, 1, 0]);
  const roof = useTransform(p, [0.6, 0.74], [0, 1]);

  // Camera climbs from the pub to the roof (percent of the building's height).
  const camRaw = useTransform(p, [0, 0.22, 0.44, 0.56, 0.78, 1], [-25, -25, 7, 7, 27, 27]);
  const camY = useSpring(camRaw, springValues.camera);
  const camYPct = useTransform(camY, (v) => `${v}%`);
  const needle = useTransform(p, [0, 0.22, 0.44, 0.56, 0.78, 1], [-58, -58, 0, 0, 58, 58]);

  return (
    <section id="floors" className="floors defer-render" aria-labelledby="floors-title">
      <div className="container">
        <SectionHead id="floors-title" index="02" label={floors.label} title={floors.heading} />
      </div>

      <div className="floors-track" ref={trackRef}>
        <div className="floors-stage">
          <div className="floors-scene">
            <motion.div className="floors-camera" style={{ y: camYPct }}>
              <Building pub={pub} dining={dining} roof={roof} />
            </motion.div>
          </div>
          <LiftDial needle={needle} />
        </div>

        <ol className="floors-steps">
          {floors.items.map((floor, i) => (
            <FloorStep key={floor.id} floor={floor} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function LiftDial({ needle }: { needle: MotionValue<number> }) {
  return (
    <div className="lift-dial" aria-hidden="true">
      <svg viewBox="0 0 120 70">
        <path d="M10 62a50 50 0 0 1 100 0" fill="#fbf8f1" stroke="#1f1a16" strokeWidth="1.4" />
        <path d="M18 62a42 42 0 0 1 84 0" fill="none" stroke="#1f1a16" strokeOpacity=".35" strokeWidth="0.8" />
        {[-58, 0, 58].map((a, i) => {
          const rad = ((a - 90) * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 36;
          const y = 62 + Math.sin(rad) * 36;
          const tx = 60 + Math.cos(rad) * 50;
          const ty = 62 + Math.sin(rad) * 50;
          const tx2 = 60 + Math.cos(rad) * 44;
          const ty2 = 62 + Math.sin(rad) * 44;
          return (
            <g key={a}>
              <line x1={tx} y1={ty} x2={tx2} y2={ty2} stroke="#1f1a16" strokeWidth="1.2" />
              <text x={x} y={y + 4} textAnchor="middle" className="dial-label">
                {DIAL_LABELS[i]}
              </text>
            </g>
          );
        })}
        <motion.g style={{ rotate: needle, originX: '60px', originY: '62px' }}>
          <path d="M60 62L58.4 60 60 20 61.6 60z" fill="#a6361f" />
        </motion.g>
        <circle cx="60" cy="62" r="4.5" fill="#1f1a16" />
        <circle cx="60" cy="62" r="1.6" fill="#d29a34" />
      </svg>
    </div>
  );
}

function FloorStep({ floor, index }: { floor: Floor; index: number }) {
  const { open } = useBooking();
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const first = index === 0;
  const last = index === floors.items.length - 1;
  const opacity = useTransform(scrollYProgress, [0.26, 0.42, 0.58, 0.72], [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(scrollYProgress, [0.26, 0.5, 0.72], [first ? 0 : 48, 0, -36]);
  return (
    <li ref={ref} className={`floor-step floor-step--${floor.id}`}>
      <motion.article className="floor-card" aria-labelledby={`floor-${floor.id}`} style={{ opacity, y }}>
        <ImageSlot slot={floor.image} shape="oval" className="floor-photo" />
        <div className="floor-text">
          <p className="floor-level label">
            <span className="floor-level-mark">{floor.level}</span> {floor.levelName}
          </p>
          <h3 id={`floor-${floor.id}`} className="floor-name">
            {floor.name}
          </h3>
          <p className="floor-line">{floor.lines[0]}</p>
          <p className="floor-line">{floor.lines[1]}</p>
          <div className="floor-cta">
            {floor.cta.kind === 'book' ? (
              <Button small onClick={() => open()}>
                {floor.cta.label}
              </Button>
            ) : (
              <Button small variant="ghost" href={floor.cta.href}>
                {floor.cta.label}
              </Button>
            )}
            {floor.cta.note && <span className="floor-note label">{floor.cta.note}</span>}
          </div>
        </div>
      </motion.article>
    </li>
  );
}
