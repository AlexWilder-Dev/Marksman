import { motion, type Variants } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { menu, type MenuItem, type MenuTab, type MenuTabId } from '../content';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../components/Button';
import { Monogram } from '../components/Icons';
import { SectionHead } from '../components/SectionHead';
import { useLondonClock } from '../lib/hooks';
import { springs } from '../lib/motion';
import { calendarDay, calendarFromIso, formatLongDate } from '../lib/time';

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  show: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: springs.print },
};

function formatPrice(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function Menu() {
  const [active, setActive] = useState<MenuTabId>('today');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const clock = useLondonClock(60_000);
  const today = clock ? calendarDay(clock.year, clock.month, clock.day) : calendarFromIso(menu.sourceDate);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = menu.tabs.length;
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % count;
    else if (e.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = count - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(menu.tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="menu-section defer-render" aria-labelledby="menu-title">
      <div className="container">
        <SectionHead id="menu-title" index="03" label={menu.label} title={menu.heading} />

        <div className="paper">
          <header className="paper-head">
            <Monogram className="paper-mark" />
            <p className="paper-house">Marksman Public House</p>
            <p className="paper-date">
              <time dateTime={today.iso}>{formatLongDate(today)}</time>
            </p>
            <p className="paper-daily label">{menu.changesDaily}</p>
          </header>

          <div className="paper-tabs" role="tablist" aria-label="Menus">
            {menu.tabs.map((tab, i) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`menu-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`menu-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  className="paper-tab"
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {selected && <motion.span className="paper-tab-mark" layoutId="menu-tab-mark" transition={springs.snappy} />}
                  <span className="paper-tab-text">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {menu.tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`menu-panel-${tab.id}`}
              aria-labelledby={`menu-tab-${tab.id}`}
              hidden={tab.id !== active}
              tabIndex={0}
              className="paper-panel"
            >
              {tab.id === active ? <Panel key={tab.id} tab={tab} /> : <Panel tab={tab} still />}
            </div>
          ))}

          <footer className="paper-foot">
            <p className="paper-legend">
              <span className="sig" aria-hidden="true" /> {menu.signatureLegend}
            </p>
            <ul className="paper-notes">
              {menu.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </footer>
        </div>

        <p className="menu-pdf">
          <a className="text-link" href={menu.pdf.href} download>
            {menu.pdf.label}
          </a>
          <span className="menu-pdf-note">Today’s menu, ready to print</span>
        </p>
      </div>
    </section>
  );
}

function Panel({ tab, still }: { tab: MenuTab; still?: boolean }) {
  const { open } = useBooking();
  const animateProps = still
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, amount: 0.05 } };

  return (
    <motion.div className="panel" variants={list} {...animateProps}>
      <motion.header className="panel-head" variants={line}>
        <h3 className="panel-title">{tab.heading}</h3>
        {tab.sample && <span className="panel-stamp label">Sample menu</span>}
        {tab.priceLine && <p className="panel-price">{tab.priceLine}</p>}
        {tab.intro && <p className="panel-intro">{tab.intro}</p>}
      </motion.header>

      <div className={`panel-sections${tab.sections.length > 3 ? ' is-long' : ''}`}>
        {tab.sections.map((section) => (
          <section key={section.title} className="menu-group" aria-label={section.title}>
            <motion.h4 className="menu-group-title" variants={line}>
              {section.signature && <span className="sig" aria-hidden="true" />}
              {section.title}
              {section.note && <span className="menu-group-note">{section.note}</span>}
            </motion.h4>
            {section.items.length > 0 && (
              <ul className="menu-items">
                {section.items.map((item) => (
                  <motion.li key={item.name} className="mi" variants={line}>
                    <Item item={item} />
                  </motion.li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {tab.id === 'feasting' && (
        <motion.div className="panel-cta" variants={line}>
          <Button variant="green" small onClick={() => open({ occasion: 'feasting' })}>
            Enquire for 9 or more
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <>
      <span className="mi-row">
        <span className="mi-name">
          {item.signature && (
            <>
              <span className="sig" aria-hidden="true" />
              <span className="vh">House signature: </span>
            </>
          )}
          {item.name}
          {item.per && <span className="mi-per"> {item.per}</span>}
        </span>
        {item.price !== undefined && (
          <>
            <span className="mi-leader" aria-hidden="true" />
            <span className="mi-price">
              <span className="vh">£</span>
              {formatPrice(item.price)}
            </span>
          </>
        )}
      </span>
      {item.description && <span className="mi-desc">{item.description}</span>}
    </>
  );
}
