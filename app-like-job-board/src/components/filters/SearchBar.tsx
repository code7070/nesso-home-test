import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search jobs by title, company, or keywords...",
  debounceDelay = 300,
}: SearchBarProps) {
  // Local state for immediate UI updates
  const [localValue, setLocalValue] = useState(value);

  // Debounced value to trigger actual filter updates
  const debouncedValue = useDebounce(localValue, debounceDelay);

  // Sync local state with prop value (for external resets)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Trigger onChange when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  const handleClear = () => {
    setLocalValue("");
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />

        {/* Input Field */}
        <Input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-11 bg-card border-border focus-visible:ring-primary"
        />

        {/* Clear Button */}
        {localValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Debounce indicator (optional, shows while typing) */}
      {localValue !== debouncedValue && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}
