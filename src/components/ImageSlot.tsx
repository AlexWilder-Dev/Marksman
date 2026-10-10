import { images, type ImageSlotId } from '../content';
import { SlotArt } from './SlotArt';

interface Props {
  slot: ImageSlotId;
  /** frame: oak frame with a mount · oval: Victorian oval · arch: round-headed window */
  shape: 'frame' | 'oval' | 'arch';
  className?: string;
  eager?: boolean;
  caption?: boolean;
}

/**
 * A framed picture, hung like the prints on a pub wall. Until photography is
 * supplied (images[slot].src in content.ts) it shows a line drawing.
 */
export function ImageSlot({ slot, shape, className, eager, caption }: Props) {
  const img = images[slot];
  return (
    <figure className={['slot', `slot--${shape}`, className].filter(Boolean).join(' ')} data-slot={slot}>
      <div className="slot-frame">
        <div className="slot-mount">
          <div className="slot-picture">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={eager ? 'high' : 'auto'}
              />
            ) : (
              <SlotArt slot={slot} />
            )}
          </div>
        </div>
      </div>
      {caption && <figcaption className="slot-caption">{img.caption}</figcaption>}
    </figure>
  );
}
