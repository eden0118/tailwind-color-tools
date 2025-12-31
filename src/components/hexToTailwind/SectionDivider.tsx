import { memo } from 'react';

interface SectionDividerProps {
  label: string;
}

const SectionDivider = memo<SectionDividerProps>(({ label }) => (
  <div className="flex items-center gap-4">
    <div className="h-px flex-1 bg-gray-300"></div>
    <span className="text-muted text-xs font-bold tracking-widest uppercase">{label}</span>
    <div className="h-px flex-1 bg-gray-300"></div>
  </div>
));

SectionDivider.displayName = 'SectionDivider';
export default SectionDivider;
