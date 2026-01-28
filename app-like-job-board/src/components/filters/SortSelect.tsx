import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/types/filters";
import { SORT_OPTION_LABELS } from "@/types/filters";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const sortOptions: SortOption[] = [
    "date-desc",
    "date-asc",
    "salary-desc",
    "salary-asc",
    "company",
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowUpDown className="h-4 w-4" />
        <span className="font-medium">Sort by:</span>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] h-9 bg-card border-border focus:ring-primary">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {SORT_OPTION_LABELS[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
