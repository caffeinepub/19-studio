import { a as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-QeIUxsOk.js";
import { L as Layout, m as motion } from "./Layout-DiR8Atpn.js";
import { c as createLucideIcon, f as useAppointmentByReference, u as useServices, a as useStylists, S as Scissors, b as Button, B as Badge } from "./useBooking-BHG-NJm_.js";
import { a as CircleCheck, C as Calendar } from "./circle-check-D-rwgToA.js";
import { C as Check } from "./check-C4l4-kYs.js";
import { C as Clock } from "./clock-DaQxZCK1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function ConfirmSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto space-y-4 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-lg bg-muted" })
  ] });
}
function DetailRow({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5 py-3.5 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: [
            "text-sm font-medium mt-0.5 truncate",
            accent ? "text-accent font-bold" : "text-foreground"
          ].join(" "),
          children: value
        }
      )
    ] })
  ] });
}
function ConfirmPage() {
  const search = useSearch({ from: "/book/confirm" });
  const ref = search.ref ?? null;
  const {
    data: appointment,
    isLoading,
    isError
  } = useAppointmentByReference(ref);
  const { data: services } = useServices();
  const { data: stylists } = useStylists();
  const [copied, setCopied] = reactExports.useState(false);
  const service = reactExports.useMemo(
    () => services == null ? void 0 : services.find((s) => appointment && s.id === appointment.serviceId),
    [services, appointment]
  );
  const stylist = reactExports.useMemo(
    () => stylists == null ? void 0 : stylists.find((s) => appointment && s.id === appointment.stylistId),
    [stylists, appointment]
  );
  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };
  const formatDate = (d) => {
    if (!d) return "—";
    const date = /* @__PURE__ */ new Date(`${d}T00:00:00`);
    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const handleCopyRef = () => {
    if (!(appointment == null ? void 0 : appointment.referenceNumber)) return;
    navigator.clipboard.writeText(appointment.referenceNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-8 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold font-display text-foreground mb-1", children: "Booking Confirmation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your appointment details are shown below" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-12 max-w-md", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmSkeleton, {}),
      (isError || !isLoading && !appointment) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "confirm-not-found", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-7 h-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold font-display text-foreground mb-2", children: "Booking Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "We couldn't find an appointment with that reference number." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book an Appointment" }) })
      ] }),
      !isLoading && appointment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          "data-ocid": "confirm-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0.5, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.1, type: "spring", stiffness: 200 },
                  className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground mb-1", children: "You're all set!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your appointment has been booked. See you at 19 Studio!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: appointment.status === "confirmed" ? "confirmed" : appointment.status === "pending" ? "pending" : "default",
                  className: "mt-3 capitalize",
                  "data-ocid": "confirm-status-badge",
                  children: appointment.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-accent/5 border border-accent/20 px-5 py-4 mb-6 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5", children: "Reference Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-bold font-mono text-accent tracking-wider",
                    "data-ocid": "confirm-reference",
                    children: appointment.referenceNumber
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyRef,
                  "data-ocid": "copy-reference-btn",
                  "aria-label": "Copy reference number",
                  className: "w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors duration-200 shrink-0",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-border bg-card px-4 mb-8",
                "data-ocid": "confirm-details",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: Scissors,
                      label: "Service",
                      value: (service == null ? void 0 : service.name) ?? "—"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: User,
                      label: "Stylist",
                      value: (stylist == null ? void 0 : stylist.name) ?? "—"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: Calendar,
                      label: "Date",
                      value: formatDate(appointment.date)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: Clock,
                      label: "Time",
                      value: formatTime(appointment.startTime)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: User,
                      label: "Client",
                      value: appointment.clientName
                    }
                  ),
                  service && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: Scissors,
                      label: "Price",
                      value: `₹${Number(service.price)}`,
                      accent: true
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "accent",
                  size: "lg",
                  className: "w-full",
                  "data-ocid": "book-another-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book Another Appointment" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Return to Home" }) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  ConfirmPage as default
};
