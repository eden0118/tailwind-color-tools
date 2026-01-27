/**
 * @fileoverview
 * DetectedColorSection - Display the detected/parsed input color
 *
 * Responsibilities:
 * - Show section divider with label
 * - Display the color information card for the detected color
 * - Used in HexToTailwind flow to show conversion result
 */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ColorCard from '@/components/ColorCard';
import SectionDivider from './SectionDivider';
import { TailwindColor } from '@/types';

interface DetectedColorSectionProps {
  color: TailwindColor;
}

// Display the detected color with visual divider
const DetectedColorSection = memo<DetectedColorSectionProps>(({ color }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {/* Section header divider */}
      <SectionDivider label={t('common.detectedColor')} />
      {/* Color information card */}
      <ColorCard color={color} />
    </div>
  );
});

DetectedColorSection.displayName = 'DetectedColorSection';
export default DetectedColorSection;
