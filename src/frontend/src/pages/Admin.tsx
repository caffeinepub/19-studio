import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  LogIn,
  LogOut,
  RefreshCw,
  Scissors,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppointmentStatus as Status } from "../backend";
import { Layout } from "../components/layout/Layout";
import {
  useAllAppointments,
  useCancelAppointment,
  useCompleteAppointment,
  useServices,
  useStylists,
} from "../hooks/useBooking";
import type { Appointment, AppointmentStatus } from "../types/booking";

type FilterTab = "all" | "today" | "upcoming" | "past";

const TAB_LABELS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

function toDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getStatusVariant(
  status: AppointmentStatus,
): "pending" | "confirmed" | "completed" | "cancelled" {
  switch (status) {
    case Status.pending:
      return "pending";
    case Status.confirmed:
      return "confirmed";
    case Status.completed:
      return "completed";
    case Status.cancelled:
      return "cancelled";
    default:
      return "pending";
  }
}

function formatDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// --- Stats Bar ---
function StatsBar({ appointments }: { appointments: Appointment[] }) {
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter(
      (a) => a.status === Status.pending || a.status === Status.confirmed,
    ).length;
    const completed = appointments.filter(
      (a) => a.status === Status.completed,
    ).length;
    const cancelled = appointments.filter(
      (a) => a.status === Status.cancelled,
    ).length;
    return { total, pending, completed, cancelled };
  }, [appointments]);

  const items = [
    {
      label: "Total",
      value: stats.total,
      icon: CalendarDays,
      color: "text-foreground",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-accent",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-primary",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-card rounded-xl border border-border p-4 flex flex-col gap-2"
          data-ocid={`stat-${label.toLowerCase()}`}
        >
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-body text-xs text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>
          <span className="text-display text-2xl font-bold text-foreground">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- Appointment Row ---
function AppointmentRow({
  appointment,
  serviceName,
  stylistName,
}: {
  appointment: Appointment;
  serviceName: string;
  stylistName: string;
}) {
  const complete = useCompleteAppointment();
  const cancel = useCancelAppointment();
  const canComplete =
    appointment.status === Status.pending ||
    appointment.status === Status.confirmed;
  const canCancel =
    appointment.status !== Status.cancelled &&
    appointment.status !== Status.completed;

  return (
    <tr
      className="border-b border-border hover:bg-muted/40 transition-colors"
      data-ocid={`appointment-row-${appointment.referenceNumber}`}
    >
      <td className="py-3.5 px-4">
        <span className="font-mono text-xs text-muted-foreground">
          #{appointment.referenceNumber}
        </span>
      </td>
      <td className="py-3.5 px-4">
        <div className="font-medium text-sm text-foreground truncate max-w-[140px]">
          {appointment.clientName}
        </div>
        <div className="text-xs text-muted-foreground truncate max-w-[140px]">
          {appointment.clientPhone}
        </div>
      </td>
      <td className="py-3.5 px-4 hidden md:table-cell">
        <span className="text-sm text-foreground">{serviceName}</span>
      </td>
      <td className="py-3.5 px-4 hidden lg:table-cell">
        <span className="text-sm text-foreground">{stylistName}</span>
      </td>
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <div className="text-sm text-foreground">
          {formatDate(appointment.date)}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTime(appointment.startTime)}
        </div>
      </td>
      <td className="py-3.5 px-4">
        <Badge
          variant={getStatusVariant(appointment.status)}
          className="capitalize"
        >
          {appointment.status}
        </Badge>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2 justify-end">
          {canComplete && (
            <Button
              variant="outline"
              size="sm"
              data-ocid={`btn-complete-${appointment.referenceNumber}`}
              disabled={complete.isPending}
              onClick={() => complete.mutateAsync(appointment.id)}
              className="text-primary border-primary/30 hover:bg-primary/10 h-7 px-2.5 text-xs"
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Complete
            </Button>
          )}
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              data-ocid={`btn-cancel-${appointment.referenceNumber}`}
              disabled={cancel.isPending}
              onClick={() => cancel.mutateAsync(appointment.referenceNumber)}
              className="text-destructive border-destructive/30 hover:bg-destructive/10 h-7 px-2.5 text-xs"
            >
              <XCircle className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"];

// --- Loading skeletons ---
function TableSkeleton() {
  return (
    <div className="space-y-2 p-4" data-ocid="appointments-loading">
      {SKELETON_KEYS.map((key) => (
        <Skeleton key={key} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}

// --- Main Admin Dashboard ---
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { data: appointments = [], isLoading, refetch } = useAllAppointments();
  const { data: services = [] } = useServices();
  const { data: stylists = [] } = useStylists();
  const { clear } = useInternetIdentity();

  const serviceMap = useMemo(
    () => Object.fromEntries(services.map((s) => [s.id.toString(), s.name])),
    [services],
  );
  const stylistMap = useMemo(
    () => Object.fromEntries(stylists.map((s) => [s.id.toString(), s.name])),
    [stylists],
  );

  const today = toDateStr(new Date());

  const filtered = useMemo(() => {
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

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const dateDiff = b.date.localeCompare(a.date);
        if (dateDiff !== 0) return dateDiff;
        return b.startTime.localeCompare(a.startTime);
      }),
    [filtered],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
        data-ocid="admin-header"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Scissors
                className="h-5 w-5 text-primary-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <span className="text-display text-sm font-bold text-foreground tracking-widest uppercase">
                19 Studio Admin
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              data-ocid="btn-refresh"
              className="text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => clear()}
              data-ocid="btn-logout"
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Body */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <StatsBar appointments={appointments} />

        {/* Filter Tabs + Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Tabs */}
          <div
            className="flex items-center gap-1 border-b border-border px-4 pt-4 pb-0 overflow-x-auto"
            data-ocid="filter-tabs"
          >
            {TAB_LABELS.map(({ key, label }) => {
              const count =
                key === "all"
                  ? appointments.length
                  : key === "today"
                    ? appointments.filter((a) => a.date === today).length
                    : key === "upcoming"
                      ? appointments.filter((a) => a.date > today).length
                      : appointments.filter((a) => a.date < today).length;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  data-ocid={`tab-${key}`}
                  className={[
                    "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-smooth border-b-2 -mb-px whitespace-nowrap",
                    activeTab === key
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {label}
                  <span
                    className={[
                      "text-xs rounded-full px-1.5 py-0.5 font-semibold",
                      activeTab === key
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          {isLoading ? (
            <TableSkeleton />
          ) : sorted.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="appointments-empty"
            >
              <CalendarDays className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-display text-base font-semibold text-foreground mb-1">
                No appointments
              </p>
              <p className="text-body text-sm text-muted-foreground">
                {activeTab === "all"
                  ? "No bookings have been made yet."
                  : `No ${activeTab} appointments found.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Ref
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Client
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Service
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                      Stylist
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      Date & Time
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((appt) => (
                    <AppointmentRow
                      key={appt.id.toString()}
                      appointment={appt}
                      serviceName={serviceMap[appt.serviceId.toString()] ?? "—"}
                      stylistName={stylistMap[appt.stylistId.toString()] ?? "—"}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Login Gate ---
function LoginGate() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      data-ocid="admin-login-gate"
    >
      <div className="bg-card border border-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-full max-w-sm text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <Scissors className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-display text-xl font-bold text-foreground tracking-tight mb-1">
            19 Studio Admin
          </h1>
          <p className="text-body text-sm text-muted-foreground">
            Sign in with Internet Identity to access the dashboard
          </p>
        </div>
        <Button
          variant="accent"
          size="lg"
          className="w-full gap-2"
          onClick={() => login()}
          disabled={isLoggingIn || isInitializing}
          data-ocid="btn-admin-login"
        >
          <LogIn className="h-4 w-4" />
          {isLoggingIn
            ? "Signing in…"
            : isInitializing
              ? "Loading…"
              : "Sign in with Internet Identity"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Staff access only. Secure login via Internet Identity.
        </p>
      </div>
    </div>
  );
}

// --- Page Entry ---
export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginGate />;
  }

  return <AdminDashboard />;
}
