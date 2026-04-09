import { Link, useSearch } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Phone,
  Scissors,
  Smartphone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  useAppointmentByReference,
  useServices,
  useStylists,
} from "../hooks/useBooking";

// Skeleton loader
function ConfirmSkeleton() {
  return (
    <div className="max-w-md mx-auto space-y-4 animate-pulse">
      <div className="h-24 rounded-2xl bg-muted" />
      <div className="h-64 rounded-xl bg-muted" />
      <div className="h-10 rounded-lg bg-muted" />
    </div>
  );
}

// Detail row component
function DetailRow({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p
          className={[
            "text-sm font-medium mt-0.5 truncate",
            accent ? "text-accent font-bold" : "text-foreground",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  const search = useSearch({ from: "/book/confirm" }) as { ref?: string };
  const ref = search.ref ?? null;

  const {
    data: appointment,
    isLoading,
    isError,
  } = useAppointmentByReference(ref);
  const { data: services } = useServices();
  const { data: stylists } = useStylists();
  const [copied, setCopied] = useState(false);

  const service = useMemo(
    () => services?.find((s) => appointment && s.id === appointment.serviceId),
    [services, appointment],
  );
  const stylist = useMemo(
    () => stylists?.find((s) => appointment && s.id === appointment.stylistId),
    [stylists, appointment],
  );

  const formatTime = (t: string) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatDate = (d: string) => {
    if (!d) return "—";
    const date = new Date(`${d}T00:00:00`);
    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyRef = () => {
    if (!appointment?.referenceNumber) return;
    navigator.clipboard.writeText(appointment.referenceNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-1">
            Booking Confirmation
          </h1>
          <p className="text-muted-foreground text-sm">
            Your appointment details are shown below
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-md">
        {isLoading && <ConfirmSkeleton />}

        {(isError || (!isLoading && !appointment)) && (
          <div className="text-center py-16" data-ocid="confirm-not-found">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold font-display text-foreground mb-2">
              Booking Not Found
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              We couldn't find an appointment with that reference number.
            </p>
            <Button asChild variant="accent">
              <Link to="/book">Book an Appointment</Link>
            </Button>
          </div>
        )}

        {!isLoading && appointment && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            data-ocid="confirm-success"
          >
            {/* Success header */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </motion.div>
              <h2 className="text-xl font-bold font-display text-foreground mb-1">
                You're all set!
              </h2>
              <p className="text-muted-foreground text-sm">
                Your appointment has been booked. See you at 19 Studio!
              </p>

              {/* Status badge */}
              <Badge
                variant={
                  appointment.status === "confirmed"
                    ? "confirmed"
                    : appointment.status === "pending"
                      ? "pending"
                      : "default"
                }
                className="mt-3 capitalize"
                data-ocid="confirm-status-badge"
              >
                {appointment.status}
              </Badge>
            </div>

            {/* Reference number */}
            <div className="rounded-xl bg-accent/5 border border-accent/20 px-5 py-4 mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                  Reference Number
                </p>
                <p
                  className="text-lg font-bold font-mono text-accent tracking-wider"
                  data-ocid="confirm-reference"
                >
                  {appointment.referenceNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyRef}
                data-ocid="copy-reference-btn"
                aria-label="Copy reference number"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors duration-200 shrink-0"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Appointment details */}
            <div
              className="rounded-xl border border-border bg-card px-4 mb-8"
              data-ocid="confirm-details"
            >
              <DetailRow
                icon={Scissors}
                label="Service"
                value={service?.name ?? "—"}
              />
              <DetailRow
                icon={User}
                label="Stylist"
                value={stylist?.name ?? "—"}
              />
              <DetailRow
                icon={Calendar}
                label="Date"
                value={formatDate(appointment.date)}
              />
              <DetailRow
                icon={Clock}
                label="Time"
                value={formatTime(appointment.startTime)}
              />
              <DetailRow
                icon={User}
                label="Client"
                value={appointment.clientName}
              />
              {service && (
                <DetailRow
                  icon={Scissors}
                  label="Price"
                  value={`₹${Number(service.price)}`}
                  accent
                />
              )}
            </div>

            {/* eSewa Payment Instructions */}
            {service && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="rounded-xl border border-green-500/30 bg-green-500/8 px-5 py-4 mb-6"
                data-ocid="esewa-payment-info"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                    <Smartphone className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                    Payment Instructions
                  </p>
                </div>
                <p className="text-sm text-foreground mb-1">
                  Please send payment via{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    eSewa
                  </span>
                </p>
                <div className="flex items-center gap-2 mt-2 mb-3">
                  <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span className="text-sm font-mono font-bold text-foreground tracking-wide">
                    +977 976-6466795
                  </span>
                </div>
                <div className="flex items-center justify-between bg-green-500/10 rounded-lg px-3 py-2">
                  <span className="text-xs text-muted-foreground">
                    Amount to pay
                  </span>
                  <span className="text-base font-bold text-green-600 dark:text-green-400">
                    Rs. {Number(service.price)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                  Screenshot your payment and show it at the salon. Booking is
                  reserved once payment is received.
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                asChild
                variant="accent"
                size="lg"
                className="w-full"
                data-ocid="book-another-btn"
              >
                <Link to="/book">Book Another Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
