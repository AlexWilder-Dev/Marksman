import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { signatures } from '../content';
import { ImageSlot } from '../components/ImageSlot';
import { SectionHead } from '../components/SectionHead';

type Item = (typeof signatures.items)[number];

export function Signatures() {
  return (
    <section id="signatures" className="sigs section defer-render" aria-labelledby="sigs-title">
      <div className="container">
        <SectionHead id="sigs-title" index="04" label={signatures.label} title={signatures.heading} />
        <ul className="sig-list">
          {signatures.items.map((item, i) => (
            <SigRow key={item.id} item={item} flip={i % 2 === 1} />
          ))}
        </ul>
        <p className="sig-foot">{signatures.footnote}</p>
      </div>
    </section>
  );
}

function SigRow({ item, flip }: { item: Item; flip: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], flip ? [3, -2] : [-3, 2]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <li ref={ref} className={`sig-row${flip ? ' is-flip' : ''}`}>
      <motion.div className="sig-pic" style={{ rotate, y }}>
        <ImageSlot slot={item.image} shape="frame" caption />
      </motion.div>
      <div className="sig-text">
        <p className="sig-with label">{item.with}</p>
        <h3 className="sig-name">{item.name}</h3>
        <p className="sig-line">{item.line}</p>
      </div>
    </li>
  );
}
