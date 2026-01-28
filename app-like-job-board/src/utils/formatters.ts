// Utility functions for formatting data

/**
 * Format salary range
 * @example formatSalary(150000, 200000, "USD") => "$150k - $200k"
 */
export function formatSalary(min: number, max: number, currency: string): string {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M");
    }
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k`;
    }
    return num.toString();
  };

  const currencySymbol = currency === "USD" ? "$" : currency;
  return `${currencySymbol}${formatNumber(min)} - ${currencySymbol}${formatNumber(max)}`;
}

/**
 * Format date to relative time
 * @example formatRelativeDate("2026-01-26") => "2 days ago"
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

/**
 * Get initials from company name for logo fallback
 * @example getInitials("TechCorp Inc") => "TC"
 */
export function getInitials(companyName: string): string {
  return companyName
    .split(" ")
    .filter((word) => word.length > 0)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Truncate text with ellipsis
 * @example truncate("Long text here", 10) => "Long text..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
