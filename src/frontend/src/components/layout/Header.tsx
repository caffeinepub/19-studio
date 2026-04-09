import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
      data-ocid="site-header"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="19 Studio home"
          data-ocid="nav-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Scissors
              className="h-5 w-5 text-primary-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-display text-sm font-bold text-foreground tracking-widest uppercase">
              19 Studio
            </span>
            <span className="text-body text-[10px] text-muted-foreground tracking-wider uppercase">
              Hair Salon
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "text-body text-sm transition-smooth",
                pathname === href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`nav-link-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/book" data-ocid="nav-cta-book">
            <Button variant="accent" size="sm">
              Book Now
            </Button>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-smooth"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          data-ocid="nav-hamburger"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-4"
          data-ocid="nav-mobile-menu"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-body text-base py-1 transition-smooth",
                pathname === href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`nav-mobile-link-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setMenuOpen(false)}
            data-ocid="nav-mobile-cta-book"
          >
            <Button variant="accent" className="w-full">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
