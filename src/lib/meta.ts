import { useEffect } from 'react';
import { sectionMeta, site } from '../content';

function setDescription(text: string) {
  document.querySelector('meta[name="description"]')?.setAttribute('content', text);
}

/** Apply a section's own title + description (e.g. while an enquiry is open). */
export function applyMeta(meta: { title: string; description: string } | null) {
  document.title = meta?.title ?? site.title;
  setDescription(meta?.description ?? site.description);
}

/** Keep the document title and description in step with the section in the URL hash. */
export function useSectionMeta() {
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      applyMeta(sectionMeta[id] ?? null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
}
