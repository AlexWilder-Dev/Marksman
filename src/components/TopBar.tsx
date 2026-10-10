import { useEffect, useState } from 'react';
import { booking, christmas, nav } from '../content';
import { useBooking } from '../booking/BookingContext';
import { Button } from './Button';
import { Monogram } from './Icons';
import { StatusChip } from './StatusChip';

export function TopBar() {
  const { open, preload } = useBooking();
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = nav.filter((l) => christmas.enabled || l.href !== '#christmas');

  return (
    <header className={`topbar${condensed ? ' is-condensed' : ''}`} data-chrome>
      <div className="topbar-inner container">
        <a href="#top" className="topbar-brand">
          <Monogram className="topbar-mark" />
          <span className="topbar-word">
            <span className="topbar-the">The</span> Marksman
          </span>
          <span className="vh">, back to top</span>
        </a>
        <nav className="topbar-nav" aria-label="Sections">
          <ul>
            {links.map((l) => (
              <li key={l.href} data-key={l.href.slice(1)}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <StatusChip compact className="topbar-status" />
        <Button
          small
          className="topbar-book"
          href={booking.openTableUrl}
          onClick={(e) => {
            e.preventDefault();
            open();
          }}
          onPointerEnter={preload}
          onFocus={preload}
        >
          Book a table
        </Button>
      </div>
    </header>
  );
}
