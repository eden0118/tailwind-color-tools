import { memo } from 'react';
import ColorCard from '@/components/ColorCard';
import SectionDivider from './SectionDivider';
import { TailwindColor } from '@/types';

interface DetectedColorSectionProps {
  color: TailwindColor;
}

const DetectedColorSection = memo<DetectedColorSectionProps>(({ color }) => (
  <div className="space-y-6">
    <SectionDivider label="Detected Color" />
    <ColorCard color={color} />
  </div>
));

DetectedColorSection.displayName = 'DetectedColorSection';
export default DetectedColorSection;
