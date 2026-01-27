/**
 * @fileoverview
 * NoResultsView - Display when search returns no matching colors
 *
 * Responsibilities:
 * - Show user-friendly message when no Tailwind class matches the search query
 * - Display the search term that produced no results
 */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface NoResultsViewProps {
  query: string;
}

// Display no results message with the search query
const NoResultsView = memo<NoResultsViewProps>(({ query }) => {
  const { t } = useTranslation();
  return (
    <div className="text-muted py-12 text-center">
      <p>
        {t('tailwindToHex.noResults')} "{query}"
      </p>
    </div>
  );
});

NoResultsView.displayName = 'NoResultsView';
export default NoResultsView;
