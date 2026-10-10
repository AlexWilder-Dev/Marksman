import { findUs, hours, venue } from '../content';
import { Button } from '../components/Button';
import { DirectionsIcon, PhoneIcon } from '../components/Icons';
import { SectionHead } from '../components/SectionHead';
import { useLondonClock } from '../lib/hooks';
import { formatRange } from '../lib/time';
import { StreetMap } from './StreetMap';

export function FindUs() {
  const clock = useLondonClock(60_000);
  const today = clock?.dayKey ?? null;

  return (
    <section id="find-us" className="findus section defer-render" aria-labelledby="findus-title">
      <div className="container findus-grid">
        <div className="findus-info">
          <SectionHead id="findus-title" index="07" label={findUs.label} title={findUs.heading} />
          <address className="findus-address">
            <span className="findus-street">{venue.address.line1}</span>
            <span>
              {venue.address.city} {venue.address.postcode}
            </span>
            <span className="findus-corner">{venue.address.corner}</span>
          </address>
          <ul className="findus-notes">
            <li>{findUs.stationNote}</li>
            <li>{findUs.sundayNote}</li>
          </ul>
          <div className="findus-ctas">
            <Button href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <DirectionsIcon /> {findUs.directions}
            </Button>
            <Button variant="ghost" href={`tel:${venue.phone.tel}`}>
              <PhoneIcon /> {venue.phone.display}
            </Button>
          </div>

          <table className="hours">
            <caption className="label">{findUs.hoursHeading}</caption>
            <tbody>
              {hours.days.map((d) => {
                const isToday = d.key === today;
                return (
                  <tr key={d.key} className={isToday ? 'is-today' : undefined} aria-current={isToday ? 'date' : undefined}>
                    <th scope="row">
                      {d.day}
                      {isToday && <span className="today-tag">Today</span>}
                    </th>
                    <td>{formatRange(d)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="hours-note">{hours.roofTerrace}</p>
        </div>

        <div className="findus-map">
          <StreetMap />
          <a className="text-link" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
