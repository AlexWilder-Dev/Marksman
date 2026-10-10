import type { ReactNode } from 'react';

interface Props {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function SectionHead({ id, index, label, title, children, className }: Props) {
  return (
    <header className={['section-head', className].filter(Boolean).join(' ')}>
      <p className="section-mark label">
        <span className="num">No. {index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {children}
    </header>
  );
}
