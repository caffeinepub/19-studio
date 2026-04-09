import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { useServices, useStylists } from "../hooks/useBooking";
import type { Service, StylistPublic } from "../types/booking";

// ── Mock fallbacks ──────────────────────────────────────────────────────────

const MOCK_SERVICES: Service[] = [
  {
    id: 1n,
    name: "Haircut",
    durationMinutes: 45n,
    price: 500n,
    description: "Classic haircut tailored to your style.",
  },
  {
    id: 2n,
    name: "Beard",
    durationMinutes: 30n,
    price: 150n,
    description:
      "Professional beard trim and shaping — clean lines, sharp edges, and a refined finish.",
  },
];

const MOCK_STYLISTS: StylistPublic[] = [
  {
    id: 1n,
    name: "Amara Osei",
    bio: "Senior colorist with 10 years of experience in balayage and lived-in color. Trained at Vidal Sassoon London.",
    available: true,
  },
  {
    id: 2n,
    name: "Lucas Ferreira",
    bio: "Master barber and men's grooming specialist. Known for seamless fades and sculptural cuts.",
    available: true,
  },
  {
    id: 3n,
    name: "Yuki Tanaka",
    bio: "Precision cut specialist and texture expert. Works beautifully with all hair types, including fine and curly.",
    available: true,
  },
];

// ── Why choose us data ──────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Star,
    title: "Expert Stylists",
    description:
      "Our team trained at some of the world's top academies and brings artisanal craft to every appointment.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Book in under 2 minutes from any device — no phone calls, no waiting.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description:
      "Early mornings to late evenings, six days a week. We work around your schedule.",
  },
  {
    icon: CheckCircle2,
    title: "Premium Products",
    description:
      "We use only professional-grade color and care products — always clean, always effective.",
  },
];

