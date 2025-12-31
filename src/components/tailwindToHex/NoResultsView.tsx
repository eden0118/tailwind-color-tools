import { memo } from 'react';

interface NoResultsViewProps {
  query: string;
}

const NoResultsView = memo<NoResultsViewProps>(({ query }) => (
  <div className="text-text-muted py-12 text-center">
    <p>No class found matching "{query}"</p>
  </div>
));

NoResultsView.displayName = 'NoResultsView';
export default NoResultsView;
