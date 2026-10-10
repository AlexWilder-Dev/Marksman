import { christmas, occasions, venue } from '../content';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../components/Button';
import { SectionHead } from '../components/SectionHead';

export function Christmas() {
  const { open } = useBooking();
  const subject = occasions.find((o) => o.id === 'christmas')?.emailSubject ?? 'Christmas enquiry';
  return (
    <section id="christmas" className="christmas section on-dark defer-render" aria-labelledby="xmas-title">
      <div className="container xmas-inner">
        <div className="xmas-copy">
          <SectionHead id="xmas-title" index="06" label={christmas.label} title={christmas.heading}>
            <p className="section-lede">{christmas.intro}</p>
          </SectionHead>
          <div className="xmas-ctas">
            <Button onClick={() => open({ occasion: 'christmas' })}>{christmas.cta}</Button>
            <a className="text-link" href={`mailto:${venue.email.bookings}?subject=${encodeURIComponent(subject)}`}>
              {christmas.emailNote} {venue.email.bookings}
            </a>
          </div>
        </div>
        <div className="xmas-card">
          <svg className="xmas-sprig" viewBox="0 0 120 60" aria-hidden="true">
            <g stroke="#1f1a16" strokeWidth="1.4" strokeLinejoin="round">
              <path d="M60 34C44 18 26 22 14 30c10 2 16 8 20 14 4-6 12-8 26-10z" fill="#3f6b4f" />
              <path d="M60 34c16-16 34-12 46-4-10 2-16 8-20 14-4-6-12-8-26-10z" fill="#2f5a43" />
              <circle cx="56" cy="38" r="5.5" fill="#a6361f" />
              <circle cx="65" cy="40" r="5.5" fill="#a6361f" />
              <circle cx="60" cy="31" r="5.5" fill="#c4452b" />
            </g>
          </svg>
          <p className="label xmas-card-label">{christmas.classicsLabel}</p>
          <ul className="xmas-list">
            {christmas.classics.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