// ── Sub-components ──────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card className="h-full group hover:shadow-md transition-smooth border-border/60">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <span className="text-accent font-display font-bold text-lg leading-none ml-3 shrink-0">
              ₹{Number(service.price)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <Clock
              className="h-3.5 w-3.5 text-muted-foreground"
              strokeWidth={1.5}
            />
            <span className="text-xs text-muted-foreground">
              {Number(service.durationMinutes)} min
            </span>
          </div>
          <p className="text-body text-sm text-muted-foreground leading-relaxed flex-1">
            {service.description}
          </p>
          <div className="mt-4 pt-4 border-t border-border/40">
            <Link to="/book" data-ocid={`service-book-${String(service.id)}`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full transition-smooth"
              >
                Book this service
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => `skel-svc-${i}`).map((key) => (
        <Card key={key} className="h-48">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StylistCard({
  stylist,
  index,
}: { stylist: StylistPublic; index: number }) {
  const initials = stylist.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
    >
      <Card className="text-center group hover:shadow-md transition-smooth border-border/60 h-full">
        <CardContent className="p-8 flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-display font-bold text-2xl group-hover:bg-accent/20 transition-smooth">
            {initials}
          </div>
          <div>
            <h3 className="text-display text-base font-semibold text-foreground mb-2">
              {stylist.name}
            </h3>
            <p className="text-body text-sm text-muted-foreground leading-relaxed">
              {stylist.bio}
            </p>
          </div>
          {stylist.available && (
            <Badge variant="accent" className="mt-auto">
              Available
            </Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: servicesData, isLoading: servicesLoading } = useServices();
  const { data: stylistsData, isLoading: stylistsLoading } = useStylists();

  // Always show mock data as fallback — never block render on loading state
  const services =
    servicesData && servicesData.length > 0 ? servicesData : MOCK_SERVICES;
  const stylists =
    stylistsData && stylistsData.length > 0 ? stylistsData : MOCK_STYLISTS;

  // Only show skeleton if we're refreshing data we already have (not initial load)
  const showServicesSkeleton =
    servicesLoading && (servicesData ?? []).length > 0;
  const showStylistsSkeleton =
    stylistsLoading && (stylistsData ?? []).length > 0;

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-card">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-salon.dim_1200x700.jpg"
            alt="19 Studio interior"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-card/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              variant="accent"
              className="mb-6 px-3 py-1 text-xs tracking-widest uppercase"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Premium Hair Studio
            </Badge>
            <h1 className="text-display text-5xl md:text-7xl text-foreground leading-[1.05] mb-5">
              19 Studio
            </h1>
            <p className="text-2xl md:text-3xl text-accent font-display font-semibold mb-4 leading-snug">
              Your Style, Your Time
            </p>
            <p className="text-body text-base text-muted-foreground max-w-md mb-10 leading-relaxed">
              A refined salon experience where expert stylists, premium
              products, and effortless booking converge. Your best hair day
              starts here.
            </p>
            <div
              className="flex flex-col sm:flex-row items-start gap-4"
              data-ocid="hero-cta-group"
            >
              <Link to="/book" data-ocid="hero-cta-book">
                <Button variant="hero" size="lg" className="px-8">
                  Book Now
                </Button>
              </Link>
              <a href="#services">
                <Button variant="outline" size="lg" className="px-8">
                  View Services
                </Button>
              </a>
            </div>

            {/* Contact & eSewa info strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
              data-ocid="hero-contact-esewa"
            >
              <a
                href="tel:+9779766466795"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/60 hover:border-accent/50 transition-smooth group"
                aria-label="Call us at +977 976-6466795"
              >
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-smooth">
                  <Phone className="h-4 w-4 text-accent" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
                    Call Us
                  </p>
                  <p className="text-sm font-semibold text-foreground font-display">
                    +977 976-6466795
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <Wallet className="h-4 w-4 text-accent" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
                    Pay via eSewa
                  </p>
                  <p className="text-sm font-semibold text-accent font-display">
                    +977 976-6466795
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { value: "500+", label: "Happy clients" },
              { value: "10+", label: "Years experience" },
              { value: "6", label: "Expert stylists" },
              { value: "4.9★", label: "Average rating" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-2xl p-6 text-center"
              >
                <p className="text-display text-3xl font-bold text-accent mb-1">
                  {value}
                </p>
                <p className="text-body text-sm text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-background py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Badge
              variant="secondary"
              className="mb-4 tracking-widest uppercase text-xs"
            >
              Our Services
            </Badge>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mb-4">
              Crafted for Every Look
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              From precision cuts to transformative color, every service is
              designed with intention and delivered with care.
            </p>
          </motion.div>

          {showServicesSkeleton ? (
            <ServicesSkeleton />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="services-grid"
            >
              {services.map((service, i) => (
                <ServiceCard
                  key={String(service.id)}
                  service={service}
                  index={i}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link to="/book" data-ocid="services-cta">
              <Button variant="accent" size="lg">
                Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-muted/40 py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <Badge
              variant="secondary"
              className="mb-4 tracking-widest uppercase text-xs"
            >
              Why 19 Studio
            </Badge>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mb-4">
              The Standard We Hold
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              We believe great hair is a collaboration. Here's what we bring to
              every appointment.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="benefits-grid"
          >
            {BENEFITS.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/60 hover:shadow-sm transition-smooth"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-display text-base font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-body text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="bg-background py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Badge
              variant="secondary"
              className="mb-4 tracking-widest uppercase text-xs"
            >
              The Team
            </Badge>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mb-4">
              Meet Your Stylists
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              Talented artists, genuine people. Get to know the team behind
              every great cut.
            </p>
          </motion.div>

          {showStylistsSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }, (_, i) => `skel-stylist-${i}`).map(
                (key) => (
                  <Card key={key}>
                    <CardContent className="p-8 flex flex-col items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              data-ocid="team-grid"
            >
              {stylists.map((stylist, i) => (
                <StylistCard
                  key={String(stylist.id)}
                  stylist={stylist}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="bg-card border-t border-border/60 py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Scissors className="h-7 w-7 text-accent" strokeWidth={1.5} />
          </div>
          <h2 className="text-display text-3xl md:text-4xl text-foreground mb-4">
            Ready for Your Best Hair Day?
          </h2>
          <p className="text-body text-muted-foreground mb-8">
            Book your appointment in minutes. No calls needed, no waiting around
            — just great hair.
          </p>
          <Link to="/book" data-ocid="closing-cta-book">
            <Button variant="hero" size="lg" className="px-10">
              Book Now — It's Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
