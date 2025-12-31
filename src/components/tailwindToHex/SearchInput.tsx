import { memo } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchInput = memo<SearchInputProps>(({ value, onChange, onClear }) => (
  <div className="mx-auto max-w-3xl space-y-2">
    <label className="input-label text-muted">Enter Tailwind Class</label>
    <div className="relative">
      <Search className="text-muted absolute top-1/2 left-4 -translate-y-1/2" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. blue-500, red-600..."
        className="input pl-12 focus:ring-pink-500"
      />
      {value && (
        <button
          onClick={onClear}
          className="text-muted hover:bg-border/50 hover:text-secondaryText absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1.5 transition-colors"
          title="Clear input"
        >
          <X size={18} />
        </button>
      )}
    </div>
  </div>
));

SearchInput.displayName = 'SearchInput';
export default SearchInput;
