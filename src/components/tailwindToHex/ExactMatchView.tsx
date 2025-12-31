import { memo } from 'react';
import { TailwindColor } from '@/types';
import ColorCard from '@/components/ColorCard';

interface ExactMatchViewProps {
  match: TailwindColor;
}

const ExactMatchView = memo<ExactMatchViewProps>(({ match }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl duration-500">
    <h2 className="text-text-muted mb-3 text-sm font-semibold tracking-wider uppercase">
      Exact Match
    </h2>
    <ColorCard color={match} isClosest={true} />
  </div>
));

ExactMatchView.displayName = 'ExactMatchView';
export default ExactMatchView;
