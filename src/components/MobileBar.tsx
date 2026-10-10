import { booking, venue } from '../content';
import { useBooking } from '../booking/BookingContext';
import { CalendarIcon, DirectionsIcon, MenuCardIcon, PhoneIcon } from './Icons';

/** Sticky quick actions on small screens. */
export function MobileBar() {
  const { open, preload } = useBooking();
  return (
    <nav className="mobilebar" aria-label="Quick actions" data-chrome>
      <a
        className="mobilebar-item is-primary"
        href={booking.openTableUrl}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        onTouchStart={preload}
      >
        <CalendarIcon />
        <span>Book</span>
      </a>
      <a className="mobilebar-item" href="#menu">
        <MenuCardIcon />
        <span>Menu</span>
      </a>
      <a className="mobilebar-item" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
        <DirectionsIcon />
        <span>Directions</span>
      </a>
      <a className="mobilebar-item" href={`tel:${venue.phone.tel}`}>
        <PhoneIcon />
        <span>Call</span>
      </a>
    </nav>
  );
}
