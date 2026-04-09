import type {
  Appointment,
  AppointmentId,
  AppointmentStatus,
  BookingRequest,
  BookingResult,
  Service,
  ServiceId,
  StylistId,
  StylistPublic,
  TimeSlot,
} from "../backend";

export type {
  Service,
  StylistPublic,
  TimeSlot,
  Appointment,
  AppointmentStatus,
  BookingRequest,
  BookingResult,
  ServiceId,
  StylistId,
  AppointmentId,
};

export interface BookingFormData {
  serviceId: bigint | null;
  stylistId: bigint | null;
  date: string;
  startTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export type BookingStep =
  | "service"
  | "stylist"
  | "datetime"
  | "details"
  | "confirm";

export const BOOKING_STEPS: BookingStep[] = [
  "service",
  "stylist",
  "datetime",
  "details",
  "confirm",
];

export const STEP_LABELS: Record<BookingStep, string> = {
  service: "Service",
  stylist: "Stylist",
  datetime: "Date & Time",
  details: "Your Details",
  confirm: "Confirm",
};
