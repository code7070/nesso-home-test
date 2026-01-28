import { Link, useLocation } from "react-router-dom";
import { Briefcase, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  bookmarkCount?: number;
}

export function Header({ bookmarkCount = 0 }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">JobBoard</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/jobs"
              className={`
                px-4 py-2 text-sm font-medium transition-colors
                ${
                  isActive("/jobs")
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              Jobs
            </Link>

            <Link
              to="/bookmarks"
              className={`
                px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2
                ${
                  isActive("/bookmarks")
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
              {bookmarkCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {bookmarkCount}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
