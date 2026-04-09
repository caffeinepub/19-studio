import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  useAvailableSlots,
  useBookAppointment,
  useServices,
  useStylists,
} from "../hooks/useBooking";
import type {
  BookingFormData,
  BookingStep,
  Service,
  StylistPublic,
  TimeSlot,
} from "../types/booking";
import { BOOKING_STEPS, STEP_LABELS } from "../types/booking";

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: BookingStep }) {
  const currentIndex = BOOKING_STEPS.indexOf(currentStep);
  return (
    <ol
      className="flex items-center justify-center gap-0 mb-10"
      aria-label="Booking steps"
    >
      {BOOKING_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;
        return (
          <li key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span
                className={[
                  "text-[10px] font-medium tracking-wide uppercase hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {i < BOOKING_STEPS.length - 1 && (
              <div
                className={[
                  "w-12 sm:w-20 h-px mx-1 mb-4 transition-all duration-300",
                  i < currentIndex ? "bg-accent" : "bg-border",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ─── Step 1: Service ──────────────────────────────────────────────────────────
function ServiceStep({
  onSelect,
  selected,
}: {
  onSelect: (s: Service) => void;
  selected: bigint | null;
}) {
  const { data: services, isLoading } = useServices();
  if (isLoading) return <StepSkeleton count={4} />;
  return (
    <StepContainer
      title="Choose a Service"
      subtitle="Select the treatment that's right for you"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(services ?? []).map((service, i) => (
          <motion.button
            key={service.id.toString()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onSelect(service)}
            data-ocid="service-card"
            className={[
              "text-left p-5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected === service.id
                ? "border-accent bg-accent/5 shadow-md"
                : "border-border bg-card hover:border-accent/50 hover:shadow-sm",
            ].join(" ")}
            aria-pressed={selected === service.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm leading-snug font-display">
                  {service.name}
                </p>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  {Number(service.durationMinutes)} min
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-accent font-bold text-lg font-display">
                  ₹{Number(service.price)}
                </p>
                {selected === service.id && (
                  <Badge variant="accent" className="text-[10px] mt-1">
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </StepContainer>
  );
}

// ─── Step 2: Stylist ──────────────────────────────────────────────────────────
function StylistStep({
  onSelect,
  selected,
}: {
  onSelect: (s: StylistPublic) => void;
  selected: bigint | null;
}) {
  const { data: stylists, isLoading } = useStylists();
  const available = useMemo(
    () => (stylists ?? []).filter((s) => s.available),
    [stylists],
  );
  if (isLoading) return <StepSkeleton count={3} />;
  return (
    <StepContainer
      title="Choose Your Stylist"
      subtitle="All our stylists are highly skilled professionals"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {available.map((stylist, i) => (
          <motion.button
            key={stylist.id.toString()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onSelect(stylist)}
            data-ocid="stylist-card"
            className={[
              "text-left p-5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected === stylist.id
                ? "border-accent bg-accent/5 shadow-md"
                : "border-border bg-card hover:border-accent/50 hover:shadow-sm",
            ].join(" ")}
            aria-pressed={selected === stylist.id}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-lg font-display font-bold text-foreground">
                  {stylist.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground text-sm font-display">
                    {stylist.name}
                  </p>
                  {selected === stylist.id && (
                    <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                  )}
                </div>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed line-clamp-2">
                  {stylist.bio}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      {available.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No stylists are currently available. Please check back later.
        </p>
      )}
    </StepContainer>
  );
}

// ─── Step 3: Date & Time ──────────────────────────────────────────────────────
function DateTimeStep({
  stylistId,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  stylistId: bigint | null;
  selectedDate: string;
  selectedTime: string;
  onSelectDate: (d: string) => void;
  onSelectTime: (t: string) => void;
}) {
  const { data: slots, isLoading } = useAvailableSlots(selectedDate, stylistId);

  const next30Days = useMemo(() => {
    const days: {
      iso: string;
      display: string;
      dayLabel: string;
      dayNum: number;
      monthAbbr: string;
    }[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      days.push({
        iso,
        display: d.toLocaleDateString("en-ZA", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        dayLabel: d.toLocaleDateString("en-ZA", { weekday: "short" }),
        dayNum: d.getDate(),
        monthAbbr: d.toLocaleDateString("en-ZA", { month: "short" }),
      });
    }
    return days;
  }, []);

  const morningSlots = useMemo(
    () =>
      (slots ?? []).filter(
        (s) => Number.parseInt(s.startTime.split(":")[0]) < 12,
      ),
    [slots],
  );
  const afternoonSlots = useMemo(
    () =>
      (slots ?? []).filter(
        (s) => Number.parseInt(s.startTime.split(":")[0]) >= 12,
      ),
    [slots],
  );

  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <StepContainer
      title="Pick a Date & Time"
      subtitle="Choose from available slots below"
    >
      {/* Calendar strip */}
      <div className="overflow-x-auto -mx-1 px-1 pb-2 mb-6">
        <div className="flex gap-2 min-w-max">
          {next30Days.map((day) => (
            <button
              type="button"
              key={day.iso}
              onClick={() => {
                onSelectDate(day.iso);
                onSelectTime("");
              }}
              data-ocid="calendar-day"
              className={[
                "flex flex-col items-center justify-center w-14 py-2.5 rounded-xl border text-center transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedDate === day.iso
                  ? "bg-accent text-accent-foreground border-accent shadow-md"
                  : "bg-card border-border hover:border-accent/50 text-foreground",
              ].join(" ")}
              aria-pressed={selectedDate === day.iso}
            >
              <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                {day.dayLabel}
              </span>
              <span className="text-lg font-bold font-display leading-none my-0.5">
                {day.dayNum}
              </span>
              <span className="text-[10px] opacity-70">{day.monthAbbr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {!selectedDate && (
        <p className="text-muted-foreground text-sm text-center py-8">
          Please select a date to see available times
        </p>
      )}
      {selectedDate && isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <div key={k} className="h-10 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      )}
      {selectedDate && !isLoading && (
        <>
          {morningSlots.length > 0 && (
            <TimeGroup
              label="Morning"
              slots={morningSlots}
              selected={selectedTime}
              onSelect={onSelectTime}
              formatTime={formatTime}
            />
          )}
          {afternoonSlots.length > 0 && (
            <TimeGroup
              label="Afternoon"
              slots={afternoonSlots}
              selected={selectedTime}
              onSelect={onSelectTime}
              formatTime={formatTime}
            />
          )}
          {slots?.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">
              No available slots for this date. Try another day.
            </p>
          )}
        </>
      )}
    </StepContainer>
  );
}

function TimeGroup({
  label,
  slots,
  selected,
  onSelect,
  formatTime,
}: {
  label: string;
  slots: TimeSlot[];
  selected: string;
  onSelect: (t: string) => void;
  formatTime: (t: string) => string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
        {label}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => (
          <button
            type="button"
            key={slot.startTime}
            onClick={() => onSelect(slot.startTime)}
            data-ocid="time-slot"
            disabled={slot.isBooked}
            className={[
              "h-10 rounded-lg text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              slot.isBooked
                ? "bg-muted/50 text-muted-foreground/40 border-border cursor-not-allowed line-through"
                : selected === slot.startTime
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "bg-card border-border hover:border-accent/50 text-foreground",
            ].join(" ")}
          >
            {formatTime(slot.startTime)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 4: Details ──────────────────────────────────────────────────────────
interface DetailsErrors {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

function DetailsStep({
  formData,
  onChange,
  errors,
}: {
  formData: BookingFormData;
  onChange: (key: keyof BookingFormData, value: string) => void;
  errors: DetailsErrors;
}) {
  return (
    <StepContainer
      title="Your Details"
      subtitle="We'll use these to send your booking confirmation"
    >
      <div className="space-y-5 max-w-md">
        <Field
          label="Full Name"
          id="clientName"
          value={formData.clientName}
          onChange={(v) => onChange("clientName", v)}
          placeholder="Jane Smith"
          error={errors.clientName}
          required
        />
        <Field
          label="Email Address"
          id="clientEmail"
          type="email"
          value={formData.clientEmail}
          onChange={(v) => onChange("clientEmail", v)}
          placeholder="jane@example.com"
          error={errors.clientEmail}
          required
        />
        <Field
          label="Phone Number"
          id="clientPhone"
          type="tel"
          value={formData.clientPhone}
          onChange={(v) => onChange("clientPhone", v)}
          placeholder="+27 82 123 4567"
          error={errors.clientPhone}
          required
        />
      </div>
    </StepContainer>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-ocid={`input-${id}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "w-full h-10 rounded-lg border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
          error
            ? "border-destructive focus:ring-destructive/40"
            : "border-input hover:border-muted-foreground/40",
        ].join(" ")}
      />
      {error && (
        <p id={`${id}-error`} className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Step 5: Confirm ──────────────────────────────────────────────────────────
function ConfirmStep({
  formData,
  service,
  stylist,
  isLoading,
  onConfirm,
  error,
}: {
  formData: BookingFormData;
  service: Service | undefined;
  stylist: StylistPublic | undefined;
  isLoading: boolean;
  onConfirm: () => void;
  error: string | null;
}) {
  const formatTime = (t: string) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const rows = [
    { label: "Service", value: service?.name ?? "—" },
    {
      label: "Duration",
      value: service ? `${Number(service.durationMinutes)} min` : "—",
    },
    { label: "Price", value: service ? `₹${Number(service.price)}` : "—" },
    { label: "Stylist", value: stylist?.name ?? "—" },
    { label: "Date", value: formData.date || "—" },
    { label: "Time", value: formatTime(formData.startTime) },
    { label: "Name", value: formData.clientName || "—" },
    { label: "Email", value: formData.clientEmail || "—" },
    { label: "Phone", value: formData.clientPhone || "—" },
  ];

  return (
    <StepContainer
      title="Review Your Booking"
      subtitle="Please confirm all details are correct before proceeding"
    >
      <div className="max-w-md">
        <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={[
                "flex items-center justify-between px-4 py-3 gap-4",
                i < rows.length - 1 ? "border-b border-border" : "",
              ].join(" ")}
            >
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
                {row.label}
              </span>
              <span
                className={[
                  "text-sm text-foreground font-medium text-right min-w-0 truncate",
                  row.label === "Price" ? "text-accent font-bold" : "",
                ].join(" ")}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 mb-4">
            {error}
          </div>
        )}
        {/* eSewa payment instructions — shown before confirming */}
        <div
          className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-4 mb-5"
          data-ocid="esewa-payment-info"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
              <Wallet className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground font-display leading-none mb-0.5">
                Pay via eSewa
              </p>
              <p className="text-xs text-muted-foreground">
                Complete payment after confirming your booking
              </p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                eSewa Account
              </span>
              <span className="font-semibold text-accent font-display">
                +977 976-6466795
              </span>
            </div>
            {service && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Amount Due
                </span>
                <span className="font-bold text-accent font-display">
                  Rs. {Number(service.price)}
                </span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Send the exact amount to the eSewa number above. Use your name as
            the payment remark.
          </p>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={onConfirm}
          disabled={isLoading}
          data-ocid="confirm-booking-btn"
        >
          {isLoading ? "Confirming…" : "Confirm Booking"}
        </Button>
      </div>
    </StepContainer>
  );
}

// ─── Shared Helpers ───────────────────────────────────────────────────────────
function StepContainer({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold font-display text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

function StepSkeleton({ count }: { count: number }) {
  const keys = ["a", "b", "c", "d", "e", "f"].slice(0, count);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {keys.map((k) => (
        <div key={k} className="h-28 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookPage() {
  const navigate = useNavigate();
  const { data: services } = useServices();
  const { data: stylists } = useStylists();
  const bookMutation = useBookAppointment();

  const [step, setStep] = useState<BookingStep>("service");
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: null,
    stylistId: null,
    date: "",
    startTime: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<DetailsErrors>({});
  const [bookingError, setBookingError] = useState<string | null>(null);

  const currentIndex = BOOKING_STEPS.indexOf(step);

  const selectedService = services?.find((s) => s.id === formData.serviceId);
  const selectedStylist = stylists?.find((s) => s.id === formData.stylistId);

  const handleField = (key: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateDetails = (): boolean => {
    const errors: DetailsErrors = {};
    if (!formData.clientName.trim()) errors.clientName = "Name is required";
    if (!formData.clientEmail.trim()) {
      errors.clientEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      errors.clientEmail = "Please enter a valid email address";
    }
    if (!formData.clientPhone.trim())
      errors.clientPhone = "Phone number is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canAdvance = (): boolean => {
    if (step === "service") return formData.serviceId !== null;
    if (step === "stylist") return formData.stylistId !== null;
    if (step === "datetime") return !!formData.date && !!formData.startTime;
    if (step === "details") return true;
    return false;
  };

  const handleNext = () => {
    if (step === "details" && !validateDetails()) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < BOOKING_STEPS.length) {
      setStep(BOOKING_STEPS[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) setStep(BOOKING_STEPS[prevIndex]);
  };

  const handleConfirm = async () => {
    if (
      !formData.serviceId ||
      !formData.stylistId ||
      !formData.date ||
      !formData.startTime
    )
      return;
    setBookingError(null);
    const request = {
      serviceId: formData.serviceId,
      stylistId: formData.stylistId,
      date: formData.date,
      startTime: formData.startTime,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
    };
    const result = await bookMutation.mutateAsync(request);
    if (result.__kind__ === "ok") {
      navigate({
        to: "/book/confirm",
        search: { ref: result.ok.referenceNumber },
      });
    } else {
      setBookingError(result.err ?? "Booking failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-1">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground text-sm">
            Complete the steps below to reserve your visit at 19 Studio
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-2xl">
        <StepIndicator currentStep={step} />

        <AnimatePresence mode="wait">
          {step === "service" && (
            <ServiceStep
              key="service"
              onSelect={(s) => {
                setFormData((p) => ({ ...p, serviceId: s.id }));
              }}
              selected={formData.serviceId}
            />
          )}
          {step === "stylist" && (
            <StylistStep
              key="stylist"
              onSelect={(s) => setFormData((p) => ({ ...p, stylistId: s.id }))}
              selected={formData.stylistId}
            />
          )}
          {step === "datetime" && (
            <DateTimeStep
              key="datetime"
              stylistId={formData.stylistId}
              selectedDate={formData.date}
              selectedTime={formData.startTime}
              onSelectDate={(d) => setFormData((p) => ({ ...p, date: d }))}
              onSelectTime={(t) => setFormData((p) => ({ ...p, startTime: t }))}
            />
          )}
          {step === "details" && (
            <DetailsStep
              key="details"
              formData={formData}
              onChange={handleField}
              errors={fieldErrors}
            />
          )}
          {step === "confirm" && (
            <ConfirmStep
              key="confirm"
              formData={formData}
              service={selectedService}
              stylist={selectedStylist}
              isLoading={bookMutation.isPending}
              onConfirm={handleConfirm}
              error={bookingError}
            />
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div>
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                data-ocid="booking-back-btn"
                className="gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>
          {step !== "confirm" && (
            <Button
              variant="accent"
              onClick={handleNext}
              disabled={!canAdvance()}
              data-ocid="booking-next-btn"
              size="lg"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
