import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'light' | 'green';

interface Common {
  variant?: Variant;
  small?: boolean;
  children: ReactNode;
  className?: string;
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function classes(variant: Variant, small: boolean | undefined, extra?: string) {
  return ['btn', `btn--${variant}`, small ? 'btn--small' : '', extra ?? ''].filter(Boolean).join(' ');
}

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', small, className, children } = props;
  if (props.href !== undefined) {
    const { variant: _v, small: _s, className: _c, children: _ch, ...rest } = props as AsLink;
    return (
      <a className={classes(variant, small, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, small: _s, className: _c, children: _ch, type = 'button', ...rest } = props as AsButton;
  return (
    <button type={type} className={classes(variant, small, className)} {...rest}>
      {children}
    </button>
  );
}
