import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">{children}</main>

      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="site-footer"
      >
        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Scissors
                  className="h-4 w-4 text-primary-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-display text-xs font-bold tracking-widest uppercase text-foreground">
                  19 Studio
                </span>
                <span className="text-body text-[10px] text-muted-foreground tracking-wider uppercase">
                  Hair Salon
                </span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-6 text-body text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-smooth">
                Home
              </Link>
              <Link
                to="/book"
                className="hover:text-foreground transition-smooth"
              >
                Book Now
              </Link>
              <Link
                to="/admin"
                className="hover:text-foreground transition-smooth"
              >
                Admin
              </Link>
            </nav>

            {/* Credits */}
            <p className="text-body text-xs text-muted-foreground text-center md:text-right">
              © {year}.{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
