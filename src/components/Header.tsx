import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-primary p-2 transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-primary">HistoryHub</span>
            <span className="text-[10px] text-muted-foreground tracking-wide">READ HISTORY BEAUTIFULLY</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/library" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Library
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate("/auth")}
          >
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/library"
              className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Library
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/auth");
                }}
              >
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
