import { useId, useRef, useState, type FormEvent } from 'react';
import { footer, site, venue } from '../content';
import { InstagramIcon, Monogram } from '../components/Icons';
import { isEmail } from '../lib/validate';

export function Footer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <footer className="footer on-dark defer-render" data-chrome>
      <div className="footer-tiles" aria-hidden="true" />
      <div className="container footer-grid">
        <Newsletter />
        <div className="footer-cols">
          <div className="footer-col">
            <h2 className="label">Get in touch</h2>
            <ul>
              {footer.contacts.map((c) => (
                <li key={c.label}>
                  <span className="footer-key">{c.label}</span>
                  <a href={c.href}>{c.value}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="label">Visit</h2>
            <address>
              {venue.address.line1}
              <br />
              {venue.address.city} {venue.address.postcode}
            </address>
            <a href={`tel:${venue.phone.tel}`}>{venue.phone.display}</a>
          </div>
          <div className="footer-col">
            <h2 className="label">Follow</h2>
            <a className="footer-insta" href={venue.instagram.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon /> {venue.instagram.handle}
            </a>
            <p className="footer-sister">
              From the team behind {venue.sister.name} {venue.sister.where}.
            </p>
          </div>
        </div>
      </div>
      <div className="container footer-base">
        <p className="footer-brand">
          <Monogram className="footer-mark" />
          {site.name}
        </p>
        <button type="button" className="footer-privacy" onClick={() => dialogRef.current?.showModal()}>
          {footer.privacy.label}
        </button>
        <p className="footer-credit">{site.credit}</p>
      </div>

      <dialog ref={dialogRef} className="privacy-dialog" aria-labelledby="privacy-title">
        <h2 id="privacy-title">{footer.privacy.heading}</h2>
        {footer.privacy.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <form method="dialog">
          <button className="btn btn--green btn--small" type="submit">
            Close
          </button>
        </form>
      </dialog>
    </footer>
  );
}

function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const n = footer.newsletter;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
    } else if (!isEmail(email)) {
      setError('That email address doesn’t look quite right.');
    } else {
      setError(null);
      setDone(true);
      return;
    }
    inputRef.current?.focus();
  };

  return (
    <div className="newsletter">
      <h2 className="newsletter-title">{n.heading}</h2>
      <p className="newsletter-body">{n.body}</p>
      <div aria-live="polite">
        {done ? (
          <p className="newsletter-done" role="status">
            {n.success}
          </p>
        ) : (
          <form className="newsletter-form" noValidate onSubmit={submit}>
            <label htmlFor={`${id}-email`} className="label">
              {n.label}
            </label>
            <div className="newsletter-row">
              <input
                ref={inputRef}
                id={`${id}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : `${id}-hint`}
              />
              <button type="submit" className="btn btn--primary">
                {n.button}
              </button>
            </div>
            {error ? (
              <p id={`${id}-error`} className="field-error">
                {error}
              </p>
            ) : (
              <p id={`${id}-hint`} className="newsletter-hint">
                {n.privacy}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
