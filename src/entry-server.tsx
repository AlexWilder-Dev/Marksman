import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export { site, venue, hours, sectionMeta } from './content';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
