import { groups, type OccasionId } from '../content';
import { useBooking } from '../booking/BookingContext';
import { Button } from '../components/Button';
import { SectionHead } from '../components/SectionHead';

function GroupArt({ occasion }: { occasion: OccasionId }) {
  const common = { stroke: '#1f1a16', strokeWidth: 1.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <svg className="group-art" viewBox="0 0 120 64" aria-hidden="true">
      {occasion === 'feasting' && (
        <g {...common}>
          <path d="M8 34h104v6H8z" fill="#b0814f" />
          <path d="M14 40v18M106 40v18" />
          {[22, 40, 58, 76, 94].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="30" rx="7" ry="2.5" fill="#fbf8f1" />
              <path d={`M${x + 8} 30v-10`} />
            </g>
          ))}
          <path d="M50 26c0-8 20-8 20 0z" fill="#c47a36" />
          {[12, 30, 48, 66, 84, 102].map((x) => (
            <circle key={x} cx={x} cy="14" r="5" fill="#f3ead8" />
          ))}
        </g>
      )}
      {occasion === 'hire' && (
        <g {...common}>
          <path d="M28 8h64v20H28z" fill="#cdb78d" />
          <path d="M24 6h72v4H24z" fill="#ece2cd" />
          <path d="M36 12h10v12H36zM55 12h10v12H55zM74 12h10v12H74z" fill="#f0c26e" />
          <path d="M28 28h64v30H28z" fill="#7a4325" />
          <path d="M30 29h60v7H30z" fill="#233a2f" />
          <path d="M34 40h18v14H34zM68 40h18v14H68z" fill="#f0c26e" />
          <path d="M55 39h10v19H55z" fill="#233a2f" />
          <path d="M28 2h64" strokeDasharray="3 3" />
          <path d="M8 58h104" />
        </g>
      )}
      {occasion === 'wedding' && (
        <g {...common}>
          <path d="M40 16c0 10 6 16 12 16s12-6 12-16z" fill="#f6e2b8" transform="rotate(-14 52 24)" />
          <path d="M52 32v20M44 56h16" transform="rotate(-14 52 44)" />
          <path d="M56 16c0 10 6 16 12 16s12-6 12-16z" fill="#f6e2b8" transform="rotate(14 68 24)" />
          <path d="M68 32v20M60 56h16" transform="rotate(14 68 44)" />
          <path d="M60 6v-4M54 8l-3-3M66 8l3-3" stroke="#a6361f" />
          <path d="M14 40c4-6 10-6 12 0-2 6-8 6-12 0z" fill="#a6361f" />
          <path d="M106 40c-4-6-10-6-12 0 2 6 8 6 12 0z" fill="#3f6b4f" />
        </g>
      )}
    </svg>
  );
}

export function Groups() {
  const { open } = useBooking();
  return (
    <section id="groups" className="groups section defer-render" aria-labelledby="groups-title">
      <div className="container">
        <SectionHead id="groups-title" index="05" label={groups.label} title={groups.heading} />
        <ul className="group-cards">
          {groups.cards.map((card) => (
            <li key={card.id} className="group-card">
              <GroupArt occasion={card.occasion} />
              <p className="group-num">{card.numeral}</p>
              <h3 className="group-title">{card.title}</h3>
              <p className="group-body">{card.body}</p>
              <Button variant="ghost" small onClick={() => open({ occasion: card.occasion })}>
                {card.cta}
              </Button>
            </li>
          ))}
        </ul>
        <p className="groups-catering">
          {groups.catering.text}{' '}
          <button type="button" className="text-link" onClick={() => open({ occasion: 'catering' })}>
            {groups.catering.cta}
          </button>
        </p>
      </div>
    </section>
  );
}
