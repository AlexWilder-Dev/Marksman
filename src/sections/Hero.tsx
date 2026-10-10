import { animate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, type PointerEvent } from 'react';
import { booking, hero, images, venue } from '../content';
import { Button } from '../components/Button';
import { Facade } from '../components/Facade';
import { ImageSlot } from '../components/ImageSlot';
import { StatusChip } from '../components/StatusChip';
import { useBooking } from '../booking/BookingContext';
import { useReducedMotion } from '../lib/hooks';
import { springValues } from '../lib/motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { open, preload } = useBooking();
  const reduced = useReducedMotion();

  // Glint position across the façade, 0..1.
  const gx = useMotionValue(0.2);
  const smooth = useSpring(gx, springValues.light);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const glintX = useTransform([smooth, scrollYProgress], ([g, s]: number[]) => -120 + (g + s * 0.8) * 760);
  const pointerDriven = useRef(false);

  // Slow sunlight sweep on touch screens, and until the pointer moves.
  useEffect(() => {
    if (reduced) {
      gx.set(0.2);
      return;
    }
    const anim = animate(gx, [0, 1], {
      duration: 7,
      ease: [0.45, 0, 0.55, 1],
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 2.5,
    });
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const node = ref.current;
    const onFirstMove = () => {
      if (!fine.matches) return;
      pointerDriven.current = true;
      anim.stop();
    };
    node?.addEventListener('pointermove', onFirstMove, { once: true });
    return () => {
      anim.stop();
      node?.removeEventListener('pointermove', onFirstMove);
    };
  }, [gx, reduced]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch' || reduced || !pointerDriven.current) return;
    gx.set(e.clientX / window.innerWidth);
  };

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title" onPointerMove={onPointerMove}>
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-kicker label">
            {hero.kicker} <span className="hero-est">{hero.established}</span>
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-the">The</span>
            <span className="hero-name">Marksman</span>
          </h1>
          <p className="hero-lede">{venue.tagline}</p>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-ctas">
            <Button
              href={booking.openTableUrl}
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              onPointerEnter={preload}
              onFocus={preload}
            >
              {hero.ctaPrimary}
            </Button>
            <Button variant="ghost" href="#menu">
              {hero.ctaSecondary}
            </Button>
          </div>
          <StatusChip className="hero-status" />
        </div>

        <div className="hero-art">
          {images.hero_facade.src ? (
            <ImageSlot slot="hero_facade" shape="arch" eager />
          ) : (
            <Facade glintX={glintX} />
          )}
          <Stamp text={hero.stamp} />
        </div>
      </div>
    </section>
  );
}

function Stamp({ text }: { text: string }) {
  return (
    <svg className="stamp" viewBox="0 0 120 120" role="img" aria-label="Michelin Pub of the Year 2017">
      <defs>
        <path id="stamp-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1" />
      <text className="stamp-ring" aria-hidden="true">
        <textPath href="#stamp-circle" startOffset="0" textLength="272" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
      <text x="60" y="58" textAnchor="middle" className="stamp-small" aria-hidden="true">
        Michelin
      </text>
      <text x="60" y="76" textAnchor="middle" className="stamp-big" aria-hidden="true">
        2017
      </text>
    </svg>
  );
}
