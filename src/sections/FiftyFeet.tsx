import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { story, type StoryBeat } from '../content';
import { ReticleIcon } from '../components/Icons';
import { SectionHead } from '../components/SectionHead';
import { springValues } from '../lib/motion';

const TICKS = [0, 10, 20, 30, 40, 50];

export function FiftyFeet() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, springValues.scroll);

  const draw = useTransform(progress, [0.02, 0.92], [0, 1], { clamp: true });
  const reticleX = useTransform(draw, (v) => `${v * 100}%`);
  const feet = useTransform(draw, (v) => String(Math.round(v * story.distanceFt)).padStart(2, '0'));
  const [hit, setHit] = useState(false);
  useMotionValueEvent(draw, 'change', (v) => setHit(v > 0.985));

  return (
    <section id="story" className="story defer-render" aria-labelledby="story-title">
      <div className="story-track" ref={trackRef}>
        <div className="story-stage">
          <div className="story-stage-inner container">
            <SectionHead id="story-title" index="01" label={story.label} title={story.heading} className="story-head" />

            <div className="story-counter" aria-hidden="true">
              <motion.span className="count-live">{feet}</motion.span>
              <span className="count-static">{story.distanceFt}</span>
              <span className="count-unit">ft</span>
            </div>

            <div className={`sightline${hit ? ' is-hit' : ''}`} aria-hidden="true">
              <div className="sl-marker sl-from">
                <MiniPub variant="marksman" />
                <span className="sl-name label">{story.from}</span>
              </div>
              <div className="sl-track">
                <div className="sl-dash" />
                <motion.div className="sl-line" style={{ scaleX: draw }} />
                <motion.div className="sl-tip" style={{ x: reticleX }}>
                  <span className="sl-reticle">
                    <ReticleIcon />
                  </span>
                </motion.div>
                <div className="sl-scale">
                  {TICKS.map((t) => (
                    <span key={t} style={{ left: `${(t / 50) * 100}%` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sl-marker sl-to">
                <MiniPub variant="nelson" />
                <span className="sl-name label">{story.to}</span>
              </div>
            </div>
            <p className="vh">
              The Marksman and the {story.to} stood about {story.distanceFt} feet apart off Hackney Road.
            </p>
          </div>
        </div>

        <ol className="story-beats">
          {story.beats.map((beat, i) => (
            <Beat key={beat.id} beat={beat} index={i} total={story.beats.length} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Little elevation drawings of the two pubs at either end of the line. */
function MiniPub({ variant }: { variant: 'marksman' | 'nelson' }) {
  const marksman = variant === 'marksman';
  return (
    <svg className={`minipub minipub--${variant}`} viewBox="0 0 80 72" aria-hidden="true">
      <rect x="8" y="14" width="64" height="30" fill={marksman ? '#cdb78d' : '#e3d6bd'} stroke="#1f1a16" strokeWidth="1.4" />
      <rect x="4" y="9" width="72" height="6" fill="#ece2cd" stroke="#1f1a16" strokeWidth="1.4" />
      {[16, 34, 52].map((x) => (
        <rect key={x} x={x} y="19" width="12" height="18" fill="#f0c26e" stroke="#1f1a16" strokeWidth="1.2" />
      ))}
      <rect x="8" y="44" width="64" height="26" fill={marksman ? '#7a4325' : '#efe6d2'} stroke="#1f1a16" strokeWidth="1.4" />
      <rect x="11" y="45" width="58" height="7" fill={marksman ? '#233a2f' : '#a6361f'} />
      <rect x="14" y="55" width="20" height="13" fill="#f0c26e" stroke="#1f1a16" strokeWidth="1.1" />
      <rect x="46" y="55" width="20" height="13" fill="#f0c26e" stroke="#1f1a16" strokeWidth="1.1" />
      <rect x="36" y="54" width="8" height="16" fill={marksman ? '#233a2f' : '#1f1a16'} />
      {marksman ? (
        <g>
          <path d="M72 50h6" stroke="#1f1a16" strokeWidth="1.2" />
          <circle cx="76" cy="57" r="4" fill="#f3ead8" stroke="#1f1a16" />
          <circle cx="76" cy="57" r="2" fill="#a6361f" />
        </g>
      ) : (
        <path d="M2 50h6M4 52v10h6V52" stroke="#1f1a16" strokeWidth="1.2" fill="#233a2f" />
      )}
    </svg>
  );
}

function Beat({ beat, index, total }: { beat: StoryBeat; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const first = index === 0;
  const last = index === total - 1;
  const opacity = useTransform(
    scrollYProgress,
    [0.28, 0.44, 0.56, 0.68],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(scrollYProgress, [0.28, 0.5, 0.7], [first ? 0 : 40, 0, -30]);

  return (
    <li ref={ref} className={`beat${last ? ' beat--last' : ''}`}>
      <BeatCard beat={beat} opacity={opacity} y={y} last={last} />
    </li>
  );
}

function BeatCard({
  beat,
  opacity,
  y,
  last,
}: {
  beat: StoryBeat;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  last: boolean;
}) {
  return (
    <motion.article className="beat-card container" style={{ opacity, y }}>
      <p className="beat-year">{beat.year}</p>
      <p className="beat-kicker label">
        {last && <span className="oct" aria-hidden="true" />} {beat.kicker}
      </p>
      <h3 className="beat-title">{beat.title}</h3>
      <p className="beat-body">{beat.body}</p>
    </motion.article>
  );
}
