import type { ComponentType } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type SpecialtyItem = {
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
};

type SpecialtyCardProps = {
  item: SpecialtyItem;
  i: number;
};

export function SpecialtyCard({ item, i }: SpecialtyCardProps) {
  const { ref, show } = useScrollReveal<HTMLElement>();
  const Icon = item.icon;

  return (
    <article
      ref={ref}
      className={`specialtyCard reveal-zoom delay-${i} ${
        show ? 'show' : ''
      }`}
    >
      <div className="specialtyIconWrap" aria-hidden="true">
        <Icon className="specialtyIcon" />
      </div>
      <h3 className="specialtyTitle">{item.title}</h3>
      <p className="specialtyDesc">{item.desc}</p>
    </article>
  );
}