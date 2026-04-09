import { j as jsxRuntimeExports, c as cn, L as Link } from "./index-QeIUxsOk.js";
import { c as createLucideIcon, u as useServices, a as useStylists, B as Badge, b as Button, S as Scissors } from "./useBooking-BHG-NJm_.js";
import { S as Skeleton } from "./skeleton-Bm_IJC4N.js";
import { L as Layout, m as motion } from "./Layout-DiR8Atpn.js";
import { C as Calendar, a as CircleCheck } from "./circle-check-D-rwgToA.js";
import { C as Clock } from "./clock-DaQxZCK1.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const MOCK_SERVICES = [
  {
    id: 1n,
    name: "Signature Cut",
    durationMinutes: 60n,
    price: 500n,
    description: "A precision cut tailored to your face shape and lifestyle, finished with a professional blow-dry."
  },
  {
    id: 2n,
    name: "Color & Gloss",
    durationMinutes: 90n,
    price: 500n,
    description: "Full-color treatment using premium demi-permanent formulas for rich, long-lasting shine."
  },
  {
    id: 3n,
    name: "Balayage",
    durationMinutes: 120n,
    price: 500n,
    description: "Hand-painted highlights that grow out naturally with zero harsh lines. The ultimate low-maintenance look."
  },
  {
    id: 4n,
    name: "Keratin Treatment",
    durationMinutes: 150n,
    price: 500n,
    description: "Smoothing treatment that eliminates frizz and cuts styling time in half — for up to 4 months."
  },
  {
    id: 5n,
    name: "Scalp Treatment",
    durationMinutes: 45n,
    price: 500n,
    description: "A nourishing scalp ritual with hot oil massage and targeted serums for a healthy foundation."
  },
  {
    id: 6n,
    name: "Blowout & Style",
    durationMinutes: 45n,
    price: 500n,
    description: "Volume, texture, and polish — a professional finish that lasts days, not hours."
  }
];
const MOCK_STYLISTS = [
  {
    id: 1n,
    name: "Amara Osei",
    bio: "Senior colorist with 10 years of experience in balayage and lived-in color. Trained at Vidal Sassoon London.",
    available: true
  },
  {
    id: 2n,
    name: "Lucas Ferreira",
    bio: "Master barber and men's grooming specialist. Known for seamless fades and sculptural cuts.",
    available: true
  },
  {
    id: 3n,
    name: "Yuki Tanaka",
    bio: "Precision cut specialist and texture expert. Works beautifully with all hair types, including fine and curly.",
    available: true
  }
];
const BENEFITS = [
  {
    icon: Star,
    title: "Expert Stylists",
    description: "Our team trained at some of the world's top academies and brings artisanal craft to every appointment."
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book in under 2 minutes from any device — no phone calls, no waiting."
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Early mornings to late evenings, six days a week. We work around your schedule."
  },
  {
    icon: CircleCheck,
    title: "Premium Products",
    description: "We use only professional-grade color and care products — always clean, always effective."
  }
];
function ServiceCard({ service, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full group hover:shadow-md transition-smooth border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display text-base font-semibold text-foreground group-hover:text-primary transition-colors", children: service.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-display font-bold text-lg leading-none ml-3 shrink-0", children: [
            "₹",
            Number(service.price)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Clock,
            {
              className: "h-3.5 w-3.5 text-muted-foreground",
              strokeWidth: 1.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            Number(service.durationMinutes),
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground leading-relaxed flex-1", children: service.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", "data-ocid": `service-book-${String(service.id)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full transition-smooth",
            children: "Book this service"
          }
        ) }) })
      ] }) })
    }
  );
}
function ServicesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }, (_, i) => `skel-svc-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" })
  ] }) }, key)) });
}
function StylistCard({
  stylist,
  index
}) {
  const initials = stylist.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.1, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center group hover:shadow-md transition-smooth border-border/60 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-display font-bold text-2xl group-hover:bg-accent/20 transition-smooth", children: initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display text-base font-semibold text-foreground mb-2", children: stylist.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground leading-relaxed", children: stylist.bio })
        ] }),
        stylist.available && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", className: "mt-auto", children: "Available" })
      ] }) })
    }
  );
}
function HomePage() {
  const { data: servicesData, isLoading: servicesLoading } = useServices();
  const { data: stylistsData, isLoading: stylistsLoading } = useStylists();
  const services = servicesData && servicesData.length > 0 ? servicesData : MOCK_SERVICES;
  const stylists = stylistsData && stylistsData.length > 0 ? stylistsData : MOCK_STYLISTS;
  const showServicesSkeleton = servicesLoading && (servicesData ?? []).length > 0;
  const showStylistsSkeleton = stylistsLoading && (stylistsData ?? []).length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[92vh] flex items-center overflow-hidden bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-salon.dim_1200x700.jpg",
            alt: "19 Studio interior",
            className: "w-full h-full object-cover object-center opacity-30"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-card via-card/80 to-card/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -32 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "accent",
                  className: "mb-6 px-3 py-1 text-xs tracking-widest uppercase",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1.5" }),
                    "Premium Hair Studio"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-5xl md:text-7xl text-foreground leading-[1.05] mb-5", children: "19 Studio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl md:text-3xl text-accent font-display font-semibold mb-4 leading-snug", children: "Your Style, Your Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-base text-muted-foreground max-w-md mb-10 leading-relaxed", children: "A refined salon experience where expert stylists, premium products, and effortless booking converge. Your best hair day starts here." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col sm:flex-row items-start gap-4",
                  "data-ocid": "hero-cta-group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", "data-ocid": "hero-cta-book", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "hero", size: "lg", className: "px-8", children: "Book Now" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", className: "px-8", children: "View Services" }) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 32 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            className: "hidden lg:grid grid-cols-2 gap-4",
            children: [
              { value: "500+", label: "Happy clients" },
              { value: "10+", label: "Years experience" },
              { value: "6", label: "Expert stylists" },
              { value: "4.9★", label: "Average rating" }
            ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-background/80 backdrop-blur-sm border border-border/60 rounded-2xl p-6 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display text-3xl font-bold text-accent mb-1", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground", children: label })
                ]
              },
              label
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "bg-background py-24 px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mb-12 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-4 tracking-widest uppercase text-xs",
                children: "Our Services"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl md:text-4xl text-foreground mb-4", children: "Crafted for Every Look" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground max-w-xl mx-auto", children: "From precision cuts to transformative color, every service is designed with intention and delivered with care." })
          ]
        }
      ),
      showServicesSkeleton ? /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "services-grid",
          children: services.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ServiceCard,
            {
              service,
              index: i
            },
            String(service.id)
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.3 },
          className: "mt-12 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", "data-ocid": "services-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "accent", size: "lg", children: "Book an Appointment" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-24 px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mb-14 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-4 tracking-widest uppercase text-xs",
                children: "Why 19 Studio"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl md:text-4xl text-foreground mb-4", children: "The Standard We Hold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground max-w-xl mx-auto", children: "We believe great hair is a collaboration. Here's what we bring to every appointment." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
          "data-ocid": "benefits-grid",
          children: BENEFITS.map(({ icon: Icon, title, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
              className: "flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/60 hover:shadow-sm transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-accent", strokeWidth: 1.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display text-base font-semibold text-foreground mb-2", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground leading-relaxed", children: description })
              ]
            },
            title
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24 px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mb-12 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-4 tracking-widest uppercase text-xs",
                children: "The Team"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl md:text-4xl text-foreground mb-4", children: "Meet Your Stylists" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground max-w-xl mx-auto", children: "Talented artists, genuine people. Get to know the team behind every great cut." })
          ]
        }
      ),
      showStylistsSkeleton ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: Array.from({ length: 3 }, (_, i) => `skel-stylist-${i}`).map(
        (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" })
        ] }) }, key)
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-3 gap-6",
          "data-ocid": "team-grid",
          children: stylists.map((stylist, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StylistCard,
            {
              stylist,
              index: i
            },
            String(stylist.id)
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-t border-border/60 py-24 px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "max-w-xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-7 w-7 text-accent", strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl md:text-4xl text-foreground mb-4", children: "Ready for Your Best Hair Day?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground mb-8", children: "Book your appointment in minutes. No calls needed, no waiting around — just great hair." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", "data-ocid": "closing-cta-book", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "hero", size: "lg", className: "px-10", children: "Book Now — It's Free" }) })
        ]
      }
    ) })
  ] });
}
export {
  HomePage as default
};
