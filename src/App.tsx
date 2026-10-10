import { MotionConfig } from 'framer-motion';
import { useMemo, type CSSProperties } from 'react';
import { christmas } from './content';
import { BookingProvider } from './booking/BookingContext';
import { MobileBar } from './components/MobileBar';
import { TopBar } from './components/TopBar';
import { useSectionMeta } from './lib/meta';
import { textureVars } from './lib/textures';
import { Christmas } from './sections/Christmas';
import { FiftyFeet } from './sections/FiftyFeet';
import { FindUs } from './sections/FindUs';
import { Footer } from './sections/Footer';
import { Groups } from './sections/Groups';
import { Hero } from './sections/Hero';
import { Menu } from './sections/Menu';
import { Signatures } from './sections/Signatures';
import { ThreeFloors } from './sections/ThreeFloors';

import './styles/base.css';
import './styles/chrome.css';
import './styles/hero.css';
import './styles/slots.css';
import './styles/story.css';
import './styles/floors.css';
import './styles/menu.css';
import './styles/sections.css';
import './styles/booking.css';

export function App() {
  const textures = useMemo(() => textureVars() as CSSProperties, []);
  useSectionMeta();

  return (
    <MotionConfig reducedMotion="user">
      <div className="app" style={textures}>
        <BookingProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <TopBar />
          <main id="main" tabIndex={-1} data-chrome>
            <Hero />
            <FiftyFeet />
            <ThreeFloors />
            <Menu />
            <Signatures />
            <Groups />
            {christmas.enabled && <Christmas />}
            <FindUs />
          </main>
          <Footer />
          <MobileBar />
        </BookingProvider>
      </div>
    </MotionConfig>
  );
}
