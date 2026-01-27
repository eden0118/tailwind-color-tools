import { memo, useId } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchInput = memo<SearchInputProps>(({ value, onChange, onClear }) => {
  const inputId = useId();

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      <label htmlFor={inputId} className="input-label text-muted">
        Enter Tailwind Class
      </label>
      <div className="relative">
        <Search
          className="text-muted absolute top-1/2 left-4 -translate-y-1/2"
          size={20}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. blue-500, red-600..."
          className="input focus:ring-accent pl-12"
        />
        {value && (
          <button
            onClick={onClear}
            className="text-muted hover:bg-border/50 hover:text-accent absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1.5 transition-colors"
            title="Clear input"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;
