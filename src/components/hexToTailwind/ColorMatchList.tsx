import { memo } from 'react';
import ColorCard from '@/components/ColorCard';
import SectionDivider from './SectionDivider';
import { ColorMatch } from '@/types';

interface ColorMatchListProps {
  matches: ColorMatch[];
}

const ColorMatchList = memo<ColorMatchListProps>(({ matches }) => (
  <div className="space-y-4">
    <SectionDivider label="Closest Matches" />
    <div className="space-y-3">
      {matches.map((match, index) => (
        <ColorCard key={match.class} color={match} isClosest={index === 0} />
      ))}
    </div>
  </div>
));

ColorMatchList.displayName = 'ColorMatchList';
export default ColorMatchList;
