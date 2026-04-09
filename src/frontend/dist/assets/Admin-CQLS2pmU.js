import { d as useInternetIdentity, j as jsxRuntimeExports, r as reactExports } from "./index-BITzmliG.js";
import { c as createLucideIcon, S as Scissors, b as Button, g as useAllAppointments, u as useServices, a as useStylists, A as AppointmentStatus, h as useCompleteAppointment, i as useCancelAppointment, B as Badge } from "./useBooking-Da3Ub56m.js";
import { S as Skeleton } from "./skeleton-ClNzS9g3.js";
import { C as Clock } from "./clock-C84Mqveg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const TAB_LABELS = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" }
];
function toDateStr(date) {
  return date.toISOString().slice(0, 10);
}
function getStatusVariant(status) {
  switch (status) {
    case AppointmentStatus.pending:
      return "pending";
    case AppointmentStatus.confirmed:
      return "confirmed";
    case AppointmentStatus.completed:
      return "completed";
    case AppointmentStatus.cancelled:
      return "cancelled";
    default:
      return "pending";
  }
}
function formatDate(dateStr) {
  const d = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function formatTime(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
function StatsBar({ appointments }) {
  const stats = reactExports.useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter(
      (a) => a.status === AppointmentStatus.pending || a.status === AppointmentStatus.confirmed
    ).length;
    const completed = appointments.filter(
      (a) => a.status === AppointmentStatus.completed
    ).length;
    const cancelled = appointments.filter(
      (a) => a.status === AppointmentStatus.cancelled
    ).length;
    return { total, pending, completed, cancelled };
  }, [appointments]);
  const items = [
    {
      label: "Total",
      value: stats.total,
      icon: CalendarDays,
      color: "text-foreground"
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-accent"
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CircleCheckBig,
      color: "text-primary"
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: CircleX,
      color: "text-destructive"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8", children: items.map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border p-4 flex flex-col gap-2",
      "data-ocid": `stat-${label.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body text-xs text-muted-foreground uppercase tracking-wider", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-display text-2xl font-bold text-foreground", children: value })
      ]
    },
    label
  )) });
}
function AppointmentRow({
  appointment,
  serviceName,
  stylistName
}) {
  const complete = useCompleteAppointment();
  const cancel = useCancelAppointment();
  const canComplete = appointment.status === AppointmentStatus.pending || appointment.status === AppointmentStatus.confirmed;
  const canCancel = appointment.status !== AppointmentStatus.cancelled && appointment.status !== AppointmentStatus.completed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/40 transition-colors",
      "data-ocid": `appointment-row-${appointment.referenceNumber}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
          "#",
          appointment.referenceNumber
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground truncate max-w-[140px]", children: appointment.clientName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate max-w-[140px]", children: appointment.clientPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: serviceName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: stylistName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4 hidden sm:table-cell", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: formatDate(appointment.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: formatTime(appointment.startTime) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: getStatusVariant(appointment.status),
            className: "capitalize",
            children: appointment.status
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
          canComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": `btn-complete-${appointment.referenceNumber}`,
              disabled: complete.isPending,
              onClick: () => complete.mutateAsync(appointment.id),
              className: "text-primary border-primary/30 hover:bg-primary/10 h-7 px-2.5 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                "Complete"
              ]
            }
          ),
          canCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": `btn-cancel-${appointment.referenceNumber}`,
              disabled: cancel.isPending,
              onClick: () => cancel.mutateAsync(appointment.referenceNumber),
              className: "text-destructive border-destructive/30 hover:bg-destructive/10 h-7 px-2.5 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                "Cancel"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"];
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", "data-ocid": "appointments-loading", children: SKELETON_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, key)) });
}
function AdminDashboard() {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const { data: appointments = [], isLoading, refetch } = useAllAppointments();
  const { data: services = [] } = useServices();
  const { data: stylists = [] } = useStylists();
  const { clear } = useInternetIdentity();
  const serviceMap = reactExports.useMemo(
    () => Object.fromEntries(services.map((s) => [s.id.toString(), s.name])),
    [services]
  );
  const stylistMap = reactExports.useMemo(
    () => Object.fromEntries(stylists.map((s) => [s.id.toString(), s.name])),
    [stylists]
  );
  const today = toDateStr(/* @__PURE__ */ new Date());
  const filtered = reactExports.useMemo(() => {
    switch (activeTab) {
      case "today":
        return appointments.filter((a) => a.date === today);
      case "upcoming":
        return appointments.filter((a) => a.date > today);
      case "past":
        return appointments.filter((a) => a.date < today);
      default:
        return appointments;
    }
  }, [appointments, activeTab, today]);
  const sorted = reactExports.useMemo(
    () => [...filtered].sort((a, b) => {
      const dateDiff = b.date.localeCompare(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b.startTime.localeCompare(a.startTime);
    }),
    [filtered]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-50 bg-card border-b border-border shadow-xs",
        "data-ocid": "admin-header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4 md:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Scissors,
              {
                className: "h-5 w-5 text-primary-foreground",
                strokeWidth: 1.5
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-display text-sm font-bold text-foreground tracking-widest uppercase", children: "19 Studio Admin" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => refetch(),
                "data-ocid": "btn-refresh",
                className: "text-muted-foreground hover:text-foreground gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Refresh" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => clear(),
                "data-ocid": "btn-logout",
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Log Out" })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 md:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { appointments }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-1 border-b border-border px-4 pt-4 pb-0 overflow-x-auto",
            "data-ocid": "filter-tabs",
            children: TAB_LABELS.map(({ key, label }) => {
              const count = key === "all" ? appointments.length : key === "today" ? appointments.filter((a) => a.date === today).length : key === "upcoming" ? appointments.filter((a) => a.date > today).length : appointments.filter((a) => a.date < today).length;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(key),
                  "data-ocid": `tab-${key}`,
                  className: [
                    "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px whitespace-nowrap",
                    activeTab === key ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  ].join(" "),
                  children: [
                    label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: [
                          "text-xs rounded-full px-1.5 py-0.5 font-semibold",
                          activeTab === key ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        ].join(" "),
                        children: count
                      }
                    )
                  ]
                },
                key
              );
            })
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "appointments-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-12 w-12 text-muted-foreground/40 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display text-base font-semibold text-foreground mb-1", children: "No appointments" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground", children: activeTab === "all" ? "No bookings have been made yet." : `No ${activeTab} appointments found.` })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Ref" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell", children: "Stylist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppointmentRow,
            {
              appointment: appt,
              serviceName: serviceMap[appt.serviceId.toString()] ?? "—",
              stylistName: stylistMap[appt.stylistId.toString()] ?? "—"
            },
            appt.id.toString()
          )) })
        ] }) })
      ] })
    ] })
  ] });
}
function LoginGate() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center px-4",
      "data-ocid": "admin-login-gate",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-full max-w-sm text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-7 w-7 text-primary", strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-xl font-bold text-foreground tracking-tight mb-1", children: "19 Studio Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-sm text-muted-foreground", children: "Sign in with Internet Identity to access the dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "accent",
            size: "lg",
            className: "w-full gap-2",
            onClick: () => login(),
            disabled: isLoggingIn || isInitializing,
            "data-ocid": "btn-admin-login",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
              isLoggingIn ? "Signing in…" : isInitializing ? "Loading…" : "Sign in with Internet Identity"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Staff access only. Secure login via Internet Identity." })
      ] })
    }
  );
}
function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border-2 border-accent border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" })
    ] }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginGate, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {});
}
export {
  AdminPage as default
};
