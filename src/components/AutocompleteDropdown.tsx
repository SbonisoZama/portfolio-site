interface AutocompleteDropdownProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  currentInput: string;
}

export function AutocompleteDropdown({ suggestions, onSelect, currentInput }: AutocompleteDropdownProps) {
  if (suggestions.length === 0 || !currentInput) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-gray-900 border border-terminal-green rounded shadow-lg max-w-md z-50">
      <div className="p-2">
        <p className="text-terminal-yellow text-xs mb-2">Suggestions:</p>
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(suggestion)}
            className="block w-full text-left px-3 py-1 hover:bg-gray-800 text-terminal-green text-sm rounded transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
